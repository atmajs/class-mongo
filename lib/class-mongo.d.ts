// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../atma-utils/mixin
//   ../class-json
//   ../mongodb
//   ../class-json/ModelInfo

declare module 'class-mongo' {
    export { MongoEntity } from 'class-mongo/MongoEntity';
    export { MongoIndexes } from 'class-mongo/MongoIndexes';
    export { MongoSettings } from 'class-mongo/mongo/Settings';
    export { MongoUtils } from 'class-mongo/MongoUtils';
    export { MongoMeta } from 'class-mongo/MongoMeta';
    export { MongoProfiler } from 'class-mongo/MongoProfiler';
    export { MongoBson } from 'class-mongo/MongoBson';
    export { table, index, dbType } from 'class-mongo/decos';
}

declare module 'class-mongo/MongoEntity' {
    import { Statics } from 'atma-utils/mixin'; 
     /// <reference types="atma-utils" />
    import { Serializable } from 'class-json';
    import * as MongoLib from 'mongodb';
    import type { Filter, UpdateFilter, Collection, Db, UpdateResult, Document } from 'mongodb';
    import { TFindQuery, IAggrPipeline } from 'class-mongo/mongo/DriverTypes';
    import { FindOptions, FindOptionsProjected, TProjection, TDeepPickByProjection } from 'class-mongo/types/FindOptions';
    import { DeepPartial } from 'class-mongo/types/DeepPartial';
    export class MongoEntity<T = any> extends Serializable<T> implements IEntity {
            _id: any;
            /**
                * Equivalent to `findOne` method.
                * @param query [MongoDB fetch query](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)
                * @param options @see https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoptions.html
                * @returns
                */
            static fetch<T extends typeof MongoEntity>(this: T, query: Filter<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & MongoLib.FindOptions): Promise<InstanceType<T>>;
            static fetchPartial<T extends typeof MongoEntity, P extends TProjection<InstanceType<T>>>(this: T, query: Filter<InstanceType<T>>, options: (Omit<MongoLib.FindOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)): Promise<TDeepPickByProjection<InstanceType<T>, P>>;
            static fetchMany<T extends typeof MongoEntity>(this: T, query?: Filter<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & MongoLib.FindOptions): Promise<InstanceType<T>[]>;
            static fetchManyPartial<T extends typeof MongoEntity, P extends TProjection<InstanceType<T>>>(this: T, query: Filter<InstanceType<T>>, options: (Omit<MongoLib.FindOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)): Promise<TDeepPickByProjection<InstanceType<T>, P>[]>;
            static fetchManyPaged<T extends typeof MongoEntity>(this: T, query?: Filter<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & MongoLib.FindOptions): Promise<{
                    collection: InstanceType<T>[];
                    total: number;
            }>;
            static fetchManyPagedPartial<T extends typeof MongoEntity, P extends TProjection<InstanceType<T>>>(this: T, query: Filter<InstanceType<T>>, options: (Omit<MongoLib.FindOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)): Promise<{
                    collection: TDeepPickByProjection<InstanceType<T>, P>[];
                    total: number;
            }>;
            static aggregateMany<TOut = any, T extends typeof MongoEntity = any>(this: T, pipeline?: IAggrPipeline[], options?: {
                    Type?: Constructor<TOut>;
            } & MongoLib.AggregateOptions): Promise<TOut[]>;
            static aggregateManyPaged<TOut = any, T extends typeof MongoEntity = any>(this: T, pipeline?: IAggrPipeline[], options?: {
                    Type?: Constructor<TOut>;
            } & MongoLib.AggregateOptions): Promise<{
                    collection: TOut[];
                    total: number;
            }>;
            static count<T extends typeof MongoEntity>(query?: Filter<T>): Promise<number>;
            static upsert<T extends MongoEntity>(instance: T): Promise<T>;
            static upsertBy<T extends MongoEntity>(finder: TFindQuery<T>, instance: T): Promise<T>;
            static upsertMany<T extends MongoEntity>(arr: T[]): Promise<T[]>;
            static upsertManyBy<T extends MongoEntity>(finder: TFindQuery<T>, arr: T[]): Promise<T[]>;
            static del<T extends MongoEntity>(entity: T): Promise<any>;
            static delMany<T extends MongoEntity>(arr: T[]): Promise<any>;
            static patch<T extends MongoEntity>(instance: T, patch: Partial<T> | UpdateFilter<T>): Promise<T>;
            static patchDeeply<T extends MongoEntity>(instance: T, patch: Partial<T> | UpdateFilter<T>): Promise<T>;
            static patchMany<T extends MongoEntity>(this: Constructor<T>, arr: [MongoLib.Filter<T>, DeepPartial<T> | UpdateFilter<T>][]): Promise<MongoLib.BulkWriteResult>;
            /**
                * Find document by filter query, and patch it.
                */
            static patchDeeplyBy<T extends MongoEntity>(this: Constructor<T>, finder: MongoLib.Filter<T>, patch: DeepPartial<T>): Promise<MongoLib.UpdateResult>;
            static patchBy<T extends MongoEntity>(this: Constructor<T>, finder: MongoLib.Filter<T>, patch: Partial<T> | UpdateFilter<T>): Promise<MongoLib.UpdateResult>;
            static patchMultipleBy<T extends MongoEntity>(this: Constructor<T>, finder: MongoLib.Filter<T>, patch: DeepPartial<T> | UpdateFilter<T>): Promise<UpdateResult | Document>;
            static patchMultipleDeeplyBy<T extends MongoEntity>(this: Constructor<T>, finder: MongoLib.Filter<T>, patch: DeepPartial<T> | UpdateFilter<T>): Promise<UpdateResult | Document>;
            static getCollection(): Promise<Collection>;
            static getDb(server?: string): Promise<Db>;
            upsert(): Promise<this>;
            del(): Promise<MongoLib.DeleteResult>;
            patch<T extends MongoEntity>(this: T, patch: UpdateFilter<T> | DeepPartial<T>, opts: {
                    deep: true;
            }): Promise<T>;
    }
    export interface IEntity {
            _id: any;
    }
    export type Constructor<T = {}> = {
            new (...args: any[]): T;
    };
    export function MongoEntityFor<T>(Base: Constructor<T>): Statics<Constructor<T>> & Statics<typeof MongoEntity> & (new (...args: any[]) => T & MongoEntity<unknown>);
}

