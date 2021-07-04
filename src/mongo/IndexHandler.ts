import { cb_createListener } from './utils';
import { db_ensureIndexes } from './Driver';
import { MongoMeta } from '../MongoMeta';

export namespace IndexHandler {
    const TYPES = [];

    export function register (Type: Function) {
        if (TYPES.includes(Type) === false) {
            TYPES.push(Type);
        }
    }

    export function ensure <T = any> (Type, callback) {
        let meta = MongoMeta.pickModelMeta(Type);
        if (meta == null || meta.indexes == null || meta.indexes.length === 0) {
            callback();
            return;
        }
        db_ensureIndexes(meta, meta.indexes, callback);
    }

    export function ensureAll(callback) {
        let imax = TYPES.length,
            listener = cb_createListener(imax, callback),
            i = -1
            ;

        while (++i < imax) {
            ensure(
                TYPES[i],
                listener
            );
        }
    }

};

