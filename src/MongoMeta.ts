import { JsonUtils } from 'class-json';
import { IndexRaw } from './mongo/Driver';

export interface IMongoMeta {
    collection: string
    indexes: IndexRaw[]
};

export namespace MongoMeta {
    export function pickModelMeta (mix: Function | Object) {
        return JsonUtils.pickModelMeta<IMongoMeta>(mix);
    }
    export function resolveModelMeta (mix: Function | Object) {
        return JsonUtils.resolveModelMeta<IMongoMeta>(mix);
    }

    export function getCollection(mix: Function | Object) {
        let meta = resolveModelMeta(mix)
        let name = meta.collection;
        if (name == null) {
            throw new Error(`Collection not defined for the entity: ${meta.Type.name}`);
        }
        return name;
    }
};