declare module 'class-mongo/MongoIndexes' {
    export namespace MongoIndexes {
        function ensureAll(): Promise<unknown>;
    }
}

declare module 'class-mongo/mongo/Settings' {
    export interface IMongoSettings {
        name?: string;
        default?: boolean;
        db: string;
        ip?: string;
        port?: number;
        connection?: string;
        params?: any;
    }
    export namespace MongoSettings {
        function define(setts: IMongoSettings | IMongoSettings[]): void;
    }
    export function setts_define(setts: IMongoSettings | IMongoSettings[]): void;
    export function setts_getConnectionString(server?: string): string;
    export function setts_getParams(server?: string): any;
    export function setts_getDbName(server?: string): string;
}

declare module 'class-mongo/MongoUtils' {
    export namespace MongoUtils {
        function toObjectID(id: string): any;
    }
}

declare module 'class-mongo/MongoMeta' {
    import { ModelInfo } from 'class-json/ModelInfo'; 
     /// <reference types="class-json" />
    import { IndexRaw } from 'class-mongo/mongo/Driver';
    import { TDbCollection } from 'class-mongo/types/TDbCollection';
    export interface IMongoMeta {
            collection: string;
            server?: string;
            indexes?: IndexRaw[];
            types?: IMongoProperty[];
    }
    export interface IMongoProperty {
            /** supports also nesting like "foo.bar.qux" */
            property: string;
            TypeMongo: Function;
            TypeJS: Function;
    }
    export namespace MongoMeta {
            function pickModelMeta(mix: Function | Object): ModelInfo<any> & IMongoMeta;
            function resolveModelMeta(mix: Function | Object): ModelInfo<any> & IMongoMeta;
            function getCollection(mix: Function | Object): TDbCollection;
    }
}

