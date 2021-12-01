import { TFindQuery } from './DriverTypes';
import { core } from './DriverCore';
import type * as MongoLib from 'mongodb';


export namespace DriverUtils {
    export function getFindQuery <T extends { _id: any }> (finder: TFindQuery<T>, x: Partial<T>): MongoLib.Filter<T> {
        if (typeof finder === 'string') {
            if (finder === '_id') {
                return {
                    _id: ensureObjectID(x._id)
                };
            }
            return <MongoLib.Filter<T>> {
                [finder]: x[finder]
            };
        }
        if (typeof finder === 'function') {
            return finder(x);
        }
        return <MongoLib.Filter<T>> finder;
    }


    export function ensureObjectID(value) {
        if (value == null) {
            return value;
        }
        let { ObjectID } = core.getMongoLib();
        if (typeof value === 'string' && value.length === 24) {
            return new ObjectID(value);
        }
        if (value instanceof ObjectID) {
            return value;
        }

        let $in = value.$in;
        if ($in != null) {
            for (let i = 0; i < $in.length; i++) {
                $in[i] = ensureObjectID($in[i]);
            }
        }
        return value;
    }
}
