import { TFindQuery } from './DriverTypes';
import { core } from './DriverCore';
import MongoLib = require('mongodb');


export namespace DriverUtils {
    export function getFindQuery <T extends { _id: any }> (finder: TFindQuery<T>, x: Partial<T>): MongoLib.FilterQuery<T> {
        if (typeof finder === 'string') {
            if (finder === '_id') {
                return {
                    _id: ensureObjectID(x._id)
                };
            }
            return <MongoLib.FilterQuery<T>> {
                [finder]: x[finder]
            };
        }
        if (typeof finder === 'function') {
            return finder(x);
        }
        return <MongoLib.FilterQuery<T>> finder;
    }


    export function ensureObjectID(value) {
        if (typeof value === 'string' && value.length === 24) {
            let { ObjectID } = core.getMongoLib();
            return new ObjectID(value);
        }
        return value;
    }
}
