import { Db, FindOneOptions, FilterQuery, UpdateQuery, WriteOpResult, MongoCallback, UpdateWriteOpResult } from 'mongodb'
import { setts_getConnectionString, setts_getParams, setts_getDbName } from './Settings';
import { IAggrPipeline } from './DriverTypes';

import * as MongoLib from 'mongodb';
import { obj_partialToUpdateQuery } from '../utils/patchObject';
import { TDbCollection } from '../types/TDbCollection';


export namespace core {
    let mongoLib: typeof MongoLib = null;

    export function getDb(server: string) {
        return Connections.getDb(server);
    };

    export function connect(server: string, cb: (error, db: Db) => void) {
        Connections.connect(server, null, cb);
    };

    export function getMongoLib(): typeof MongoLib {
        return mongoLib ?? (mongoLib = require('mongodb'));
    };

    export function findSingle<T = any>(
        db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , options: FindOneOptions
        , callback: MongoCallback<T | null> /*<error, item>*/) {

        let c = db.collection(coll);
        if (options == null) {
            return c.findOne(query, callback);
        }
        c.findOne(query, options, callback);
    };

    export function findMany<T = any[]>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , options: FindOneOptions
        , callback: MongoCallback<T[]> /*<error, array>*/) {

        let c = db.collection(coll);
        let cursor = c.find(query, options);
        cursor.toArray(callback);
    };
    export function findManyPaged<T = any[]>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , options: FindOneOptions
        , callback: MongoCallback<{ collection: T[], total: number }>) {

        let c = db.collection(coll);
        let cursor = c.find(query, options);
        cursor.count(false, (error, total) => {
            if (error) {
                callback(error, null);
                return;
            }
            cursor.toArray((error, arr) => {
                if (error) {
                    callback(error, null);
                    return;
                }
                callback(null, {
                    collection: arr,
                    total
                })
            });
        })

    };

    export function aggregate<T = any[]>(db: MongoLib.Db
        , coll: string
        , pipeline: IAggrPipeline[]
        , options: MongoLib.CollectionAggregationOptions
        , callback: MongoCallback<T[]> /*<error, array>*/) {

        let c = db.collection(coll);
        let cursor = c.aggregate(pipeline, options);
        cursor.toArray(callback);
    };

    export function upsertSingle<T = any>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , data: UpdateQuery<T> | Partial<T>
        , callback: MongoCallback<UpdateWriteOpResult>) {

        let update = obj_partialToUpdateQuery(data);

        db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle, callback);
    };
    export function upsertMany<T extends { _id: any } >(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([FilterQuery<T>, UpdateQuery<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: MongoCallback<MongoLib.BulkWriteResult>) {

            let ops = array.map(op => {
                return {
                    updateOne: {
                        filter: op[0],
                        update: obj_partialToUpdateQuery<any>(op[1], null, null, meta),
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
    export function patchMany<T extends { _id: any } >(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([FilterQuery<T>, UpdateQuery<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: MongoCallback<MongoLib.BulkWriteResult>) {

            let ops = array
                .map(op => {
                    let [ filter, data ] = op;
                    let patch = obj_partialToUpdateQuery(data, true, null, meta);
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

    export function updateSingle<T = any>(db: MongoLib.Db
        , meta: TDbCollection
        , query: FilterQuery<T>
        , data: UpdateQuery<T> | Partial<T>
        , callback: MongoCallback<MongoLib.UpdateWriteOpResult> /*<error, stats>*/) {

        let update = obj_partialToUpdateQuery(data, true, null, meta);
        if (update == null) {
            callback(null, <MongoLib.UpdateWriteOpResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        db
            .collection(meta.collection)
            .updateOne(query, update, opt_updateSingle, callback);
    };
    export function updateMultiple<T = any>(db: MongoLib.Db
        , meta: TDbCollection
        , query: FilterQuery<T>
        , data: UpdateQuery<T> | Partial<T>
        , callback: MongoCallback<MongoLib.UpdateWriteOpResult> /*<error, stats>*/) {

        let update = obj_partialToUpdateQuery(data, true, null, meta);
        if (update == null) {
            callback(null, <MongoLib.UpdateWriteOpResult> <any> {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        db
            .collection(meta.collection)
            .updateMany(query, update, opt_updateMultiple, callback);
    };

    export function updateMany<T = any>(db: MongoLib.Db
        , meta: TDbCollection
        , array: ([FilterQuery<T>, UpdateQuery<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: MongoCallback<WriteOpResult>) {

        let ops = array
            .map(op => {
                let [ filter, data ] = op;
                let patch = obj_partialToUpdateQuery(data, true, null, meta);
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
            callback(null, <MongoLib.WriteOpResult> <any> {
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

    export function removeSingle<T = any>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , callback: MongoCallback<WriteOpResult> /*<error, count>*/) {

        db
            .collection(coll)
            .deleteOne(query, callback);
    };
    export function removeMany<T = any>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , callback: MongoCallback<WriteOpResult> /*<error, count>*/) {

        db
            .collection(coll)
            .deleteMany(query, callback);
    };

    export function count<T = any>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , options: MongoLib.MongoCountPreferences
        , callback: MongoCallback<number>/*<error, count>*/) {

        db
            .collection(coll)
            .countDocuments(query, options, callback);
    }


    export function bulkWrite <T extends { _id: any }>(db: MongoLib.Db
        , coll: string
        , operations: MongoLib.BulkWriteOperation<T>[]
        , callback) {

        db.collection(coll).bulkWrite(operations, callback);
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
        private connecting = false;
        private listeners = [];

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

        public connect(callback) {
            if (this.db != null || this.error != null) {
                callback(this.error, this.db);
                return;
            }
            this.listeners.push(callback);
            if (this.connecting) {
                return;
            }

            this.connecting = true;

            core.getMongoLib()
                .MongoClient
                .connect(this.url, this.params, (error, client) => {
                    this.connecting = false;
                    this.error = error;
                    this.client = client;
                    this.db = client?.db(setts_getDbName());

                    let arr = this.listeners;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i](this.error, this.db);
                    }
                });
        }
    }

    export function getDb(server?: string): MongoLib.Db {
        if (server == null) {
            return _connection?.db;
        }
        return _connections[server]?.db;
    }

    export function connect(server: string = null, params: any = null, callback) {
        let connection = server == null ? _connection : _connections[server];
        if (connection) {
            connection.connect(callback);
            return;
        }
        let _url = setts_getConnectionString(server);
        let _params = params ?? setts_getParams(server);

        connection = new Connection(_url, _params);

        _connections[server] = connection;
        _connection = _connection ?? connection;

        connection.connect(callback);
    };
}