declare module 'class-mongo/MongoProfiler' {
    import { IQueryInfo } from 'class-mongo/mongo/DriverProfiler'; 
     export declare namespace MongoProfiler {
            function toggle(enabled?: boolean, settings?: any): void;
            function getData(): {
                    count: number;
                    slow: IQueryInfo[];
                    errors: Error[];
            };
    }
}

declare module 'class-mongo/MongoBson' {
    export namespace MongoBson {
        /**
          * Traverse the object and convert any unsupported type to a mongodb capable type.
          * It also use `class-json` to serialize an object.
          * For example, `bigint` to
          *
          * - `Decimal128` in case '> MAX_SAFE_INTEGER'
          * - `number` in case '< MAX_SAFE_INTEGER'
          * - `string` any other case
          *
          * @param mix Object to walk through
          * @param Type Optionaly the Type Declaration, it could contain Meta data for json serialization.
          * @returns
          */
        function fromObject(mix: any, Type?: any): any;
        function toObject<T = any>(bson: any, Type?: new (...args: any[]) => T): T;
    }
}

declare module 'class-mongo/decos' {
    import { IndexOptions, IndexRaw } from 'class-mongo/mongo/Driver';
    import { ITableSettings } from 'class-mongo/types/ITableSettings';
    import { TMongoType } from 'class-mongo/types/Types';
    export function table(name: string, options?: ITableSettings): (target: any) => any;
    export function index(index: IndexRaw): any;
    export function index(opts?: IndexOptions): any;
    export function index(name: string, opts?: IndexOptions): any;
    export function index(name: string, type: string | number, opts?: IndexOptions): any;
    /**
      * @param Ctor
      * @param propertyOverriden Supports also nesting path like `foo.bar.qux`;
      * @returns
      */
    export function dbType(CtorMix: TMongoType, mix: Function | {
        property?: string;
        Type: Function;
    }): (target: any, propertyKey?: any, descriptor?: any) => void;
}

