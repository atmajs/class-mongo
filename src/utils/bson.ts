import { obj_getProperty, obj_setProperty } from 'atma-utils';
import { JsonConvert } from 'class-json';
import { JsonSettings } from 'class-json/JsonSettings';
import { Decimal128 } from 'mongodb';

import { MongoEntity } from '../MongoEntity';
import { IMongoMeta, MongoMeta } from '../MongoMeta';
import { bigint_fromBson, bigint_toBson } from './bigint';


const JsonSettings = <JsonSettings>{
    types: {
        bigint: {
            toJSON (instanceValue) {
                return bigint_toBson(instanceValue);
            },
            fromJSON(jsonValue) {
                return jsonValue == null
                    ? null
                    : BigInt(jsonValue.toString());
            }
        }
    }
}

export function bson_fromObject (entity: MongoEntity | object , Type?) {
    Type = Type ?? entity.constructor;
    if (Type === Object) {
        Type = null;
    }

    let bson = JsonConvert.toJSON(entity, {
        ...JsonSettings,
        Type
    });
    let meta = MongoMeta.pickModelMeta(entity);
    if (meta?.types != null) {
        mapToMongoTypes(bson, meta.types);
    }
    return bson;
}
export function bson_toObject  <T> (dbJson, Type): T {
    let json = JsonConvert.fromJSON<T>(dbJson, {
        ...JsonSettings,
        Type
    })
    let meta = MongoMeta.pickModelMeta(Type);
    if (meta?.types != null) {
        mapToJsTypes(json, meta.types);
    }
    return json;
}


export function bson_toEntity <T> (dbJson, Type): T {
    let json = JsonConvert.fromJSON<T>(dbJson, { Type })
    let meta = MongoMeta.pickModelMeta(Type);
    if (meta?.types != null) {
        mapToJsTypes(json, meta.types);
    }
    return json;
}
export function bson_toValue (value) {
    let t = typeof value;
    if (t === 'object' && value instanceof Decimal128) {
        return bigint_fromBson(value);
    }
    return value;
}


export function bson_prepairPartial (json: any, meta: IMongoMeta) {
    if (meta?.types != null) {
        mapToMongoTypes(json, meta.types);
    }
}

export function bson_normalizeQuery (query: any) {
    if (query == null) {
        return;
    }
    Query.normalizeTypes(query);
}

function mapToMongoTypes (json, types: IMongoMeta['types']) {
    for (let i = 0; i < types.length; i++) {
        let propInfo = types[i];
        let current = obj_getProperty(json, propInfo.property);
        if (current != null) {
            let val = propInfo.TypeMongo(current);
            obj_setProperty(json, propInfo.property, val);
        }
    }
}


function mapToJsTypes (dbJson, types: IMongoMeta['types']) {
    for (let i = 0; i < types.length; i++) {
        let propInfo = types[i];
        if (propInfo.TypeJS == null) {
            continue;
        }
        let current = obj_getProperty(dbJson, propInfo.property);
        if (current != null) {

            let val = propInfo.TypeJS(current.toString());
            obj_setProperty(dbJson, propInfo.property, val);
        }
    }
}

namespace Query {
    export function normalizeTypes (mix) {
        if (mix == null) {
            return mix;
        }
        if (typeof mix !== 'object') {
            return;
        }
        if (Array.isArray(mix)) {
            for (let i = 0; i < mix.length; i++) {
                let overriden = normalize(mix[i]);
                if (overriden != null) {
                    mix[i] = overriden;
                }
            }
            return;
        }
        for (let key in mix) {
            let overriden = normalize(mix[key]);
            if (overriden != null) {
                mix[key] = overriden;
            }
        }
    }

    function normalize (value) {
        let t = typeof value;
        if (t === 'bigint') {
            return bigint_toBson(value);
        }
        if (t !== 'object') {
            return null;
        }
        // go deep
        normalizeTypes(value);
        return null;
    }
}
