import { core } from './DriverCore';
import { cb_toPromise } from './utils';
import { ICallback } from '../ICallback';

import MongoLib = require('mongodb');
import { TFindQuery, IAggrExpression, IAggrPipeline } from './DriverTypes';
import { DriverUtils } from './DriverUtils';
import { FindOptions } from '../types/FindOptions';
import { IMongoMeta } from '../MongoMeta';
import { TDbCollection } from '../types/TDbCollection';


export type IndexSpecification<T> = string | string[] | Record<keyof T, number>


export interface IndexOptions {
    unique?: boolean
    sparse?: boolean
    [ key: string]: any
}
export interface IndexRaw {
    key: { [property: string]: string | number }
    name?: string
    unique?: boolean
    sparse?: boolean
    [ key: string]: any
}


export { core_profiler_getData as db_profiler_getData } from './DriverProfiler';
export { core_profiler_toggle as db_profiler_toggle } from './DriverProfiler';

function withDb(onError, server: string, fn: (db: MongoLib.Db) => void) {
    let db = core.getDb(server);
    if (db == null) {
        core.connect(server, (err, db) => {
            if (err) {
                onError(err);
                return;
            }
            fn(db);
        });
        return;
    }
    fn(db);
}

export function db_getCollection(meta: TDbCollection, cb: ICallback<MongoLib.Collection>) {
    withDb(cb, meta.server, db => {
        let coll = db.collection(meta.collection);
        if (coll == null) {
            return cb(new Error(`<mongo> Collection Not Found: ${meta}`));
        }
        cb(null, coll);
    });
};

export function db_resolveCollection(meta: TDbCollection) {
    return cb_toPromise(db_getCollection, meta);
};

export function db_getDb(server: string, callback: ICallback<MongoLib.Db>) {
    withDb(callback, server, db => {
        callback(null, db);
    });
};

export function db_resolveDb(server?: string) {
    return cb_toPromise(db_getDb, server);
};

export function db_findSingle<T = any>(
    meta: TDbCollection
    , query: MongoLib.FilterQuery<T>
    , options: FindOptions<T> & MongoLib.FindOneOptions
    , callback: ICallback<T>
) {

    withDb(callback, meta.server, db => {
        core.findSingle(db, meta.collection, queryToMongo(query), options, callback);
    });
};

export function db_findMany<T = any>(
    meta: TDbCollection
    , query: MongoLib.FilterQuery<T>
    , options: MongoLib.FindOneOptions
    , callback: ICallback<T[]>) {

    withDb(callback, meta.server, db => {
        core.findMany(db, meta.collection, queryToMongo(query), options ?? {}, callback);
    });
};

export function db_findManyPaged<T = any>(
    meta: TDbCollection
    , query: MongoLib.FilterQuery<T>
    , options: MongoLib.FindOneOptions
    , callback: ICallback<{collection: T[], total: number}>) {

    withDb(callback, meta.server, db => {
        core.findManyPaged(db, meta.collection, queryToMongo(query), options ?? {}, callback);
    });
};

export function db_aggregate<T = any>(
    meta: TDbCollection
    , pipeline: IAggrPipeline[]
    , options: MongoLib.CollectionAggregationOptions
    , callback: ICallback<T[]>) {

    withDb(callback, meta.server, db => {
        core.aggregate(db, meta.collection, pipeline, options ?? {}, callback);
    });
};



export function db_count<T = any>(
    meta: TDbCollection
    , query: MongoLib.FilterQuery<T>
    , options: MongoLib.MongoCountPreferences = null
    , callback: ICallback<number>) {
    withDb(callback, meta.server, db => {
        core.count(db, meta.collection, query, options, callback);
    });
};

export function db_insert(meta:TDbCollection, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insert(data, {}, callback);
    });
};
export function db_insertSingle(meta: TDbCollection, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insertOne(data, {}, callback);
    });
};
export function db_insertMany(meta: TDbCollection, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insertMany(data, {}, callback);
    });

};

export function db_updateSingle<T extends { _id: any }>(meta: TDbCollection, data: T, callback) {
    withDb(callback, meta.server, db => {
        if (data._id == null)
            return callback('<mongo:update> invalid ID');

        let query = {
            _id: DriverUtils.ensureObjectID(data._id)
        };
        core.updateSingle(db, meta, query, data, callback);
    });
};

