import { obj_getProperty, obj_setProperty, is_Array, is_rawObject } from 'atma-utils';
import { arr_remove } from './array';

import * as MongoLib from 'mongodb';
import { DeepPartial } from '../types/DeepPartial';
import { IMongoMeta } from '../MongoMeta';
import { bson_prepairPartial, bson_toValue } from './bson';

export function obj_patch(obj, patch) {

    for (const key in patch) {

        let patcher = patches[key];
        if (patcher) {
            let [ walkerFn, modifierFn ] = patcher;
            walkerFn(obj, patch[key], modifierFn);
        } else {
            console.error('Unknown or not implemented patcher', key);
        }
    }
    return obj;
};

export function obj_partialToUpdateFilter<T = any>(
    data: MongoLib.UpdateFilter<T> | DeepPartial<T> | Partial<T>
    , isOptional?: boolean
    , isDeep?: boolean
    , meta?: IMongoMeta
): MongoLib.UpdateFilter<T> {
    if (obj_isPatch(data)) {
        return data;
    }
    if (meta?.types) {
        bson_prepairPartial(data, meta);
    }
    let hasData = false;
    let $set:any = Object.create(null);
    for (let key in data) {
        if (key === '_id') {
            continue;
        }
        let val = data[key];
        if (typeof val === 'function') {
            // skip any methods
            continue;
        }
        hasData = true;

        if (isDeep === true && is_rawObject(val)) {
            obj_flattern($set, val, key)
            continue;
        }
        $set[key] = val;
    }
    if (hasData === false && isOptional === true) {
        return null;
    }
    return { $set };
}

export function obj_flattern<T = any>(target: T, value, path: string = null): T {
    if (!is_rawObject(value)) {
        target[path] = value;
        return;
    }
    for (let key in value) {
        let p = path != null ? `${path}.${key}` : key;
        obj_flattern(target, value[key], p);
    }
    return target;
}

export function obj_patchValidate(patch) {
    if (patch == null)
        return 'Patch in undefined';

    var has = false;
    for (var key in patch) {
        has = true;

        if (patches[key] == null)
            return 'Unsupported patcher: ' + key;
    }
    if (has === false)
        return 'No data';

    return null;
};


export function obj_isPatch(patch) {
    if (patch == null) {
        return false;
    }
    for (let key in patches) {
        if (key in patch) {
            for (let inner in patch[key]) {
                return true;
            }
        }
    }
    return false;
};

// === private

function walk_mutator<T = any>(obj: T, data, mutatorFn: (currentValue, mutatorData, key: string, obj: T) => any) {
    for (const key in data) {
        mutatorFn(obj_getProperty(obj, key), data[key], key, obj);
    }
}

function walk_modifier(obj, data, fn) {
    for (let key in data) {
        let value = bson_toValue(
            obj_getProperty(obj, key)
        );
        obj_setProperty(
            obj,
            key,
            fn(value, data[key], key)
        );
    }
}

function fn_IoC(...fns) {
    return function (val, mix, prop) {
        for (var i = 0, fn, imax = fns.length; i < imax; i++) {
            fn = fns[i];
            if (fn(val, mix, prop) === false)
                return;
        }
    }
}

function arr_checkArray(val, mix, prop) {
    if (is_Array(val) === false) {
        // if DEBUG
        console.warn('<patch> property is not an array', prop);
        // endif
        return false;
    }
}

function arr_push(currentVal, mix, prop, obj) {
    if (currentVal == null) {
        obj[prop] = [ mix ];
        return;
    }
    if (mix.hasOwnProperty('$each')) {
        for (let i = 0, imax = mix.$each.length; i < imax; i++) {
            currentVal.push(mix.$each[i]);
        }
        return;
    }
    currentVal.push(mix);
}

function arr_pop(currentVal, mix, prop) {
    currentVal?.[mix > 0 ? 'pop' : 'shift']();
}
function arr_pull(val, mix, prop) {
    arr_remove(val, function (item) {
        return query_match(item, mix);
    });
}

function val_inc(val, mix, key) {
    return val + mix;
}
function val_set(val, mix, key) {
    return mix;
}
function val_unset() {
    return void 0;
}

function val_bit(val, mix) {
    if (mix.or)
        return val | mix.or;

    if (mix.and)
        return val & mix.and;

    return val;
}

var query_match;
(function () {
    /** @TODO improve object matcher */
    query_match = function (obj, mix) {
        for (var key in mix) {
            if (obj[key] !== mix[key])
                return false;
        }
        return true;
    };
}());


var fn_WALKER = 0,
    fn_MODIFIER = 1
    ;

var patches = {
    '$push': [walk_mutator, arr_push],
    '$pop': [walk_mutator, arr_pop],
    '$pull': [walk_mutator, arr_pull],

    '$inc': [walk_modifier, val_inc],
    '$set': [walk_modifier, val_set],
    '$unset': [walk_modifier, val_unset],
    '$bit': [walk_modifier, val_bit],
} as const;
