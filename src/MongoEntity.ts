import { JsonConvert } from 'class-json'
import { db_findSingle, db_insertSingle, db_updateSingle, db_findMany, db_insertMany, db_updateMany, db_remove, db_patchSingle, db_getCollection, db_getDb, db_count } from './mongo/Driver';
import { MongoMeta } from './MongoMeta';
import { FilterQuery, UpdateQuery, Collection, Db } from 'mongodb';
import { mixin, is_Array, class_Dfr } from 'atma-utils'
import { cb_toPromise, cb_createListener } from './mongo/utils';
import { obj_patchValidate, obj_patch } from './utils/patchObject';

export class MongoEntity {

    _id: string


    static async fetch<T extends typeof MongoEntity>(this: T, query: FilterQuery<T>): Promise<InstanceType<T>> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_findSingle, coll, query).then(json => {
            if (json == null) {
                return null;
            }
            return JsonConvert.fromJson<T>(json, { Type: this });
        });
    }
    static async fetchMany<T extends typeof MongoEntity>(this: T, query?: FilterQuery<T>, options?): Promise<InstanceType<T>[]> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_findMany, coll, query, options).then(arr => {
            return JsonConvert.fromJson<T>(arr, { Type: this });
        });
    }
    static async count<T extends typeof MongoEntity>(query?: FilterQuery<T>) {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_count, coll, query);
    }
    static async upsert<T extends MongoEntity>(instance: T): Promise<T> {
        return EntityMethods.save(instance);
    }
    static async upsertMany<T extends MongoEntity>(arr: T[]): Promise<T[]> {
        return EntityMethods.saveMany(arr);
    }
    static async del<T extends MongoEntity>(x: T): Promise<any> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.del(coll, x);
    }
    static async delMany<T extends MongoEntity>(arr: T[]): Promise<any> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.delMany(coll, arr);
    }
    static async patch<T extends MongoEntity>(instance: T, patch): Promise<T> {
        return EntityMethods.patch(instance, patch);
    }
    static async getCollection(): Promise<Collection> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_getCollection, coll);
    }
    static async getDb (): Promise<Db> {
        return cb_toPromise(db_getDb);
    }
    upsert(): Promise<this> {
        return EntityMethods.save(this);
    }
    del() {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.del(coll, this);
    }
    patch <T extends MongoEntity> (this: T, patch: UpdateQuery<T>): Promise<T> {
        return EntityMethods.patch(this, patch);
    }
}

export interface IEntity {
    _id: string
}

export type Constructor<T = {}> = {
    new(...args: any[]): T;
};

export function MongoEntityFor<T>(Base: Constructor<T>) {
    return mixin(Base, MongoEntity);
}

namespace EntityMethods {
    export function save<T extends MongoEntity>(x: T): Promise<T> {
        let coll = MongoMeta.getCollection(x);
        let json = JsonConvert.toJson(x, { Type: x.constructor as any })
        let fn = json._id == null
            ? db_insertSingle
            : db_updateSingle
            ;

        return cb_toPromise(fn, coll, json).then(result => {
            let array = result.ops;
            if (array != null && x._id == null) {
                if (is_Array(array) && array.length === 1) {
                    x._id = array[0]._id
                } else {
                    return Promise.reject('<mongo:insert-single> expected an array in callback');
                }
            }
            return x;
        });
    }

    export function saveMany<T extends MongoEntity>(arr: T[]): Promise<T[]> {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }
        let Type = arr[0].constructor;
        let coll = MongoMeta.getCollection(Type);

        var insert = [],
            insertIndexes = [],
            update = [];

        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            let json = JsonConvert.toJson(x, { Type: Type as any })
            if (x._id == null) {
                insert.push(json);
                insertIndexes.push(i);
                continue;
            }
            update.push(json);
        }

        let awaitCount = insert.length > 0 && update.length > 0 ? 2 : 1;
        let dfr = new class_Dfr;
        let listener = cb_createListener(awaitCount, (error) => {
            if (error) {
                dfr.reject(error);
                return;
            }
            dfr.resolve(arr);
        });

        if (insert.length) {
            db_insertMany(coll, insert, (error, result) => {
                if (result != null) {
                    let ops = result.ops;
                    if (is_Array(ops) === false) {
                        listener(new Error('<mongo:bulk insert> array expected'));
                        return;
                    }

                    if (ops.length !== insertIndexes.length) {
                        listener(new Error(`<mongo:bulk insert> count missmatch: ${ops.length}/${insertIndexes.length}`));
                        return;
                    }
                    /**
                    *   @TODO make sure if mongodb returns an array of inserted documents
                    *   in the same order as it was passed to insert method
                    */
                    for (var i = 0; i < insertIndexes.length; i++) {
                        let index = insertIndexes[i];
                        arr[index]._id = ops[i]._id;
                    }
                }
                listener(error);
            });
        }

        if (update.length) {
            db_updateMany(coll, update, listener);
        }
        return dfr as any as Promise<T[]>;
    }


    export function patch<T extends MongoEntity>(x: T, patch: UpdateQuery<T>): Promise<T> {

        let coll = MongoMeta.getCollection(x);
        let id = x._id;

        if (id == null) {
            return Promise.reject(new Error(`<class:patch> 'id' is not defined for ${coll}`));
        }
        if (coll == null) {
            return Promise.reject(new Error(`<class:patch> 'Collection' is not defined for ${id}`));
        }

        let error = obj_patchValidate(patch);
        if (error != null) {
            return Promise.reject(new Error(error));
        }

        obj_patch(this, patch);
        return cb_toPromise(
            db_patchSingle,
            coll,
            id,
            patch
        ).then(_ => x);
    }

    export function del(coll: string, x: { _id: string | Object }) {
        if (coll == null) {
            return Promise.reject(new Error(`Delete for ${x._id} failed as Collection is not set`));
        }
        if (x._id == null) {
            return Promise.reject(new Error(`Delete in ${coll} failed as ID is undefined`));
        }

        return cb_toPromise(db_remove, coll, x, true).then(x => {
            return x.result;
        });
    }
    export function delMany(coll: string, arr: { _id: string | Object }[]) {
        if (coll == null) {
            return Promise.reject(new Error(`Delete many failed as collection is not set`));
        }
        const ids = [];
        for (var i = 0; i < arr.length; i++) {
            let x = arr[i];
            if (x._id) {
                ids.push(x._id);
            }
        }
        
        return cb_toPromise(db_remove, coll, { _id: { $in: ids } }, false).then(x => {
            return x.result;
        });
    }
}