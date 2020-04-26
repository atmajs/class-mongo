import { TFindQuery } from './DriverTypes';
import { core } from './DriverCore';


export namespace DriverUtils {
    export function getFindQuery <T extends { _id: any }> (finder: TFindQuery<T>, x: Partial<T>) {
        if (typeof finder === 'string') {
            if (finder === '_id') {
                return {
                    _id: ensureObjectID(x._id)
                }
            }
            return {
                [finder]: x[finder]
            }
        }
        return x;
    }

        
    export function ensureObjectID(value) {
        if (typeof value === 'string' && value.length === 24) {
            let { ObjectID } = core.getMongoLib();
            return new ObjectID(value);
        }
        return value;
    }
}