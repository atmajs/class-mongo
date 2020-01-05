import { core } from './DriverCore';
import { cb_toPromise } from './utils';
import { ICallback } from '../ICallback';

import MongoLib = require('mongodb');

export type IndexSpecification<T> = string | string[] | Record<keyof T, number>
export interface IndexOptions { 
    unique?: boolean 
    [ key: string]: any 
}
export interface IndexRaw { 
    key: { [property: string]: string | number }
    name?: string
    unique?: boolean
    [ key: string]: any 
}

export { core_profiler_getData as db_profiler_getData } from './DriverProfiler';
export { core_profiler_toggle as db_profiler_toggle } from './DriverProfiler';

function withDb(onError, fn: (db: MongoLib.Db) => void) {
    let db = core.getDb();
    if (db == null) {
        core.connect((err, db) => {
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

export function db_getCollection(name, cb: ICallback<MongoLib.Collection>) {
    withDb(cb, db => {
        let coll = db.collection(name);
        if (coll == null) {
            return cb(new Error(`<mongo> Collection Not Found: ${name}`));
        }
        cb(null, coll);
    });
};

export function db_resolveCollection(name) {
    return cb_toPromise(db_getCollection, name);
};

export function db_getDb(callback: ICallback<MongoLib.Db>) {
    withDb(callback, db => {
        callback(null, db);
    });
};

export function db_resolveDb() {
    return cb_toPromise(db_getDb);
};

export function db_findSingle<T = any>(coll: string, query: MongoLib.FilterQuery<T>, callback: ICallback<T>) {
    withDb(callback, db => {
        core.findSingle(db, coll, queryToMongo(query), null, callback);
    });
};

export function db_findMany<T = any>(coll: string, query: MongoLib.FilterQuery<T>, options: MongoLib.FindOneOptions, callback: ICallback<T[]>) {
    withDb(callback, db => {
        core.findMany(db, coll, queryToMongo(query), options ?? {}, callback);
    });

};

export function db_count<T = any>(
    coll: string
    , query: MongoLib.FilterQuery<T>
    , options: MongoLib.MongoCountPreferences = null
    , callback: ICallback<number>) {
    withDb(callback, db => {
        core.count(db, coll, query, options, callback);
    });
};

export function db_insert(coll, data, callback) {
    withDb(callback, db => {
        db
            .collection(coll)
            .insert(data, {}, callback);
    });
};
export function db_insertSingle(coll: string, data, callback) {
    withDb(callback, db => {
        db
            .collection(coll)
            .insertOne(data, {}, callback);
    });
};
export function db_insertMany(coll, data, callback) {
    withDb(callback, db => {
        db
            .collection(coll)
            .insertMany(data, {}, callback);
    });

};

export function db_updateSingle<T extends { _id: any }>(coll: string, data: T, callback) {
    withDb(callback, db => {
        if (data._id == null)
            return callback('<mongo:update> invalid ID');

        let query = {
            _id: db_ensureObjectID(data._id)
        };
        let $set = data;
        for (let key in data) {
            if (key === '_id') {
                continue;
            }
            $set[key] = data[key];
        }
        core.updateSingle(db, coll, query, { $set }, callback);
    });
};

export function db_updateMany<T extends { _id: any }>(coll: string, array: T[], callback) {
    withDb(callback, db => {
        let batch: [any, any][] = array.map(x => {
            return [
                { _id: db_ensureObjectID(x._id) },
                x
            ];
        });
        core.updateMany(db, coll, batch, callback);
    });

};

export function db_patchSingle(coll, id, patch, callback) {
    withDb(callback, db => {
        var query = { _id: db_ensureObjectID(id) };
        core.updateSingle(db, coll, query, patch, callback);
    });

};

export function db_remove(coll, query, isSingle, callback) {
    withDb(callback, db => {
        query = queryToMongo(query);

        const fn = isSingle
            ? core.removeSingle
            : core.removeMany
            ;
        fn(db, coll, query, callback);
    });
};


export function db_ensureIndexes(collection: string, indexes: IndexRaw[], callback) {
    withDb(callback, db => {
        var coll = db.collection(collection);
        coll.createIndexes(indexes, callback);
    });

};


export function db_ensureObjectID(value) {
    if (typeof value === 'string' && value.length === 24) {
        let { ObjectID } = core.getMongoLib();
        return new ObjectID(value);
    }
    return value;
};

export function db_getMongo() {
    return core.getMongoLib();
};

var queryToMongo = function (query) {
    if (query == null)
        return query;

    if (query.hasOwnProperty('$query') || query.hasOwnProperty('$limit'))
        return query;


    if (query.hasOwnProperty('_id'))
        query._id = db_ensureObjectID(query._id);

    var comparer = {
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

    for (var key in query) {
        var val = query[key],
            c;

        if (typeof val === 'string') {
            c = val.charCodeAt(0);
            switch (c) {
                case 62:
                case 60:

                    // >
                    var compare = comparer[c]['0'];

                    if (val.charCodeAt(1) === 61) {
                        // =
                        compare = comparer[c]['61'];
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

var createDbDelegate = function (fn, ...args) {
    let cb = args[args.length - 1];
    return function (error, db) {
        if (error)
            return cb(error);

        return fn.call(null, db, ...args);
    };
};