declare module 'class-mongo/mongo/DriverTypes' {
    import type * as MongoLib from 'mongodb';
    /**
      * copy($($0).find('td:first-child').map((i, el) => `${el.textContent}?: any`).toArray().join('\n'))
      */
    export type TFindQuery<T = any> = (keyof T) | Partial<T> | MongoLib.Filter<T> | ((x: Partial<T>) => MongoLib.Filter<T>);
    export type TKeySelector = number | string;
    export interface IAggrArithmeticExp {
        $abs?: TAggrExpression;
        $add?: TAggrExpression[];
        $ceil?: TAggrExpression;
        $divide?: [TAggrExpression, TAggrExpression];
        $exp?: TAggrExpression;
        $floor?: TAggrExpression;
        $ln?: TAggrExpression;
        $log?: TAggrExpression;
        $log10?: TAggrExpression;
        $mod?: [TAggrExpression, TAggrExpression];
        $multiply?: TAggrExpression[];
        $pow?: [TAggrExpression, TAggrExpression];
        $round?: [TAggrExpression, number?];
        $sqrt?: TAggrExpression;
        $subtract?: [TAggrExpression, TAggrExpression];
        $trunc?: [TAggrExpression, number?];
    }
    export interface IAggrArrayExp {
        $arrayElemAt?: [TAggrExpression<any[]>, TAggrExpression<number>];
        $arrayToObject?: TKeySelector | any;
        $concatArrays?: TAggrExpression<any[]>[];
        $filter?: {
            input: TAggrExpression<any[]>;
            as?: string;
            cond: TAggrExpression<boolean>;
        };
        $in?: [TAggrExpression<any>, TAggrExpression<any[]>];
        /** [ <array expression>, <search expression>, <start>, <end> ]  */
        $indexOfArray?: [TAggrExpression<any[]>, TAggrExpression<string>, TAggrExpression<number>?, TAggrExpression<number>?];
        $isArray?: [TAggrExpression<any[]>];
        $map?: {
            input: TAggrExpression<any[]>;
            /** name for the variable for `in` */
            as?: string;
            /**  is applied to each element of the input array */
            in: TAggrExpression<any>;
        };
        $objectToArray?: any;
        /** [ <start>, <end>, <non-zero step> ] */
        $range?: [TAggrExpression<number>, TAggrExpression<number>, number?];
        $reduce?: {
            input: TAggrExpression<any[]>;
            initialValue: TAggrExpression<any>;
            /** has vars in ctx: "$$value", "$$this" */
            in: TAggrExpression<any>;
        };
        $reverseArray?: TAggrExpression<any[]>;
        $size?: TAggrExpression<any[]>;
        /** [ <array>, <n> ] */
        $slice?: [TAggrExpression<any[]>, number, number?];
        $zip?: {
            inputs: TAggrExpression<any[]>[];
            useLongestLength?: boolean;
            defaults?: TAggrExpression<any[]>;
        };
    }
    export interface IAggrBoolean {
        $and?: TAggrExpression<boolean>[];
        $not?: TAggrExpression<boolean>;
        $or?: TAggrExpression<boolean>[];
    }
    export interface IAggrComparison {
        $cmp?: [TAggrExpression<number>, TAggrExpression<number>];
        $eq?: [TAggrExpression<any>, TAggrExpression<any>];
        $gt?: [TAggrExpression<any>, TAggrExpression<any>];
        $gte?: [TAggrExpression<any>, TAggrExpression<any>];
        $lt?: [TAggrExpression<any>, TAggrExpression<any>];
        $lte?: [TAggrExpression<any>, TAggrExpression<any>];
        $ne?: [TAggrExpression<any>, TAggrExpression<any>];
    }
    export interface IAggrCondition {
        $cond?: {
            if: TAggrExpression<boolean>;
            then: TAggrExpression<any>;
            else: TAggrExpression<any>;
        } | [TAggrExpression<boolean>, TAggrExpression<any>, TAggrExpression<any>];
        $ifNull?: [TAggrExpression<any>, TAggrExpression<any>];
        $switch?: {
            branches: {
                case: TAggrExpression<boolean>;
                then: TAggrExpression<any>;
            }[];
            default?: TAggrExpression<any>;
        };
    }
    export interface IAggrDate {
        $dateFromParts?: any;
        $dateFromString?: any;
        $dateToParts?: any;
        $dateToString?: any;
        $dayOfMonth?: any;
        $dayOfWeek?: any;
        $dayOfYear?: any;
        $hour?: any;
        $isoDayOfWeek?: any;
        $isoWeek?: any;
        $isoWeekYear?: any;
        $millisecond?: any;
        $minute?: any;
        $month?: any;
        $second?: any;
        $toDate?: any;
        $week?: any;
        $year?: any;
    }
    export interface IAggrLiteral {
        $literal?: any;
    }
    export interface IAggrSetExpr {
        $allElementsTrue?: any;
        $anyElementTrue?: any;
        $setDifference?: any;
        $setEquals?: any;
        $setIntersection?: any;
        $setIsSubset?: any;
        $setUnion?: any;
    }
    export interface IAggrString {
        $concat?: any;
        $dateFromString?: any;
        $dateToString?: any;
        $indexOfBytes?: any;
        $indexOfCP?: any;
        $ltrim?: any;
        $regexFind?: any;
        $regexFindAll?: any;
        $regexMatch?: any;
        $rtrim?: any;
        $split?: any;
        $strLenBytes?: any;
        $strLenCP?: any;
        $strcasecmp?: any;
        $substr?: any;
        $substrBytes?: any;
        $substrCP?: any;
        $toLower?: any;
        $toString?: any;
        $trim?: any;
        $toUpper?: any;
    }
    export interface IAggrTrigonometry {
        $sin?: any;
        $cos?: any;
        $tan?: any;
        $asin?: any;
        $acos?: any;
        $atan?: any;
        $atan2?: any;
        $asinh?: any;
        $acosh?: any;
        $atanh?: any;
        $degreesToRadians?: any;
        $radiansToDegrees?: any;
    }
    export interface IAggrType {
        $convert?: any;
        $toBool?: any;
        $toDate?: any;
        $toDecimal?: any;
        $toDouble?: any;
        $toInt?: any;
        $toLong?: any;
        $toObjectId?: any;
        $toString?: any;
        $type?: any;
    }
    export interface IAggrAccum {
        $addToSet?: any;
        $avg?: any;
        $first?: any;
        $last?: any;
        $max?: any;
        $mergeObjects?: any;
        $min?: any;
        $push?: any;
        $stdDevPop?: any;
        $stdDevSamp?: any;
        $sum?: any;
    }
    export interface IAggrExpression<T = any> extends IAggrArithmeticExp, IAggrArrayExp, IAggrBoolean, IAggrComparison, IAggrCondition, IAggrDate, IAggrLiteral, IAggrSetExpr, IAggrString, IAggrTrigonometry {
    }
    export type TAggrExpression<T = any> = TKeySelector | IAggrExpression<T>;
    export interface IAggrPipeline<T = any> {
        $addFields?: {
            [newKey: string]: TAggrExpression;
        };
        $bucket?: any;
        $bucketAuto?: any;
        $collStats?: any;
        $count?: string;
        $facet?: any;
        $geoNear?: {
            near?: any;
            distanceField?: string;
            spherical?: boolean;
            maxDistance?: number;
            query?: any;
            distanceMultiplier?: any;
            includeLocs?: any;
            uniqueDocs?: any;
            minDistance?: any;
            key?: any;
        };
        $graphLookup?: any;
        $group?: {
            _id: TAggrExpression | any;
            [key: string]: {
                $addToSet?: TAggrExpression;
                $avg?: TAggrExpression;
                $first?: TAggrExpression;
                $last?: TAggrExpression;
                $max?: TAggrExpression;
                $mergeObjects?: TAggrExpression;
                $min?: TAggrExpression;
                $push?: TAggrExpression;
                $stdDevPop?: TAggrExpression;
                $stdDevSamp?: TAggrExpression;
                $sum?: TAggrExpression;
            };
        };
        $indexStats?: any;
        $limit?: any;
        $listSessions?: any;
        $lookup?: any;
        $match?: Partial<T> | MongoLib.Document;
        $merge?: any;
        $out?: any;
        $planCacheStats?: any;
        $project?: any;
        $redact?: any;
        $replaceRoot?: any;
        $replaceWith?: any;
        $sample?: any;
        $set?: any;
        $skip?: any;
        $sort?: any;
        $sortByCount?: any;
        $unset?: any;
        $unwind?: any;
    }
}

