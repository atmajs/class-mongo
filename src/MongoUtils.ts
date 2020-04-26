import { DriverUtils } from './mongo/DriverUtils';

export namespace MongoUtils {

    export function toObjectID (id: string) {
        return DriverUtils.ensureObjectID(id);
    };
}