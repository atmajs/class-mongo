import { db_profiler_toggle, db_profiler_getData } from './mongo/Driver';

export namespace MongoProfiler {
    export function toggle (enabled?: boolean, settings?: any) {
        db_profiler_toggle(enabled, settings);
    }
    export function getData() {
        return db_profiler_getData();
    }
}