declare module 'class-mongo/types/FindOptions' {
    /** Raw MongoDB Projected*/
    export interface FindOptions<T> {
        projection?: {
            [key in keyof T]?: number | string;
        };
    }
    /** Extended Projection: supports nested properties and type safety */
    export interface FindOptionsProjected<T extends object, P extends TProjection<T>> {
        projection?: P;
    }
    export type TProjection<T extends object> = {
        [K in keyof T]?: T[K] extends Array<infer TArr> ? (TArr extends object ? (TProjection<TArr> | number) : number) : (T[K] extends object ? (TProjection<T[K]> | number) : number);
    };
    export type TDeepPickByProjection<T extends object, P extends TProjection<T>> = {
        [K in Extract<keyof T, keyof P>]: (P[K] extends number ? (T[K]) : (T[K] extends Array<infer TArr> ? (TArr extends object ? TDeepPickByProjection<TArr, P[K]> : never)[] : (T[K] extends object ? TDeepPickByProjection<T[K], P[K]> : never)));
    } extends infer O ? {
        [K in keyof O]: O[K];
    } : never;
}

declare module 'class-mongo/types/DeepPartial' {
    export type DeepPartial<T> = {
        [key in keyof T]?: T[key] extends object ? DeepPartial<T[key]> : T[key];
    };
}

