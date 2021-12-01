import { core } from './DriverCore';
import { cb_toPromise } from './utils';
import { ICallback } from '../ICallback';

import * as MongoLib from 'mongodb';
import { TFindQuery, IAggrPipeline } from './DriverTypes';
import { DriverUtils } from './DriverUtils';
import { FindOptions } from '../types/FindOptions';
import { TDbCollection } from '../types/TDbCollection';
import { deprecated_log } from '../utils/deprecated';
import { bson_normalizeQuery } from '../utils/bson';
import { IEntity } from '../MongoEntity';
import type { Callback, UpdateResult, Document } from 'mongodb';


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

function withDbAsync<TResult> (server: string, fn: (db: MongoLib.Db) => Promise<TResult>): Promise<TResult> {
    let db = core.getDb(server);
    if (db == null) {
        return new Promise((resolve, reject) => {
            core.connect(server, (err, db) => {
                if (err) {
                    reject(err);
                    return;
                }
                fn(db).then(resolve, reject);
            });
            return;
        });
    }
    return fn(db);
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

export function db_getCollectionAsync(meta: TDbCollection): Promise<MongoLib.Collection> {
    return withDbAsync(meta.server, async db => {
        let coll = await db.collection(meta.collection);
        if (coll == null) {
            throw new Error(`<mongo> Collection Not Found: ${meta}`);
        }
        return coll;
    });
};


export function db_getDb(server: string, callback: ICallback<MongoLib.Db>) {
    withDb(callback, server, db => {
        callback(null, db);
    });
};

export function db_getDbAsync(server?: string): Promise<MongoLib.Db> {
    return withDbAsync(server, async db => {
        return db;
    })
};

export function db_findSingle<T extends IEntity = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: FindOptions<T> & MongoLib.FindOptions
    , callback: ICallback<T>
) {
    withDb(callback, meta.server, db => {
        core.findSingle(db, meta.collection, queryToMongo(query), options, callback);
    });
};

export function db_findSingleAsync<T extends IEntity = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: FindOptions<T> & MongoLib.FindOptions
) {
    return withDbAsync(meta.server, db => {
        return core.findSingleAsync(db, meta.collection, queryToMongo(query), options);
    });
};

export function db_findMany<T extends IEntity = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: MongoLib.FindOptions
    , callback: ICallback<T[]>
) {
    withDb(callback, meta.server, db => {
        core.findMany(db, meta.collection, queryToMongo(query), options ?? {}, callback);
    });
};

export function db_findManyAsync<T extends IEntity = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: MongoLib.FindOptions
    ): Promise<T[]> {

    return withDbAsync(meta.server, db => {
        return core.findManyAsync(db, meta.collection, queryToMongo(query), options ?? {});
    });
};

export function db_findManyPaged<T extends IEntity = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: FindOptions<T> & MongoLib.FindOptions
    , callback: Callback<{collection: T[], total: number}>) {

    withDb(callback, meta.server, db => {
        core.findManyPaged(db, meta.collection, queryToMongo(query), options ?? {}, callback);
    });
};
export async function db_findManyPagedAsync<T extends IEntity = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: FindOptions<T> & MongoLib.FindOptions
    ): Promise<{collection: T[], total: number}> {

    return withDbAsync (meta.server, db => {
        return core.findManyPagedAsync(db, meta.collection, queryToMongo(query), options ?? {});
    });
};

export function db_aggregate<T = any>(
    meta: TDbCollection
    , pipeline: IAggrPipeline[]
    , options: MongoLib.AggregateOptions
    , callback: Callback<T[]>) {

    withDb(callback, meta.server, db => {
        core.aggregate(db, meta.collection, pipeline, options ?? {}, callback);
    });
};
export function db_aggregateAsync<T = any>(
    meta: TDbCollection
    , pipeline: IAggrPipeline[]
    , options: MongoLib.AggregateOptions) {

    return withDbAsync(meta.server, db => {
        return core.aggregateAsync(db, meta.collection, pipeline, options ?? {});
    });
};