export function db_updateMany<T extends { _id: any }>(meta: TDbCollection, array: T[], callback) {
    withDb(callback, meta.server, db => {
        let batch: [any, any][] = array.map(x => {
            return [
                { _id: DriverUtils.ensureObjectID(x._id) },
                x
            ];
        });
        core.updateMany(db, meta, batch, callback);
    });
};

export function db_updateManyBy<T extends { _id: any }>(meta: TDbCollection, finder: TFindQuery<T>, array: T[], callback) {
    withDb(callback, meta.server, db => {
        let batch: [any, any][] = array.map(x => {
            return [
                DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        core.updateMany(db, meta, batch, callback);
    });
};


export function db_upsertManyBy<T extends { _id: any }>(meta: TDbCollection, finder: TFindQuery<T>, array: T[], callback) {
    withDb(callback, meta.server, db => {
        let batch: [any, any][] = array.map(x => {
            return [
                DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        core.upsertMany(db, meta, batch, callback);
    });
};
export function db_upsertSingleBy<T extends { _id: any }>(meta: TDbCollection, finder: TFindQuery<T>, x: T, callback) {
    withDb(callback, meta.server, db => {
        core.upsertSingle(db,
            meta.collection
            , DriverUtils.getFindQuery(finder, x)
            , x
            , callback
        );
    });
};


export function db_patchSingle(meta: TDbCollection, id, patch, callback) {
    withDb(callback, meta.server, db => {
        let query = { _id: DriverUtils.ensureObjectID(id) };
        core.updateSingle(db, meta, query, patch, callback);
    });
};
export function db_patchSingleBy<T>(meta: TDbCollection, query: MongoLib.FilterQuery<T>, patch: MongoLib.UpdateQuery<T>, callback) {
    withDb(callback, meta.server, db => {
        core.updateSingle(db, meta, query, patch, callback);
    });
};
export function db_patchMultipleBy<T>(meta: TDbCollection, query: MongoLib.FilterQuery<T>, patch: MongoLib.UpdateQuery<T>, callback) {
    withDb(callback, meta.server, db => {
        core.updateMultiple(db, meta, query, patch, callback);
    });
};
export function db_patchMany<T>(meta: TDbCollection, arr: [MongoLib.FilterQuery<T>, Partial<T> | MongoLib.UpdateQuery<T>][], callback) {
    withDb(callback, meta.server, db => {
        core.patchMany(db, meta, arr, callback);
    });
}

export function db_remove(meta: TDbCollection, query, isSingle, callback) {
    withDb(callback, meta.server, db => {
        query = queryToMongo(query);

        const fn = isSingle
            ? core.removeSingle
            : core.removeMany
            ;
        fn(db, meta.collection, query, callback);
    });
};


export function db_ensureIndexes(meta: TDbCollection, indexes: IndexRaw[], callback) {
    withDb(callback, meta.server, db => {
        let dbCollection = db.collection(meta.collection);
        dbCollection.createIndexes(indexes, callback);
    });

};

export function db_getMongo() {
    return core.getMongoLib();
};

const COMPARER = {
    62: {
        // >
        0: '$gt',
        // >=
        61: '$gte'
    },
    60: {
        // <
        0: '$lt',
        // <=
        61: '$lte'
    }
};

function queryToMongo (query) {
    if (query == null) {
        return query;
    }
    if ('$query' in query || '$limit' in query) {
        return query;
    }
    if ('_id' in query) {
        query._id = DriverUtils.ensureObjectID(query._id);
    }
    for (let key in query) {
        let val = query[key];
        if (typeof val === 'string') {
            let c = val.charCodeAt(0);
            switch (c) {
                case 62:
                case 60:
                    // >
                    let compare = COMPARER[c]['0'];
                    if (val.charCodeAt(1) === 61) {
                        // =
                        compare = COMPARER[c]['61'];
                        val = val.substring(2);
                    } else {
                        val = val.substring(1);
                    }
                    query[key] = {};
                    query[key][compare] = parseFloat(val);
                    continue;
            };
        }
    }

    return query;
};