declare module 'class-mongo/mongo/Driver' {
    import { ICallback } from 'class-mongo/ICallback';
    import * as MongoLib from 'mongodb';
    import { TFindQuery, IAggrPipeline } from 'class-mongo/mongo/DriverTypes';
    import { FindOptions } from 'class-mongo/types/FindOptions';
    import { TDbCollection } from 'class-mongo/types/TDbCollection';
    import { IEntity } from 'class-mongo/MongoEntity';
    import type { Callback, UpdateResult, Document } from 'mongodb';
    export type IndexSpecification<T> = string | string[] | Record<keyof T, number>;
    export interface IndexOptions {
        unique?: boolean;
        sparse?: boolean;
        [key: string]: any;
    }
    export interface IndexRaw {
        key: {
            [property: string]: string | number;
        };
        name?: string;
        unique?: boolean;
        sparse?: boolean;
        [key: string]: any;
    }
    export { core_profiler_getData as db_profiler_getData } from 'class-mongo/mongo/DriverProfiler';
    export { core_profiler_toggle as db_profiler_toggle } from 'class-mongo/mongo/DriverProfiler';
    export function db_getCollection(meta: TDbCollection, cb: ICallback<MongoLib.Collection>): void;
    export function db_getCollectionAsync(meta: TDbCollection): Promise<MongoLib.Collection>;
    export function db_getDb(server: string, callback: ICallback<MongoLib.Db>): void;
    export function db_getDbAsync(server?: string): Promise<MongoLib.Db>;
    export function db_findSingle<T extends IEntity = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: FindOptions<T> & MongoLib.FindOptions, callback: ICallback<T>): void;
    export function db_findSingleAsync<T extends IEntity = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: FindOptions<T> & MongoLib.FindOptions): Promise<MongoLib.WithId<MongoLib.Document>>;
    export function db_findMany<T extends IEntity = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: MongoLib.FindOptions, callback: ICallback<T[]>): void;
    export function db_findManyAsync<T extends IEntity = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: MongoLib.FindOptions): Promise<T[]>;
    export function db_findManyPaged<T extends IEntity = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: FindOptions<T> & MongoLib.FindOptions, callback: Callback<{
        collection: T[];
        total: number;
    }>): void;
    export function db_findManyPagedAsync<T extends IEntity = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: FindOptions<T> & MongoLib.FindOptions): Promise<{
        collection: T[];
        total: number;
    }>;
    export function db_aggregate<T = any>(meta: TDbCollection, pipeline: IAggrPipeline[], options: MongoLib.AggregateOptions, callback: Callback<T[]>): void;
    export function db_aggregateAsync<T = any>(meta: TDbCollection, pipeline: IAggrPipeline[], options: MongoLib.AggregateOptions): Promise<MongoLib.Document[]>;
    export function db_count<T = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options: MongoLib.CountDocumentsOptions, callback: ICallback<number>): void;
    export function db_countAsync<T = any>(meta: TDbCollection, query: MongoLib.Filter<T>, options?: MongoLib.CountDocumentsOptions): Promise<number>;
    export function db_insert(meta: TDbCollection, data: any, callback: any): void;
    export function db_insertSingle(meta: TDbCollection, data: any, callback: any): void;
    export function db_insertSingleAsync(meta: TDbCollection, data: any): Promise<MongoLib.InsertOneResult<MongoLib.Document>>;
    export function db_insertMany(meta: TDbCollection, data: any, callback: any): void;
    export function db_insertManyAsync(meta: TDbCollection, data: any): Promise<MongoLib.InsertManyResult<MongoLib.Document>>;
    export function db_updateSingle<T extends {
        _id: any;
    }>(meta: TDbCollection, data: T, callback: any): void;
    export function db_updateSingleAsync<T extends {
        _id: any;
    }>(meta: TDbCollection, data: T): Promise<MongoLib.UpdateResult>;
    export function db_updateMany<T extends {
        _id: any;
    }>(meta: TDbCollection, array: T[], callback: any): void;
    export function db_updateManyAsync<T extends {
        _id: any;
    }>(meta: TDbCollection, array: T[]): Promise<MongoLib.BulkWriteResult>;
    export function db_updateManyBy<T extends {
        _id: any;
    }>(meta: TDbCollection, finder: TFindQuery<T>, array: T[], callback: any): void;
    export function db_upsertManyBy<T extends {
        _id: any;
    }>(meta: TDbCollection, finder: TFindQuery<T>, array: T[], callback: any): void;
    export function db_upsertManyByAsync<T extends {
        _id: any;
    }>(meta: TDbCollection, finder: TFindQuery<T>, array: T[]): Promise<MongoLib.BulkWriteResult>;
    export function db_upsertSingleBy<T extends {
        _id: any;
    }>(meta: TDbCollection, finder: TFindQuery<T>, x: T, callback: any): void;
    export function db_upsertSingleByAsync<T extends {
        _id: any;
    }>(meta: TDbCollection, finder: TFindQuery<T>, x: T): Promise<MongoLib.UpdateResult>;
    export function db_patchSingle<T extends IEntity>(meta: TDbCollection, id: any, patch: MongoLib.UpdateFilter<T>, callback: any): void;
    export function db_patchSingleAsync<T extends IEntity>(meta: TDbCollection, id: any, patch: MongoLib.UpdateFilter<T>): Promise<MongoLib.UpdateResult>;
    export function db_patchSingleBy<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>, callback: any): void;
    export function db_patchSingleByAsync<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>): Promise<MongoLib.UpdateResult>;
    export function db_patchMultipleBy<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>, callback: any): void;
    export function db_patchMultipleByAsync<T extends IEntity>(meta: TDbCollection, query: MongoLib.Filter<T>, patch: MongoLib.UpdateFilter<T>): Promise<UpdateResult | Document>;
    export function db_patchMany<T extends IEntity>(meta: TDbCollection, arr: [MongoLib.Filter<T>, Partial<T> | MongoLib.UpdateFilter<T>][], callback: any): void;
    export function db_patchManyAsync<T extends IEntity>(meta: TDbCollection, arr: [MongoLib.Filter<T>, Partial<T> | MongoLib.UpdateFilter<T>][]): Promise<MongoLib.BulkWriteResult>;
    export function db_remove(meta: TDbCollection, query: any, isSingle: any, callback: any): void;
    export function db_removeAsync(meta: TDbCollection, query: any, isSingle: any): Promise<MongoLib.DeleteResult>;
    export function db_ensureIndexes(meta: TDbCollection, indexes: IndexRaw[], callback: any): void;
    export function db_getMongo(): typeof MongoLib;
}