export function db_count<T = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: MongoLib.CountDocumentsOptions = null
    , callback: ICallback<number>) {
    withDb(callback, meta.server, db => {
        core.count(db, meta.collection, query, options, callback);
    });
};
export function db_countAsync<T = any>(
    meta: TDbCollection
    , query: MongoLib.Filter<T>
    , options: MongoLib.CountDocumentsOptions = null) {
    return withDbAsync(meta.server, db => {
        return core.countAsync(db, meta.collection, query, options);
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
export function db_insertSingleAsync(meta: TDbCollection, data) {
    return withDbAsync(meta.server, db => {
        return db
            .collection(meta.collection)
            .insertOne(data);
    });
};
export function db_insertMany(meta: TDbCollection, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insertMany(data, {}, callback);
    });
};
export function db_insertManyAsync(meta: TDbCollection, data) {
    return withDbAsync(meta.server, db => {
        return db
            .collection(meta.collection)
            .insertMany(data, {});
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

export function db_updateSingleAsync<T extends { _id: any }>(meta: TDbCollection, data: T) {
    return withDbAsync(meta.server, db => {
        if (data._id == null) {
            return Promise.reject('<mongo:update> invalid ID');
        }
        let query = {
            _id: DriverUtils.ensureObjectID(data._id)
        };
        return core.updateSingleAsync(db, meta, query, data);
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

export function db_updateManyAsync<T extends { _id: any }>(meta: TDbCollection, array: T[]) {
    return withDbAsync(meta.server, db => {
        let batch: [any, any][] = array.map(x => {
            return [
                { _id: DriverUtils.ensureObjectID(x._id) },
                x
            ];
        });
        return core.updateManyAsync(db, meta, batch);
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
        let batch: [any, any][] = array.map(entity => {
            return [
                DriverUtils.getFindQuery(finder, entity),
                entity
            ];
        });
        core.upsertMany(db, meta, batch, callback);
    });
};
export function db_upsertManyByAsync<T extends { _id: any }>(meta: TDbCollection, finder: TFindQuery<T>, array: T[]) {
    return withDbAsync(meta.server, async db => {
        let batch: [any, any][] = array.map(entity => {
            return [
                DriverUtils.getFindQuery(finder, entity),
                entity
            ];
        });
        return await core.upsertManyAsync(db, meta, batch);
    });
};
export function db_upsertSingleBy<T extends { _id: any }>(
    meta: TDbCollection,
    finder: TFindQuery<T>,
    x: T,
    callback,) {
    withDb(callback, meta.server, db => {
        core.upsertSingle(db,
            meta.collection
            , DriverUtils.getFindQuery(finder, x)
            , x
            , callback
        );
    });
};
export function db_upsertSingleByAsync<T extends { _id: any }>(
    meta: TDbCollection,
    finder: TFindQuery<T>,
    x: T) {
    return withDbAsync(meta.server, db => {
        return core.upsertSingleAsync(db,
            meta.collection
            , DriverUtils.getFindQuery(finder, x)
            , x
        );
    });
};


export function db_patchSingle<T extends IEntity>(meta: TDbCollection, id, patch: MongoLib.UpdateFilter<T>, callback) {
    withDb(callback, meta.server, db => {
        let query = { _id: DriverUtils.ensureObjectID(id) };
        core.updateSingle(db, meta, query, patch, callback);
    });
};
export function db_patchSingleAsync<T extends IEntity>(meta: TDbCollection, id, patch: MongoLib.UpdateFilter<T>) {
    return withDbAsync(meta.server, db => {
        let query = { _id: DriverUtils.ensureObjectID(id) };
        return core.updateSingleAsync(db, meta, query, patch);
    });
};

export function db_patchSingleBy<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>, callback) {
    withDb(callback, meta.server, db => {
        core.updateSingle(db, meta, query, patch, callback);
    });
};
export function db_patchSingleByAsync<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>) {
    return withDbAsync(meta.server, db => {
        return core.updateSingleAsync(db, meta, query, patch);
    });
};
export function db_patchMultipleBy<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>, callback) {
    withDb(callback, meta.server, db => {
        core.updateMultiple(db, meta, query, patch, callback);
    });
};
export function db_patchMultipleByAsync<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>): Promise<UpdateResult | Document> {
    return withDbAsync(meta.server, db => {
        return core.updateMultipleAsync(db, meta, query, patch);
    });
};
export function db_patchMany<T extends IEntity>(meta: TDbCollection, arr: [MongoLib.Filter<T>, Partial<T> | MongoLib.UpdateFilter<T>][], callback) {
    withDb(callback, meta.server, db => {
        core.patchMany(db, meta, arr, callback);
    });
}
export function db_patchManyAsync<T extends IEntity>(meta: TDbCollection, arr: [MongoLib.Filter<T>, Partial<T> | MongoLib.UpdateFilter<T>][]) {
    return withDbAsync(meta.server, db => {
        return core.patchManyAsync(db, meta, arr);
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

export async function db_removeAsync(meta: TDbCollection, query, isSingle) {
    return withDbAsync(meta.server, db => {
        query = queryToMongo(query);

        const fn = isSingle
            ? core.removeSingleAsync
            : core.removeManyAsync
            ;
        return fn(db, meta.collection, query);
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
    bson_normalizeQuery(query);

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
                    deprecated_log('07.2021 "foo": ">1" will be dropped. Use mongo queries instead');
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
