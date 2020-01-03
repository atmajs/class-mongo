import { MongoMeta } from './MongoMeta';
import { IndexOptions, IndexRaw } from './mongo/Driver';
import { obj_extend, obj_extendMany, is_Object } from 'atma-utils';
import { IndexHandler } from './mongo/IndexHandler';

export function table (name: string) {
    return function (target) {
        if (typeof target !== 'function') {
            throw new Error(`Decorator for table ${name} must be called on class Ctor`);
        }

        let meta = MongoMeta.resolveModelMeta(target);
        meta.collection = name;
        return target;
    }
}

export function index (index: IndexRaw)

/* for Prop */
export function index (opts?: IndexOptions)
export function index (name: string, opts?: IndexOptions)
export function index (name: string, type: string | number, opts?: IndexOptions)

export function index (mix?: any, mix1?: any, mix2?: any) {
    return function (target, propertyKey?, descriptor?) {
        let meta = MongoMeta.resolveModelMeta(target);
        if (meta.indexes == null) {
            meta.indexes = [];
        }
        let indexes = meta.indexes;
        let forProp = typeof propertyKey === 'string';
        if (forProp) {
            let name = typeof mix === 'string' ? mix : null;
            let type = arguments.length === 3 ? mix1 : 1;
            let opts = arguments[arguments.length - 1];
            if (is_Object(opts) === false) {
                opts = null;
            }

            let idx = name ? indexes.find(x => x.name) : null;
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
        let raw = mix as IndexRaw;
        indexes.push(raw);
        IndexHandler.register(typeof target === 'function' ? target : target.constructor);
    }
}