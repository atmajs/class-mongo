import * as MongoLib from 'mongodb';
import { Decimal128 } from 'mongodb';

export function bigint_toBson (value: bigint) {
    if (value < BigInt(Number.MAX_SAFE_INTEGER)) {
        return Number(value);
    }
    if (MAX_DECIMAL == null) {
        MAX_DECIMAL = BigInt(10)**BigInt(34) - BigInt(1);
    }

    let str = value.toString();
    if (value < MAX_DECIMAL) {
        return MongoLib.Decimal128.fromString(str);
    }
    return str;
}


export function bigint_fromBson (value: Decimal128) {
    let str = value.toString();
    let number = Number(str);
    if (number < Number.MAX_SAFE_INTEGER) {
        return number;
    }
    if (str.includes('.')) {
        return str;
    }
    return BigInt(str);
}


let MAX_DECIMAL: bigint;
