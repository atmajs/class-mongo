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
    db_patchMultipleBy,
    db_findManyPagedAsync,
    db_findManyAsync,
    db_removeAsync,
    db_insertSingleAsync,
    db_updateSingleAsync,
    db_findSingleAsync,
    db_aggregateAsync,
    db_patchManyAsync,
    db_countAsync,
    db_patchSingleAsync,
    db_patchMultipleByAsync,
    db_getCollectionAsync,
    db_getDbAsync,
    db_upsertSingleByAsync,
    db_insertManyAsync,
    db_updateManyAsync,
    db_upsertManyByAsync
} from './mongo/Driver';

import { MongoMeta } from './MongoMeta';
import * as MongoLib from 'mongodb';
import type { Filter, UpdateFilter, Collection, Db, InsertOneResult, ObjectId, UpdateResult, Document } from 'mongodb';

import { mixin, is_Array, class_Dfr } from 'atma-utils'
import { cb_toPromise, cb_createListener } from './mongo/utils';
import { obj_patch, obj_partialToUpdateFilter } from './utils/patchObject';
import { TFindQuery, IAggrPipeline } from './mongo/DriverTypes';
import { FindOptions, FindOptionsProjected, TProjection, TDeepPickByProjection } from './types/FindOptions';

import { ProjectionUtil } from './utils/projection';
import { DeepPartial } from './types/DeepPartial';
import { TDbCollection } from './types/TDbCollection';
import { bson_fromObject, bson_toEntity } from './utils/bson';
import { TFnWithCallbackArgs } from './types/Types';

// type PickProjection<T, K extends keyof T> = {
//     [P in K]:
//         T[P] extends (Array<infer TArr> | Date)
//         ? (T[P])
//         : (T[P] extends object ? PickProjection<T[P], keyof T[P]> : T[P])
// };

export class MongoEntity<T = any> extends Serializable<T> implements IEntity {

    _id: any

    /**
     * Equivalent to `findOne` method.
     * @param query [MongoDB fetch query](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)
     * @param options @see https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoptions.html
     * @returns
     */
    static async fetch<T extends typeof MongoEntity>(this: T
        , query: Filter<InstanceType<T>>
        , options?: FindOptions<InstanceType<T>> & MongoLib.FindOptions
    ): Promise<InstanceType<T>> {
        let coll = MongoMeta.getCollection(this);
        let dbJson = await db_findSingleAsync(coll, query, options);
        if (dbJson == null) {
            return null;
        }
        return bson_toEntity(dbJson, this);
        //return JsonConvert.fromJSON<InstanceType<T>>(json, { Type: this });
    }
    static async fetchPartial<
        T extends typeof MongoEntity,
        P extends TProjection<InstanceType<T>>
    >(this: T
        , query: Filter<InstanceType<T>>
        , options: (Omit<MongoLib.FindOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)
    ): Promise<TDeepPickByProjection<InstanceType<T>, P>> {
        return <any> this.fetch(query, ProjectionUtil.handleOpts(options));
    }

    static async fetchMany<T extends typeof MongoEntity>(this: T
        , query?: Filter<InstanceType<T>>
        , options?: FindOptions<InstanceType<T>> & MongoLib.FindOptions
    ): Promise<InstanceType<T>[]> {
        let meta = MongoMeta.getCollection(this);
        let arr = await db_findManyAsync(meta, query, options);
        if (arr == null) {
            return null;
        }
        return arr.map(dbJson => bson_toEntity(dbJson, this));
    }
    static async fetchManyPartial<
        T extends typeof MongoEntity,
        P extends TProjection<InstanceType<T>>
    >(this: T
        , query: Filter<InstanceType<T>>
        , options: (Omit<MongoLib.FindOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)
    ): Promise<TDeepPickByProjection<InstanceType<T>, P>[]> {
        return <any> this.fetchMany(query, <any> ProjectionUtil.handleOpts(options));
    }

