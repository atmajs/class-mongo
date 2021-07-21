import { obj_getProperty, obj_setProperty } from 'atma-utils';
import { JsonConvert } from 'class-json';

import { MongoEntity } from '../MongoEntity';
import { IMongoMeta, MongoMeta } from '../MongoMeta';

export function bson_fromEntity (entity: MongoEntity , Type?) {
    Type = Type ?? entity.constructor;

    let json = JsonConvert.toJSON(entity, { Type });
    let meta = MongoMeta.pickModelMeta(entity);
    if (meta?.types != null) {
        mapToMongoTypes(json, meta.types);
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


export function bson_prepairPartial (json: any, meta: IMongoMeta) {
    if (meta?.types != null) {
        mapToMongoTypes(json, meta.types);
    }
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
