import * as MongoLib from 'mongodb';

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


let MAX_DECIMAL: bigint;
