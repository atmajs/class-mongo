
import * as MongoLib from 'mongodb';


export namespace Types {
    export function Decimal128 (val: number | bigint | string | MongoLib.Decimal128) {
        switch (typeof val) {
            case 'undefined':
                return null;
            case 'number':
            case 'bigint':
                return MongoLib.Decimal128.fromString(val.toString());
            case 'string':
                if (val.startsWith('0x')) {
                    return MongoLib.Decimal128.fromString(String(BigInt(val)));
                }
                return MongoLib.Decimal128.fromString(val);
            case 'object':
                let bsonType = (val as any)._bsontype;
                if (bsonType === 'Decimal128') {
                    return val;
                }
                break;
        }
        throw new Error(`Invalid decimal type for ${val} (${typeof val})`);
    }

    export const Mapping = {
        decimal: Decimal128,
    }
}

export type TMongoType = typeof Types.Decimal128 | 'decimal';
