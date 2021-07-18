import { MongoMeta } from './MongoMeta';
import { IndexOptions, IndexRaw } from './mongo/Driver';
import { obj_extend, obj_extendMany, is_Object } from 'atma-utils';
import { IndexHandler } from './mongo/IndexHandler';
import { IConnectionSettings } from './types/IConnectionSettings';
import { TMongoType, Types } from './types/Types';

export function table (name: string, options?: IConnectionSettings) {
    return function (target) {
        if (typeof target !== 'function') {
            throw new Error(`Decorator for table ${name} must be called on class Ctor`);
        }

        let meta = MongoMeta.resolveModelMeta(target);
        meta.collection = name;
        meta.server = options?.server;
        return target;
    }
}

export function index (index: IndexRaw)

/* for Prop */
export function index (opts?: IndexOptions)
export function index (name: string, opts?: IndexOptions)
export function index (name: string, type: string | number, opts?: IndexOptions)

export function index (arg1?: any, arg2?: any, arg3?: any) {
    return function (target, propertyKey?, descriptor?) {
        let meta = MongoMeta.resolveModelMeta(target);
        if (meta.indexes == null) {
            meta.indexes = [];
        }
        let indexes = meta.indexes;
        let forProp = typeof propertyKey === 'string';
        if (forProp) {
            let name: string;
            let type: string | number;
            let opts: IndexOptions;

            let t1 = arg1 == null ? 'null' : typeof arg1;
            let t2 = arg2 == null ? 'null' : typeof arg2;
            let t3 = arg3 == null ? 'null' : typeof arg3;

            if (t1 === 'object') {
                opts = arg1;
            }
            if (t1 === 'string') {
                name = arg1;
            }
            if (t2 === 'object') {
                opts = arg2;
            }
            if (t2 === 'string' || t2 === 'number') {
                type = arg2;
            }
            if (t3 === 'object') {
                opts = arg3;
            }

            name = name ?? propertyKey;
            type = type ?? 1;

            let idx = name ? indexes.find(x => x.name === name) : null;
            if (idx == null) {
                idx = {
                    name,
                    key: {}
                };
                indexes.push(idx);
            }
            idx.key = obj_extend(idx.key, { [propertyKey]: type });
            obj_extend(idx, opts);

            IndexHandler.register(typeof target === 'function' ? target : target.constructor);
            return;
        }
        let raw = arg1 as IndexRaw;
        indexes.push(raw);
        IndexHandler.register(typeof target === 'function' ? target : target.constructor);
    }
}


/**
 * @param Ctor
 * @param propertyOverriden Supports also nesting path like `foo.bar.qux`;
 * @returns
 */
export function dbType (CtorMix: TMongoType, opts: { property?: string, Type: Function }) {
    return function (target, propertyKey?, descriptor?) {
        let meta = MongoMeta.resolveModelMeta(target);
        if (meta.types == null) {
            meta.types = [];
        }
        let Ctor = typeof CtorMix === 'string'
            ? Types.Mapping[CtorMix]
            : CtorMix;

        meta.types.push({
            property: opts?.property ?? propertyKey,
            TypeMongo: Ctor,
            TypeJS: opts?.Type,
        });
    }
}
