import { JsonConvert, Serializable } from 'class-json'
import {
    db_findSingle,
    db_insertSingle,
    db_updateSingle,
    db_findMany,
    db_insertMany,
    db_updateMany,
    db_remove,
    db_patchSingle,
    db_getCollection,
    db_getDb,
    db_count,
    db_updateManyBy,
    db_upsertManyBy,
    db_aggregate,
    db_upsertSingleBy,
    db_patchSingleBy,
    db_findManyPaged,
    db_patchMany,
    db_patchMultipleBy
} from './mongo/Driver';

import { MongoMeta } from './MongoMeta';
import { FilterQuery, UpdateQuery, Collection, Db, FindOneOptions } from 'mongodb';
import { mixin, is_Array, class_Dfr } from 'atma-utils'
import { cb_toPromise, cb_createListener } from './mongo/utils';
import { obj_patch, obj_partialToUpdateQuery } from './utils/patchObject';
import { TFindQuery, IAggrPipeline } from './mongo/DriverTypes';
import { FindOptions, FindOptionsProjected, TProjection, TDeepPickByProjection } from './types/FindOptions';

import MongoLib = require('mongodb');
import { ProjectionUtil } from './utils/projection';
import { DeepPartial } from './types/DeepPartial';
import { TDbCollection } from './types/TDbCollection';

// type PickProjection<T, K extends keyof T> = {
//     [P in K]:
//         T[P] extends (Array<infer TArr> | Date)
//         ? (T[P])
//         : (T[P] extends object ? PickProjection<T[P], keyof T[P]> : T[P])
// };

export class MongoEntity<T = any> extends Serializable<T> {

    _id: string

