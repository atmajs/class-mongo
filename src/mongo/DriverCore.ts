import { Db, FindOneOptions, FilterQuery, UpdateQuery, WriteOpResult, MongoCallback, UpdateWriteOpResult } from 'mongodb'
import { getConnectionString, getParams } from './Settings';
import MongoLib = require('mongodb');



export namespace core {
    let mongoLib: typeof MongoLib = null;
    
    export function getDb() {
        return Connections.getDb();
    };

    export function connect(cb: (error, db: Db) => void) {
        Connections.connect(null, null, cb);
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

        var c = db.collection(coll);
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

    export function upsertSingle<T = any>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , data: UpdateQuery<T> | Partial<T>
        , callback: MongoCallback<UpdateWriteOpResult>) {

        db
            .collection(coll)
            .updateOne(query, data, opt_upsertSingle, callback);
    };
    export function upsertMany<T = any>(db: MongoLib.Db
        , coll: string
        , array: ([FilterQuery<T>, UpdateQuery<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: MongoCallback<WriteOpResult>) {

        modifyMany(upsertSingle, db, coll, array, callback);
    };

    export function updateSingle<T = any>(db: MongoLib.Db
        , coll: string
        , query: FilterQuery<T>
        , mod: UpdateQuery<T> | Partial<T>
        , callback: MongoCallback<MongoLib.UpdateWriteOpResult> /*<error, stats>*/) {

        db
            .collection(coll)
            .updateOne(query, mod, {upsert: true}, callback);
    };
    export function updateMany<T = any>(db: MongoLib.Db
        , coll: string
        , array: ([FilterQuery<T>, UpdateQuery<T> | Partial<T>])[] /*[[query, data]]*/
        , callback: MongoCallback<WriteOpResult>) {

        modifyMany(updateSingle, db, coll, array, callback);
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
}

// ==== private

var opt_upsertSingle = {
    upsert: true,
    multi: false,
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
                this.url = getConnectionString();
            }
            if (params == null) {
                this.params = getParams();
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
                    this.db = client.db();

                    let arr = this.listeners;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i](this.error, this.db);
                    }
                });
        }
    }

    export function getDb(url?: string): MongoLib.Db {
        if (url == null) {
            return _connection?.db;
        }
        return _connections[url]?.db;
    }

    export function connect(url: string = null, params: any = null, callback) {
        let connection = url == null ? _connection : _connections[url];
        if (connection) {
            connection.connect(callback);
            return;
        }
        let _url = url ?? getConnectionString();
        let _params = params ?? getParams();

        connection = new Connection(_url, _params);

        _connections[url] = connection;
        _connection = _connection ?? connection;

        connection.connect(callback);
    };
}