declare module 'class-mongo/types/TDbCollection' {
    import { IMongoMeta } from 'class-mongo/MongoMeta';
    export type TDbCollection = IMongoMeta;
}

declare module 'class-mongo/mongo/DriverProfiler' {
    export interface IQueryInfo {
        coll: string;
        query: any;
        plan: any;
        params: any;
    }
    export interface IProfilerSettings {
        slow?: number;
        onDetect?: (info: IQueryInfo) => void;
        detector?: (plan: any, coll: any, query: any) => boolean;
    }
    export function core_profiler_getData(): {
        count: number;
        slow: IQueryInfo[];
        errors: Error[];
    };
    export function core_profiler_toggle(enable: any, settings: any): void;
}

declare module 'class-mongo/types/ITableSettings' {
    import type { CreateCollectionOptions } from 'mongodb';
    export interface ITableSettings {
        /** Server name, when not set, `default` is used */
        server?: string;
        collection?: CreateCollectionOptions;
    }
}

declare module 'class-mongo/types/Types' {
    import * as MongoLib from 'mongodb';
    export namespace Types {
        function Decimal128(val: number | bigint | string | MongoLib.Decimal128): MongoLib.Decimal128;
        const Mapping: {
            decimal: typeof Decimal128;
        };
    }
    export type TMongoType = typeof Types.Decimal128 | 'decimal';
    export type TCallback<TResult> = (error: any, result: TResult) => void;
    export type TFnWithCallback<TArgs extends any[], TResult> = (...args: [...TArgs, TCallback<TResult>]) => void;
    export type TFnWithCallbackArgs<T> = T extends TFnWithCallback<infer TArgs, any> ? TArgs : never;
    export type THead<T extends any[]> = T extends [...infer Head, any] ? Head : any[];
    export type TLast<T extends any[]> = T extends [...any[], infer Last] ? Last : never;
}

declare module 'class-mongo/ICallback' {
    export interface ICallback<T> {
        (error: Error | string, result?: T): void;
    }
}