    static async fetchManyPaged<T extends typeof MongoEntity>(this: T
        , query?: Filter<InstanceType<T>>
        , options?: FindOptions<InstanceType<T>> & MongoLib.FindOptions
    ): Promise<{ collection: InstanceType<T>[], total: number }> {

        let coll = MongoMeta.getCollection(this);
        let { collection, total } = await db_findManyPagedAsync(coll, query, options);
        if (collection != null) {
            collection = collection.map(dbJson => bson_toEntity(dbJson, this));
        }
        return {
            collection,
            total
        };
    }
    static async fetchManyPagedPartial<
        T extends typeof MongoEntity,
        P extends TProjection<InstanceType<T>>
    >(this: T
        , query: Filter<InstanceType<T>>
        , options: (Omit<MongoLib.FindOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)
    ): Promise<{ collection: TDeepPickByProjection<InstanceType<T>, P>[], total: number }> {
        return <any> this.fetchManyPaged(query, <any> ProjectionUtil.handleOpts(options));
    }

    static async aggregateMany<TOut = any, T extends typeof MongoEntity = any>(
        this: T
        , pipeline?: IAggrPipeline[]
        , options?: { Type?: Constructor<TOut> } & MongoLib.AggregateOptions
    ): Promise<TOut[]> {
        let coll = MongoMeta.getCollection(this);
        let arr = await db_aggregateAsync(coll, pipeline, options);
        return arr?.map(dbJson => bson_toEntity(dbJson, options?.Type ?? this));
    }
    static async aggregateManyPaged<TOut = any, T extends typeof MongoEntity = any>(this: T
        , pipeline?: IAggrPipeline[]
        , options?: { Type?: Constructor<TOut> } & MongoLib.AggregateOptions
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

        let $facet = [{
            $facet: {
                collection: pipeline,
                total: countPipeline
            }
        }];
        let resArr = await db_aggregateAsync(coll, $facet, options);
        let doc = resArr[0];
        let arr = doc.collection;
        if (arr != null) {
            arr = arr.map(dbJson => bson_toEntity(dbJson, options?.Type  ?? this));
        }
        return {
            collection: arr, //JsonConvert.fromJSON<TOut[]>(doc.collection, { Type: options?.Type }),
            total: doc.total[0]?.count ?? 0
        };
    }

    static async count<T extends typeof MongoEntity>(query?: Filter<T>) {
        let coll = MongoMeta.getCollection(this);
        return db_countAsync(coll, query);
    }
    static async upsert<T extends MongoEntity>(instance: T): Promise<T> {
        return EntityMethods.save(instance);
    }
    static async upsertBy<T extends MongoEntity>(finder: TFindQuery<T>, instance: T): Promise<T> {
        return EntityMethods.saveBy(finder, instance, this);
    }
    static async upsertMany<T extends MongoEntity>(arr: T[]): Promise<T[]> {
        return EntityMethods.saveMany(arr, this);
    }
    static async upsertManyBy<T extends MongoEntity>(finder: TFindQuery<T>, arr: T[]): Promise<T[]> {
        return EntityMethods.upsertManyBy(finder, arr, this);
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
        , patch: Partial<T> | UpdateFilter<T>
    ): Promise<T> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, instance, patch);
    }
    static async patchDeeply<T extends MongoEntity>(
        instance: T
        , patch: Partial<T> | UpdateFilter<T>
    ): Promise<T> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, instance, patch, { deep: true });
    }

    static async patchMany<T extends MongoEntity>(
        this: Constructor<T>
        , arr: [MongoLib.Filter<T>, DeepPartial<T> | UpdateFilter<T>][]
    ) {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchMany(coll, arr);
    }

    /**
     * Find document by filter query, and patch it.
     */
    static async patchDeeplyBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.Filter<T>
        , patch: DeepPartial<T>
    ): Promise<MongoLib.UpdateResult> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchBy(coll, finder, patch, { deep: true });
    }
    static async patchBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.Filter<T>
        , patch: Partial<T> | UpdateFilter<T>
    ): Promise<MongoLib.UpdateResult> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchBy(coll, finder, patch);
    }

    static async patchMultipleBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.Filter<T>
        , patch: DeepPartial<T> | UpdateFilter<T>
    ): Promise<UpdateResult | Document> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchMultipleBy(coll, finder, patch);
    }
    static async patchMultipleDeeplyBy<T extends MongoEntity>(
        this: Constructor<T>
        , finder: MongoLib.Filter<T>
        , patch: DeepPartial<T> | UpdateFilter<T>
    ): Promise<UpdateResult | Document> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patchMultipleBy(coll, finder, patch, { deep: true });
    }

    static async getCollection(): Promise<Collection> {
        let coll = MongoMeta.getCollection(this);
        return db_getCollectionAsync(coll);
    }
    static async getDb(server?: string): Promise<Db> {
        return db_getDbAsync(server);
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
        , patch: UpdateFilter<T> | DeepPartial<T>
        , opts: { deep: true}
    ): Promise<T>
    patch<T extends MongoEntity>(
        this: T
        , patch: UpdateFilter<T> | Partial<T>
        , opts?: { deep?: boolean}
    ): Promise<T> {
        let coll = MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, this, patch, /*isDeep*/opts);
    }
}

