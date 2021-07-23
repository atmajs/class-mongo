import { bson_fromObject, bson_toObject } from './utils/bson';

export namespace MongoBson {
    /**
     * Traverse the object and convert any unsupported type to a mongodb capable type.
     * It also use `class-json` to serialize an object.
     * For example, `bigint` to
     *
     * - `Decimal128` in case '> MAX_SAFE_INTEGER'
     * - `number` in case '< MAX_SAFE_INTEGER'
     * - `string` any other case
     *
     * @param mix Object to walk through
     * @param Type Optionaly the Type Declaration, it could contain Meta data for json serialization.
     * @returns
     */
    export function fromObject (mix, Type?) {
        return bson_fromObject(mix, Type);
    }
    export function toObject <T = any> (bson, Type?: new (...args) => T): T {
        return bson_toObject(bson, Type);
    }
}
