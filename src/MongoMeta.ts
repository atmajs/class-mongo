import { JsonUtils } from 'class-json';
import { IndexRaw } from './mongo/Driver';
import { TDbCollection } from './types/TDbCollection';

export interface IMongoMeta {
    collection: string

    server?: string
    indexes: IndexRaw[]
};

export namespace MongoMeta {
    export function pickModelMeta (mix: Function | Object) {
        return JsonUtils.pickModelMeta<IMongoMeta>(mix);
    }
    export function resolveModelMeta (mix: Function | Object) {
        return JsonUtils.resolveModelMeta<IMongoMeta>(mix);
    }

    export function getCollection(mix: Function | Object): TDbCollection {
        let meta = resolveModelMeta(mix)
        if (meta.collection == null) {
            throw new Error(`Collection not defined for the entity: ${meta.Type.name}`);
        }
        return meta;
    }
};