export interface IEntity {
    _id: any
}

export type Constructor<T = {}> = {
    new(...args: any[]): T;
};

export function MongoEntityFor<T>(Base: Constructor<T>) {
    return mixin(Base, MongoEntity);
}

namespace EntityMethods {
    export async function save<T extends MongoEntity>(x: T): Promise<T> {
        let coll = MongoMeta.getCollection(x);
        let json = bson_fromObject(x)
        if (json._id == null) {
            let inserted = await db_insertSingleAsync(coll, json);
            json._id = x._id = inserted.insertedId;
            return x;
        }
        let updated = await db_updateSingleAsync(coll, json);
        return x;
    }
    export async function saveBy<T extends MongoEntity>(finder: TFindQuery<T>, x: T, Type?): Promise<T> {
        Type = Type ?? x.constructor;
        let coll = MongoMeta.getCollection(Type);
        if (coll == null) {
            return Promise.reject(new Error(`<class:patch> 'Collection' is not defined for ${Type.name}`));
        }
        let json = bson_fromObject(x, Type);
        let result: MongoLib.UpdateResult = await db_upsertSingleByAsync(
            coll,
            finder,
            json
        );
        if ((result.upsertedId as any)?._id && x._id == null) {
            (x as any)._id = (result.upsertedId as any)._id;
        }
        return x as any;
    }

    export async function saveMany<T extends MongoEntity>(arr: T[], Type?): Promise<T[]> {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }

        Type = Type ?? arr[0].constructor;
        let coll = MongoMeta.getCollection(Type);