    static async fetch<T extends typeof MongoEntity>(this: T, query: FilterQuery<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & FindOneOptions): Promise<InstanceType<T>> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_findSingle, coll, query, options).then(json => {
            if (json == null) {
                return null;
            }
            return JsonConvert.fromJSON<InstanceType<T>>(json, { Type: this });
        });
    }
    static async fetchPartial<
        T extends typeof MongoEntity,
        P extends TProjection<InstanceType<T>>
    >(this: T
        , query: FilterQuery<InstanceType<T>>
        , options: (Omit<FindOneOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)
    ): Promise<TDeepPickByProjection<InstanceType<T>, P>> {
        return <any> this.fetch(query, <any> ProjectionUtil.handleOpts(options));
    }

    static async fetchMany<T extends typeof MongoEntity>(this: T
        , query?: FilterQuery<InstanceType<T>>
        , options?: FindOptions<InstanceType<T>> & FindOneOptions
    ): Promise<InstanceType<T>[]> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_findMany, coll, query, options).then(arr => {
            return JsonConvert.fromJSON<InstanceType<T>[]>(arr, { Type: this });
        });
    }
    static async fetchManyPartial<
        T extends typeof MongoEntity,
        P extends TProjection<InstanceType<T>>
    >(this: T
        , query: FilterQuery<InstanceType<T>>
        , options: (Omit<FindOneOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)
    ): Promise<TDeepPickByProjection<InstanceType<T>, P>[]> {
        return <any> this.fetchMany(query, <any> ProjectionUtil.handleOpts(options));
    }

    static async fetchManyPaged<T extends typeof MongoEntity>(this: T
        , query?: FilterQuery<InstanceType<T>>
        , options?: FindOptions<InstanceType<T>> & FindOneOptions
    ): Promise<{ collection: InstanceType<T>[], total: number }> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_findManyPaged, coll, query, options).then(result => {
            return {
                collection: JsonConvert.fromJSON<InstanceType<T>[]>(result.collection, { Type: this }),
                total: result.total
            };
        });
    }
    static async fetchManyPagedPartial<
        T extends typeof MongoEntity,
        P extends TProjection<InstanceType<T>>
    >(this: T
        , query: FilterQuery<InstanceType<T>>
        , options: (Omit<FindOneOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)
    ): Promise<{ collection: TDeepPickByProjection<InstanceType<T>, P>[], total: number }> {
        return <any> this.fetchManyPaged(query, <any> ProjectionUtil.handleOpts(options));
    }

    static async aggregateMany<TOut = any, T extends typeof MongoEntity = any>(this: T
        , pipeline?: IAggrPipeline[]
        , options?: { Type?: Constructor<TOut> } & MongoLib.CollectionAggregationOptions
    ): Promise<TOut[]> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_aggregate, coll, pipeline, options).then(arr => {
            return JsonConvert.fromJSON<TOut[]>(arr, { Type: options?.Type });
        });
    }
    static async aggregateManyPaged<TOut = any, T extends typeof MongoEntity = any>(this: T
        , pipeline?: IAggrPipeline[]
        , options?: { Type?: Constructor<TOut> } & MongoLib.CollectionAggregationOptions
    ): Promise<{ collection: TOut[], total: number }> {
        let coll = MongoMeta.getCollection(this);
        let countPipeline = [];
        for (let i = 0; i < pipeline.length; i++) {
            let x = pipeline[i];
            if ('$sort' in x || '$skip' in x || '$limit' in x) {
                continue;
            }
            countPipeline.push(x);
        }
        countPipeline.push({ $count: 'count' });

        let $facet = <any> {
            $facet: {
                collection: pipeline,
                total: countPipeline
            }
        };
        return cb_toPromise(db_aggregate, coll, $facet, options).then(resArr => {
            let doc = resArr[0];
            return {
                collection: JsonConvert.fromJSON<TOut[]>(doc.collection, { Type: options?.Type }),
                total: doc.total[0]?.count ?? 0
            };
        });
    }

    static async count<T extends typeof MongoEntity>(query?: FilterQuery<T>) {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_count, coll, query, null);
    }
    static async upsert<T extends MongoEntity>(instance: T): Promise<T> {
        return EntityMethods.save(instance);
    }
    static async upsertBy<T extends MongoEntity>(finder: TFindQuery<T>, instance: T): Promise<T> {
        return EntityMethods.saveBy(finder, instance, this);
    }
    static async upsertMany<T extends MongoEntity>(arr: T[]): Promise<T[]> {
        return EntityMethods.saveMany(arr);
    }
    static async upsertManyBy<T extends MongoEntity>(finder: TFindQuery<T>, arr: T[]): Promise<T[]> {
        return EntityMethods.upsertManyBy(finder, arr);
    }
    static async del<T extends MongoEntity>(entity: T): Promise<any> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.del(coll, entity);
    }
    static async delMany<T extends MongoEntity>(arr: T[]): Promise<any> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.delMany(coll, arr);
    }

    static async patch<T extends MongoEntity>(
        instance: T
        , patch: Partial<T> | UpdateQuery<T>
    ): Promise<T> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, instance, patch);
    }
    static async patchDeeply<T extends MongoEntity>(
        instance: T
        , patch: Partial<T> | UpdateQuery<T>
    ): Promise<T> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, instance, patch, { deep: true });
    }

    static async patchMany<T extends MongoEntity>(this: Constructor<T>, arr: [MongoLib.FilterQuery<T>, DeepPartial<T> | UpdateQuery<T>][]): Promise<void> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchMany(coll, arr);
    }

    /**
     * Find document by filter query, and patch it.
     */
    static async patchDeeplyBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.FilterQuery<T>
        , patch: DeepPartial<T>
    ): Promise<MongoLib.WriteOpResult> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchBy(coll, finder, patch, { deep: true });
    }
    static async patchBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.FilterQuery<T>
        , patch: Partial<T> | UpdateQuery<T>
    ): Promise<MongoLib.WriteOpResult> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchBy(coll, finder, patch);
    }

    static async patchMultipleBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.FilterQuery<T>
        , patch: DeepPartial<T> | UpdateQuery<T>
    ): Promise<MongoLib.WriteOpResult> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchMultipleBy(coll, finder, patch);
    }
    static async patchMultipleDeeplyBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.FilterQuery<T>
        , patch: DeepPartial<T> | UpdateQuery<T>
    ): Promise<MongoLib.WriteOpResult> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchMultipleBy(coll, finder, patch, { deep: true });
    }

    static async getCollection(): Promise<Collection> {
        let coll = MongoMeta.getCollection(this);
        return cb_toPromise(db_getCollection, coll);
    }
    static async getDb(server?: string): Promise<Db> {
        return cb_toPromise(db_getDb, server);
    }
    upsert(): Promise<this> {
        return EntityMethods.save(this);
    }
    del() {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.del(coll, this);
    }

    patch<T extends MongoEntity>(
        this: T
        , patch: UpdateQuery<T> | DeepPartial<T>
        , opts: { deep: true}
    ): Promise<T>
    patch<T extends MongoEntity>(
        this: T
        , patch: UpdateQuery<T> | Partial<T>
        , opts?: { deep?: boolean}
    ): Promise<T> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, this, patch, /*isDeep*/opts);
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
        let json = JsonConvert.toJSON(x, { Type: x.constructor as any })
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
    export async function saveBy<T extends MongoEntity>(finder: TFindQuery<T>, x: Partial<T>, Type?): Promise<T> {
        Type = Type ?? x.constructor;
        let coll = MongoMeta.getCollection(Type);
        if (coll == null) {
            return Promise.reject(new Error(`<class:patch> 'Collection' is not defined for ${Type.name}`));
        }

        let result: MongoLib.UpdateWriteOpResult = await cb_toPromise(
            db_upsertSingleBy,
            coll,
            <any> finder,
            <any> x
        );
        if (result.upsertedId?._id && x._id == null) {
            (x as any)._id = result.upsertedId._id;
        }
        return x as any;
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
            let json = JsonConvert.toJSON(x, { Type: Type as any })
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

    export async function upsertManyBy<T extends MongoEntity>(finder: TFindQuery<T>, arr: T[]): Promise<T[]> {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }
        let Type = arr[0].constructor;
        let coll = MongoMeta.getCollection(Type);
        if (coll == null) {
            return Promise.reject(new Error(`<class:patch> 'Collection' is not defined for ${Type.name}`));
        }

        let result: MongoLib.BulkWriteResult = await cb_toPromise(
            db_upsertManyBy,
            coll,
            <any> finder,
            arr
        );
        return arr;
    }

    export function patchBy<T extends MongoEntity>(
        coll: TDbCollection
        , finder: MongoLib.FilterQuery<T>
        , patch: DeepPartial<T> | Partial<T> | UpdateQuery<T>
        , opts?: { deep?: boolean }): Promise<MongoLib.WriteOpResult> {
        let update = obj_partialToUpdateQuery(patch, false, opts?.deep);
        return cb_toPromise(
            db_patchSingleBy,
            coll,
            finder,
            update
        );
    }
    export function patchMultipleBy<T extends MongoEntity>(
        coll: TDbCollection
        , finder: MongoLib.FilterQuery<T>
        , patch: DeepPartial<T> | UpdateQuery<T>
        , opts?: { deep?: boolean }
    ): Promise<MongoLib.WriteOpResult> {
        let update = obj_partialToUpdateQuery(patch, false, opts?.deep);
        return cb_toPromise(
            db_patchMultipleBy,
            coll,
            finder,
            update
        );
    }

    export function patch<T extends MongoEntity>(
        coll: TDbCollection
        , instance: T
        , patch: DeepPartial<T> | Partial<T> | UpdateQuery<T>
        , opts?: { deep?: boolean }
    ): Promise<T> {
        let id = instance._id;
        if (id == null) {
            return Promise.reject(new Error(`<patch> '_id' is not defined for ${coll}`));
        }
        let update = obj_partialToUpdateQuery(patch, false, opts?.deep);
        obj_patch(instance, update);
        return cb_toPromise(
            db_patchSingle,
            coll,
            id,
            update
        ).then(_ => instance);
    }
    export function patchMany<T extends MongoEntity>(
        coll: TDbCollection
        , arr: [MongoLib.FilterQuery<T>, DeepPartial<T> | UpdateQuery<T>][]
        , opts?: { deep?: boolean }
    ) {
        if (opts?.deep) {
            for (let i = 0; i < arr.length; i++) {
                arr[i][1] = obj_partialToUpdateQuery(arr[i][1], false, /* deep */ true);
            }
        }
        return cb_toPromise(
            db_patchMany,
            coll,
            arr
        );
    }

    export function del(coll: TDbCollection, entity: { _id: string | Object }) {
        if (coll == null) {
            return Promise.reject(new Error(`Delete for ${entity._id} failed as Collection is not set`));
        }
        if (entity._id == null) {
            return Promise.reject(new Error(`Delete in ${coll} failed as ID is undefined`));
        }
        return cb_toPromise(db_remove, coll, { _id: entity._id }, true).then(x => {
            return x.result;
        });
    }
    export function delMany(coll: TDbCollection, arr: { _id: string | Object }[]) {
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
