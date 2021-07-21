import { bson_fromObject, bson_toObject } from './utils/bson';

export namespace MongoBson {
    export function fromObject (mix, Type?) {
        return bson_fromObject(mix, Type);
    }
    export function toObject <T = any> (bson, Type?: new (...args) => T): T {
        return bson_toObject(bson, Type);
    }
}
