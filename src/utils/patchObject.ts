import { obj_getProperty, obj_setProperty, is_Array } from 'atma-utils';
import { arr_remove } from './array';

import MongoLib = require('mongodb');

export function obj_patch(obj, patch) {

    for (var key in patch) {

        var patcher = patches[key];
        if (patcher)
            patcher[fn_WALKER](obj, patch[key], patcher[fn_MODIFIER]);
        else
            console.error('Unknown or not implemented patcher', key);
    }
    return obj;
};

export function obj_partialToUpdateQuery<T = any>(data: MongoLib.UpdateQuery<T> | Partial<T>, isOptional?: boolean): MongoLib.UpdateQuery<T> {
    if (obj_isPatch(data)) {
        return data;
    }
    let hasData = false;
    let $set:any = {};
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
        $set[key] = val;
    }
    if (hasData === false && isOptional === true) {
        return null;
    }
    return { $set };
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

function walk_mutator(obj, data, fn) {
    for (var key in data) {
        fn(obj_getProperty(obj, key), data[key], key);
    }
}

function walk_modifier(obj, data, fn) {
    for (var key in data) {
        obj_setProperty(
            obj,
            key,
            fn(obj_getProperty(obj, key), data[key], key)
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

function arr_push(val, mix, prop) {
    if (mix.hasOwnProperty('$each')) {
        for (var i = 0, imax = mix.$each.length; i < imax; i++) {
            val.push(mix.$each[i]);
        }
        return;
    }
    val.push(mix);
}

function arr_pop(val, mix, prop) {
    val[mix > 0 ? 'pop' : 'shift']();
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
    '$push': [walk_mutator, fn_IoC(arr_checkArray, arr_push)],
    '$pop': [walk_mutator, fn_IoC(arr_checkArray, arr_pop)],
    '$pull': [walk_mutator, fn_IoC(arr_checkArray, arr_pull)],

    '$inc': [walk_modifier, val_inc],
    '$set': [walk_modifier, val_set],
    '$unset': [walk_modifier, val_unset],
    '$bit': [walk_modifier, val_bit],
};

