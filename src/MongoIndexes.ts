import { IndexHandler } from './mongo/IndexHandler';
import { cb_toPromise } from './mongo/utils';

export namespace MongoIndexes {
    export function ensureAll () {
        return cb_toPromise(IndexHandler.ensureAll);
    }
}