        let insert = [];
        let insertIndexes = [];
        let update = [];

        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            let json = bson_fromObject(x, Type);
            if (x._id == null) {
                insert.push(json);
                insertIndexes.push(i);
                continue;
            }
            update.push(json);
        }

        let [
            insertResult,
            updateResult
        ] = await Promise.all([
            insert.length > 0 ? db_insertManyAsync(coll, insert) : null,
            update.length > 0 ? db_updateManyAsync(coll, update) : null,
        ]);
        if (insertResult != null) {
            let ops = insertResult.insertedIds
            if (ops == null) {
                throw new Error('<mongo:bulk insert> array expected');
            }
            /**
            *   @TODO make sure if mongodb returns an array of inserted documents
            *   in the same order as it was passed to the insert method
            */
            for (var i = 0; i < insertIndexes.length; i++) {
                let index = insertIndexes[i];
                let id = ops[i];
                if (id == null) {
                    console.log('Invalid key on insert', i, ops);
                    throw new Error(`Invalid key`);
                }
                arr[index]._id = id;
            }
        }

        return arr;

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
                    *   in the same order as it was passed to the insert method
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

    export async function upsertManyBy<T extends MongoEntity>(finder: TFindQuery<T>, arr: T[], Type?): Promise<T[]> {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }
        Type = Type ?? arr[0].constructor;
        let coll = MongoMeta.getCollection(Type);
        let jsons = arr.map(x => bson_fromObject(x, Type));
        let result: MongoLib.BulkWriteResult = await db_upsertManyByAsync(
            coll,
            finder,
            jsons
        );
        let upserted = result.getUpsertedIds();
        for (let i = 0; i < upserted.length; i++) {
            let { index, _id } = upserted[i];
            let x: any = arr[index];
            if (x._id == null) {
                x._id = _id;
            } else if (String(x._id) !== String(upserted[i])) {
                throw new Error(`Unexpected missmatch: ${x._id} != ${upserted[i]}`);
            }
        }
        return arr;
    }

    export function patchBy<T extends MongoEntity>(
        coll: TDbCollection
        , finder: MongoLib.Filter<T>
        , patch: DeepPartial<T> | Partial<T> | UpdateFilter<T>
        , opts?: { deep?: boolean }): Promise<MongoLib.UpdateResult> {
        let update = obj_partialToUpdateFilter(patch, false, opts?.deep, coll);
        return cb_toPromise(
            db_patchSingleBy,
            coll,
            finder,
            update
        );
    }
    export function patchMultipleBy<T extends MongoEntity>(
        coll: TDbCollection
        , finder: MongoLib.Filter<T>
        , patch: DeepPartial<T> | UpdateFilter<T>
        , opts?: { deep?: boolean }
    ): Promise<UpdateResult | Document> {
        let update = obj_partialToUpdateFilter(patch, false, opts?.deep, coll);
        return db_patchMultipleByAsync(
            coll,
            finder,
            update
        );
    }

    export async function patch<T extends MongoEntity>(
        coll: TDbCollection
        , instance: T
        , patch: DeepPartial<T> | Partial<T> | UpdateFilter<T>
        , opts?: { deep?: boolean }
    ): Promise<T> {
        let id = instance._id;
        if (id == null) {
            return Promise.reject(new Error(`<patch> '_id' is not defined for ${coll}`));
        }
        let update = obj_partialToUpdateFilter(patch, false, opts?.deep, coll);
        obj_patch(instance, update);

        let result = await db_patchSingleAsync(
            coll,
            id,
            update
        );
        return instance;
    }
    export function patchMany<T extends MongoEntity>(
        coll: TDbCollection
        , arr: [MongoLib.Filter<T>, DeepPartial<T> | UpdateFilter<T>][]
        , opts?: { deep?: boolean }
    ) {
        if (opts?.deep) {
            for (let i = 0; i < arr.length; i++) {
                arr[i][1] = obj_partialToUpdateFilter(arr[i][1], false, /* deep */ true, coll);
            }
        }
        return db_patchManyAsync(coll, arr);
    }

    // export function del(coll: TDbCollection, entity: { _id: string | Object }) {
    //     if (coll == null) {
    //         return Promise.reject(new Error(`Delete for ${entity._id} failed as Collection is not set`));
    //     }
    //     if (entity._id == null) {
    //         return Promise.reject(new Error(`Delete in ${coll} failed as ID is undefined`));
    //     }
    //     return cb_toPromise(db_remove, coll, { _id: entity._id }, true).then(x => {
    //         return x.result;
    //     });
    // }
    export function del (coll: TDbCollection, entity: { _id: string | Object }) {
        if (coll == null) {
            return Promise.reject(new Error(`Delete for ${entity._id} failed as Collection is not set`));
        }
        if (entity._id == null) {
            return Promise.reject(new Error(`Delete in ${coll} failed as ID is undefined`));
        }
        return db_removeAsync(coll, { _id: entity._id }, true);
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
        return db_removeAsync(coll, { _id: { $in: ids } }, false);
    }
}
