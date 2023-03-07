import memd from 'memd';

import type { Db, Filter, FindOptions, Callback, WithId, Document, UpdateResult, UpdateFilter, DeleteResult, BulkWriteResult } from 'mongodb'
import { setts_getConnectionString, setts_getParams, setts_getDbName } from './Settings';
import { IAggrPipeline } from './DriverTypes';

import * as MongoLib from 'mongodb';
import { obj_partialToUpdateFilter } from '../utils/patchObject';
import { TDbCollection } from '../types/TDbCollection';
import { IEntity } from '../MongoEntity';

import { promise } from '../utils/promise';


export namespace core {
    let mongoLib: typeof MongoLib = null;

    export function getDb(server: string) {
        return Connections.getDb(server);
    };

    export async function connect(server: string): Promise<Db> {
        return Connections.connect(server);
    };

    export function getMongoLib(): typeof MongoLib {
        return mongoLib ?? (mongoLib = require('mongodb'));
    };

    export function findSingle<T extends IEntity = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: FindOptions
        , callback: Callback<T | null> /*<error, item>*/) {

        let c = db.collection(coll);
        if (options == null) {
            return promise.toCallback(c.findOne(query), callback);
        }
        promise.toCallback(c.findOne(query, options), callback);
    };
    export function findSingleAsync<T extends IEntity = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: FindOptions
    ) {
        return db.collection(coll).findOne(query, options ?? {});
    };


    export function findMany<T extends IEntity = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: FindOptions
        , callback: Callback<T[]> /*<error, array>*/) {

        let c = db.collection(coll);
        let cursor = c.find(query, options);
        promise.toCallback(cursor.toArray());
    };
    export async function findManyAsync<T extends IEntity = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: FindOptions
        ):  Promise<T[]> {

        let c = db.collection(coll);
        let cursor = c.find(query, options);
        let arr = await cursor.toArray();
        return <T[]> arr;
    };
    export function findManyPaged<T extends IEntity = any>(db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: FindOptions
        , callback: Callback<{ collection: T[], total: number }>) {

        let c = db.collection(coll);
        let cursor = c.find(query, options);
        promise.toCallback(cursor.count(), (error, total) => {
            if (error) {
                callback(error, null);
                return;
            }
            promise.toCallback(cursor.toArray(), (error, arr) => {
                if (error) {
                    callback(error, null);
                    return;
                }
                callback(null, {
                    collection: <T[]> arr,
                    total
                })
            });
        })
    };
    export async function findManyPagedAsync<T extends IEntity = any>(db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: FindOptions
    ): Promise<{ collection: T[], total: number }> {
        let c = db.collection(coll);
        let cursor = c.find(query, options);
        let [total, arr] = await Promise.all([
            cursor.count({
                limit: null,
                skip: null,
            }),
            cursor.toArray(),
        ]);
        return {
            collection: <T[]> arr,
            total
        };
    };

    export function aggregate<T = any[]>(db: MongoLib.Db
        , coll: string
        , pipeline: IAggrPipeline[]
        , options: MongoLib.AggregateOptions
        , callback: Callback<T[]> /*<error, array>*/) {

        let c = db.collection(coll);
        let cursor = c.aggregate(pipeline, options);
        promise.toCallback(cursor.toArray(), callback);
    };
    export function aggregateAsync<T = any[]>(db: MongoLib.Db
        , coll: string
        , pipeline: IAggrPipeline[]
        , options: MongoLib.AggregateOptions) {

        return db
            .collection(coll)
            .aggregate(pipeline, options)
            .toArray();
    };

    export function upsertSingle<T = any>(db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , data: UpdateFilter<T> | Partial<T>
        , callback: Callback<UpdateResult>) {

        let update = obj_partialToUpdateFilter(data);

        promise.toCallback(db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle), callback);
    };
    export function upsertSingleAsync<T = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , data: UpdateFilter<T> | Partial<T>) {

        let update = obj_partialToUpdateFilter(data);
        return db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle);
    };
    export function upsertMany<T extends { _id: any } >(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([Filter<T>, UpdateFilter<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: Callback<MongoLib.BulkWriteResult>) {

            let ops = array.map(op => {
                return {
                    updateOne: {
                        filter: op[0],
                        update: obj_partialToUpdateFilter<any>(op[1], null, null, meta),
                        upsert: true
                    }
                }
            });
            bulkWrite(db, meta.collection, ops, (err, result: MongoLib.BulkWriteResult) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                /** when updates of existed documents occures there will be no _id field */
                let upserted = result.getUpsertedIds();
                for (let i = 0; i < upserted.length; i++) {
                    let singleResult = upserted[i];
                    let { index, _id } = singleResult;

                    let x: any = array[index][1];
                    if (x._id == null) {
                        x._id = _id;
                    } else if (String(x._id) !== String(upserted[i])) {
                        callback(<any> new Error(`Unexpected missmatch: ${x._id} != ${upserted[i]}`), null);
                        return;
                    }
                }
                callback(err, result);
            });
    };
    export async function upsertManyAsync<T extends { _id: any } >(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([Filter<T>, UpdateFilter<T> | Partial<T>])[]
        ): Promise<MongoLib.BulkWriteResult> {

            let ops = array.map(op => {
                return {
                    updateOne: {
                        filter: op[0],
                        update: obj_partialToUpdateFilter<any>(op[1], null, null, meta),
                        upsert: true
                    }
                }
            });
            let result = await bulkWriteAsync(db, meta.collection, ops)
            /** when updates of existed documents occures there will be no _id field */
            let upserted = result.getUpsertedIds();
            for (let i = 0; i < upserted.length; i++) {
                let { index, _id } = upserted[i];

                let x: any = array[index][1];
                if (x._id == null) {
                    x._id = _id;
                } else if (String(x._id) !== String(upserted[i])) {
                    throw new Error(`Unexpected missmatch: ${x._id} != ${upserted[i]}`);
                }
            }
            return result;
    };
    export function patchMany<T extends { _id: any } >(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([Filter<T>, UpdateFilter<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: Callback<MongoLib.BulkWriteResult>) {

            let ops = array
                .map(op => {
                    let [ filter, data ] = op;
                    let patch = obj_partialToUpdateFilter(data, true, null, meta);
                    if (patch == null) {
                        return null;
                    }
                    return {
                        updateOne: {
                            filter: filter,
                            update: patch,
                            upsert: false
                        }
                    }
                })
                .filter(x => x != null);

            if (ops.length === 0) {
                callback(null, <MongoLib.BulkWriteResult> <any> {
                    ok: true,
                    nInserted: 0,
                    nModified: 0,
                    nMatched: 0,
                    nRemoved: 0,
                    nUpserted: 0,
                });
                return;
            }
            bulkWrite(db, meta.collection, ops, (err, result: MongoLib.BulkWriteResult) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, result);
            });
    };
    export async function patchManyAsync<T extends { _id: any } >(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([Filter<T>, UpdateFilter<T> | Partial<T>])[] /*[[query, data]]*/
        ): Promise<MongoLib.BulkWriteResult> {

        let ops = array
            .map(op => {
                let [ filter, data ] = op;
                let patch = obj_partialToUpdateFilter(data, true, null, meta);
                if (patch == null) {
                    return null;
                }
                return {
                    updateOne: {
                        filter: filter,
                        update: patch,
                        upsert: false
                    }
                }
            })
            .filter(x => x != null);

        if (ops.length === 0) {
            return <MongoLib.BulkWriteResult> <any> {
                ok: true,
                nInserted: 0,
                nModified: 0,
                nMatched: 0,
                nRemoved: 0,
                nUpserted: 0,
            };
        }
        let result: MongoLib.BulkWriteResult = await bulkWriteAsync (db, meta.collection, ops);
        return result;

    };

    export function updateSingle<T = any>(db: MongoLib.Db
        , meta: TDbCollection
        , query: Filter<T>
        , data: UpdateFilter<T> | Partial<T>
        , callback: Callback<MongoLib.UpdateResult> /*<error, stats>*/) {

        let update = obj_partialToUpdateFilter(data, true, null, meta);
        if (update == null) {
            callback(null, <MongoLib.UpdateResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        promise.toCallback(db
            .collection(meta.collection)
            .updateOne(query, update, opt_updateSingle), callback);
    };
    export async function updateSingleAsync<T = any>(db: MongoLib.Db
        , meta: TDbCollection
        , query: Filter<T>
        , data: UpdateFilter<T> | Partial<T>
        ): Promise<MongoLib.UpdateResult> {

        let update = obj_partialToUpdateFilter(data, true, null, meta);
        if (update == null) {
            return <MongoLib.UpdateResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            };
        }
        return db
            .collection(meta.collection)
            .updateOne(query, update, opt_updateSingle);
    };
    export function updateMultiple<T = any>(db: MongoLib.Db
        , meta: TDbCollection
        , query: Filter<T>
        , data: UpdateFilter<T> | Partial<T>
        , callback: Callback<MongoLib.UpdateResult> /*<error, stats>*/) {

        let update = obj_partialToUpdateFilter(data, true, null, meta);
        if (update == null) {
            callback(null, <MongoLib.UpdateResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        promise.toCallback(db
            .collection(meta.collection)
            .updateMany(query, update, opt_updateMultiple), callback);
    };
    export async function updateMultipleAsync<T extends IEntity = any>(db: MongoLib.Db
        , meta: TDbCollection
        , query: Filter<T>
        , data: UpdateFilter<T> | Partial<T>
    ): Promise<UpdateResult | Document> {

        let update = obj_partialToUpdateFilter(data, true, null, meta);
        if (update == null) {
            return <UpdateResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            };
        }
        return db
            .collection(meta.collection)
            .updateMany(query, update, opt_updateMultiple);
    };

    export function updateMany<T extends IEntity = any>(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([Filter<T>, UpdateFilter<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: Callback<BulkWriteResult>) {

        let ops = array
            .map(op => {
                let [ filter, data ] = op;
                let patch = obj_partialToUpdateFilter(data, true, null, meta);
                if (patch == null) {
                    return null;
                }
                return {
                    updateOne: {
                        filter: filter,
                        update: patch,
                        upsert: false
                    }
                };
            })
            .filter(x => x != null);
        if (ops.length === 0) {
            callback(null, <MongoLib.BulkWriteResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        bulkWrite(db, meta.collection, ops, callback);
    };
    export async function updateManyAsync<T extends IEntity = any>(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([Filter<T>, UpdateFilter<T> | Partial<T>])[]
        ): Promise<BulkWriteResult> {

        let ops = array
            .map(op => {
                let [ filter, data ] = op;
                let patch = obj_partialToUpdateFilter(data, true, null, meta);
                if (patch == null) {
                    return null;
                }
                return {
                    updateOne: {
                        filter: filter,
                        update: patch,
                        upsert: false
                    }
                };
            })
            .filter(x => x != null);
        if (ops.length === 0) {
            return <MongoLib.BulkWriteResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            };
        }
        return bulkWriteAsync(db, meta.collection, ops);
    };

    export function removeSingle<T = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , callback: Callback<DeleteResult> /*<error, count>*/) {

        promise.toCallback(db
            .collection(coll)
            .deleteOne(query), callback);
    };
    export async function removeSingleAsync<T = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
    ): Promise<DeleteResult> {
        return db
            .collection(coll)
            .deleteOne(query);
    };
    export function removeMany<T = any>(db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , callback: Callback<DeleteResult> /*<error, count>*/) {

        promise.toCallback(db
            .collection(coll)
            .deleteMany(query), callback);
    };
    export function removeManyAsync<T = any>(
        db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        ): Promise <DeleteResult>  {
        return db
            .collection(coll)
            .deleteMany(query);
    };

    export function count<T = any>(db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: MongoLib.CountDocumentsOptions
        , callback: Callback<number>/*<error, count>*/) {

        promise.toCallback(db
            .collection(coll)
            .countDocuments(query, options), callback);
    }
    export function countAsync<T = any>(db: MongoLib.Db
        , coll: string
        , query: Filter<T>
        , options: MongoLib.CountDocumentsOptions
    ): Promise<number> {
        return db
            .collection(coll)
            .countDocuments(query, options);
    }


    export function bulkWrite <T extends { _id: any }>(db: MongoLib.Db
        , coll: string
        , operations: MongoLib.AnyBulkWriteOperation<T>[]
        , callback: MongoLib.Callback<MongoLib.BulkWriteResult>) {

        promise.toCallback(db.collection(coll).bulkWrite(operations as any), callback);
    };

    export function bulkWriteAsync <T extends { _id: any }>(
        db: MongoLib.Db
        , coll: string
        , operations: MongoLib.AnyBulkWriteOperation<T>[]) {

        return db.collection(coll).bulkWrite(operations as any);
    };
}

// ==== private

const opt_upsertSingle = {
    upsert: true,
    multi: false,
};
const opt_updateSingle = {
    upsert: false,
    multi: false,
};
const opt_updateMultiple = {
    upsert: false,
    multi: true,
};
function modifyMany(modifier: Function, db, coll, array /*[[query, data]]*/, callback) {
    var error;
    let imax = array.length;
    let count = imax;
    let i = -1;
    if (imax === 0) {
        return callback();
    }
    while (++i < imax) {
        modifier(db, coll, array[i][0], array[i][1], listener);
    }

    function listener(err) {
        if (err) {
            error = err;
        }
        if (--count === 0) {
            callback(error);
        }
    }
}

namespace Connections {

    let _connection: Connection = null;
    let _connections: { [url: string]: Connection } = {};

    class Connection {
        // private connecting = false;
        // private listeners = [];

        client: MongoLib.MongoClient
        db: MongoLib.Db
        error: Error

        constructor(public url: string = null, public params: any = null) {
            if (url == null) {
                this.url = setts_getConnectionString();
            }
            if (params == null) {
                this.params = setts_getParams();
            }
        }

        @memd.deco.memoize({ perInstance: true })
        public async connect(): Promise<Db> {
            if (this.error != null) {
                throw this.error;
            }
            if (this.db != null) {
                return this.db;
            }

            let [ error, client ] = await promise.toCallback(core
                .getMongoLib()
                .MongoClient
                .connect(this.url, this.params)
            );

            if (error) {
                throw error;
            }

            this.error = error;
            this.client = client;
            this.db = client?.db(setts_getDbName());

            return this.db;
        }
    }

    export function getDb(server?: string): MongoLib.Db {
        if (server == null) {
            return _connection?.db;
        }
        return _connections[server]?.db;
    }

    export async function connect(server: string = null, params: any = null) {
        let connection = server == null ? _connection : _connections[server];
        if (connection) {
            return connection.connect();
        }
        let _url = setts_getConnectionString(server);
        let _params = params ?? setts_getParams(server);


        connection = new Connection(_url, _params);

        _connections[server] = connection;
        _connection = _connection ?? connection;

        return connection.connect();
    };
}
