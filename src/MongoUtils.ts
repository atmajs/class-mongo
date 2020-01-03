import { db_ensureObjectID } from './mongo/Driver';

export namespace MongoUtils {

    export function toObjectID (id: string) {
        return db_ensureObjectID(id);
    };
}