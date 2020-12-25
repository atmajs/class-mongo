// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../atma-utils
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
    export { table, index } from 'class-mongo/decos';
}

declare module 'class-mongo/MongoEntity' {
    import { Statics } from 'atma-utils'; 
     import { Serializable } from 'class-json';
    import { FilterQuery, UpdateQuery, Collection, Db, FindOneOptions } from 'mongodb';
    import { TFindQuery, IAggrPipeline } from 'class-mongo/mongo/DriverTypes';
    import { FindOptions, FindOptionsProjected, TProjection, TDeepPickByProjection } from 'class-mongo/types/FindOptions';
    import MongoLib = require('mongodb');
    export class MongoEntity<T = any> extends Serializable<T> {
            _id: string;
            static fetch<T extends typeof MongoEntity>(this: T, query: FilterQuery<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & FindOneOptions): Promise<InstanceType<T>>;
            static fetchPartial<T extends typeof MongoEntity, P extends TProjection<InstanceType<T>>>(this: T, query: FilterQuery<InstanceType<T>>, options: (Omit<FindOneOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)): Promise<TDeepPickByProjection<InstanceType<T>, P>>;
            static fetchMany<T extends typeof MongoEntity>(this: T, query?: FilterQuery<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & FindOneOptions): Promise<InstanceType<T>[]>;
            static fetchManyPartial<T extends typeof MongoEntity, P extends TProjection<InstanceType<T>>>(this: T, query: FilterQuery<InstanceType<T>>, options: (Omit<FindOneOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)): Promise<TDeepPickByProjection<InstanceType<T>, P>[]>;
            static fetchManyPaged<T extends typeof MongoEntity>(this: T, query?: FilterQuery<InstanceType<T>>, options?: FindOptions<InstanceType<T>> & FindOneOptions): Promise<{
                    collection: InstanceType<T>[];
                    total: number;
            }>;
            static fetchManyPagedPartial<T extends typeof MongoEntity, P extends TProjection<InstanceType<T>>>(this: T, query: FilterQuery<InstanceType<T>>, options: (Omit<FindOneOptions, 'projection'> & FindOptionsProjected<InstanceType<T>, P>)): Promise<{
                    collection: TDeepPickByProjection<InstanceType<T>, P>[];
                    total: number;
            }>;
            static aggregateMany<TOut = any, T extends typeof MongoEntity = any>(this: T, pipeline?: IAggrPipeline[], options?: {
                    Type?: Constructor<TOut>;
            } & MongoLib.CollectionAggregationOptions): Promise<TOut[]>;
            static aggregateManyPaged<TOut = any, T extends typeof MongoEntity = any>(this: T, pipeline?: IAggrPipeline[], options?: {
                    Type?: Constructor<TOut>;
            } & MongoLib.CollectionAggregationOptions): Promise<{
                    collection: TOut[];
                    total: number;
            }>;
            static count<T extends typeof MongoEntity>(query?: FilterQuery<T>): Promise<any>;
            static upsert<T extends MongoEntity>(instance: T): Promise<T>;
            static upsertBy<T extends MongoEntity>(finder: TFindQuery<T>, instance: T): Promise<T>;
            static upsertMany<T extends MongoEntity>(arr: T[]): Promise<T[]>;
            static upsertManyBy<T extends MongoEntity>(finder: TFindQuery<T>, arr: T[]): Promise<T[]>;
            static del<T extends MongoEntity>(entity: T): Promise<any>;
            static delMany<T extends MongoEntity>(arr: T[]): Promise<any>;
            static patch<T extends MongoEntity>(instance: T, patch: Partial<T> | UpdateQuery<T>): Promise<T>;
            static patchMany<T extends MongoEntity>(this: Constructor<T>, arr: [MongoLib.FilterQuery<T>, Partial<T> | UpdateQuery<T>][]): Promise<void>;
            static patchBy<T extends MongoEntity>(this: Constructor<T>, finder: MongoLib.FilterQuery<T>, patch: Partial<T> | UpdateQuery<T>): Promise<MongoLib.WriteOpResult>;
            static patchMultipleBy<T extends MongoEntity>(this: Constructor<T>, finder: MongoLib.FilterQuery<T>, patch: Partial<T> | UpdateQuery<T>): Promise<MongoLib.WriteOpResult>;
            static getCollection(): Promise<Collection>;
            static getDb(): Promise<Db>;
            upsert(): Promise<this>;
            del(): Promise<any>;
            patch<T extends MongoEntity>(this: T, patch: UpdateQuery<T>): Promise<T>;
    }
    export interface IEntity {
            _id: string;
    }
    export type Constructor<T = {}> = {
            new (...args: any[]): T;
    };
    export function MongoEntityFor<T>(Base: Constructor<T>): Statics<Constructor<T>> & Statics<typeof MongoEntity> & (new (...args: any[]) => T & MongoEntity<unknown>);
}

declare module 'class-mongo/MongoIndexes' {
    export namespace MongoIndexes {
        function ensureAll(): Promise<any>;
    }
}

declare module 'class-mongo/mongo/Settings' {
    export interface IMongoSettings {
        db: string;
        ip?: string;
        port?: number;
        connection?: string;
        params?: any;
    }
    export namespace MongoSettings {
        function define(setts: IMongoSettings): void;
    }
    export function setts_define(setts: IMongoSettings): void;
    export function setts_getConnectionString(): string;
    export function setts_getParams(): {
        auto_reconnect: boolean;
        native_parser: boolean;
        useUnifiedTopology: boolean;
        w: number;
    };
    export function setts_getDbName(): string;
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
    export interface IMongoMeta {
            collection: string;
            indexes: IndexRaw[];
    }
    export namespace MongoMeta {
            function pickModelMeta(mix: Function | Object): ModelInfo<any> & IMongoMeta;
            function resolveModelMeta(mix: Function | Object): ModelInfo<any> & IMongoMeta;
            function getCollection(mix: Function | Object): string;
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

declare module 'class-mongo/decos' {
    import { IndexOptions, IndexRaw } from 'class-mongo/mongo/Driver';
    export function table(name: string): (target: any) => any;
    export function index(index: IndexRaw): any;
    export function index(opts?: IndexOptions): any;
    export function index(name: string, opts?: IndexOptions): any;
    export function index(name: string, type: string | number, opts?: IndexOptions): any;
}

declare module 'class-mongo/mongo/DriverTypes' {
    import MongoLib = require('mongodb');
    /**
      * copy($($0).find('td:first-child').map((i, el) => `${el.textContent}?: any`).toArray().join('\n'))
      */
    export type TFindQuery<T = any> = (keyof T) | Partial<T> | MongoLib.FilterQuery<T> | ((x: Partial<T>) => MongoLib.FilterQuery<T>);
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
        $match?: Partial<T> | MongoLib.QuerySelector<T>;
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

declare module 'class-mongo/mongo/Driver' {
    import { ICallback } from 'class-mongo/ICallback';
    import MongoLib = require('mongodb');
    import { TFindQuery, IAggrPipeline } from 'class-mongo/mongo/DriverTypes';
    import { FindOptions } from 'class-mongo/types/FindOptions';
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
    export function db_getCollection(name: any, cb: ICallback<MongoLib.Collection>): void;
    export function db_resolveCollection(name: any): Promise<any>;
    export function db_getDb(callback: ICallback<MongoLib.Db>): void;
    export function db_resolveDb(): Promise<any>;
    export function db_findSingle<T = any>(coll: string, query: MongoLib.FilterQuery<T>, options: FindOptions<T> & MongoLib.FindOneOptions, callback: ICallback<T>): void;
    export function db_findMany<T = any>(coll: string, query: MongoLib.FilterQuery<T>, options: MongoLib.FindOneOptions, callback: ICallback<T[]>): void;
    export function db_findManyPaged<T = any>(coll: string, query: MongoLib.FilterQuery<T>, options: MongoLib.FindOneOptions, callback: ICallback<{
        collection: T[];
        total: number;
    }>): void;
    export function db_aggregate<T = any>(coll: string, pipeline: IAggrPipeline[], options: MongoLib.CollectionAggregationOptions, callback: ICallback<T[]>): void;
    export function db_count<T = any>(coll: string, query: MongoLib.FilterQuery<T>, options: MongoLib.MongoCountPreferences, callback: ICallback<number>): void;
    export function db_insert(coll: any, data: any, callback: any): void;
    export function db_insertSingle(coll: string, data: any, callback: any): void;
    export function db_insertMany(coll: any, data: any, callback: any): void;
    export function db_updateSingle<T extends {
        _id: any;
    }>(coll: string, data: T, callback: any): void;
    export function db_updateMany<T extends {
        _id: any;
    }>(coll: string, array: T[], callback: any): void;
    export function db_updateManyBy<T extends {
        _id: any;
    }>(coll: string, finder: TFindQuery<T>, array: T[], callback: any): void;
    export function db_upsertManyBy<T extends {
        _id: any;
    }>(coll: string, finder: TFindQuery<T>, array: T[], callback: any): void;
    export function db_upsertSingleBy<T extends {
        _id: any;
    }>(coll: string, finder: TFindQuery<T>, x: T, callback: any): void;
    export function db_patchSingle(coll: any, id: any, patch: any, callback: any): void;
    export function db_patchSingleBy<T>(coll: string, query: MongoLib.FilterQuery<T>, patch: MongoLib.UpdateQuery<T>, callback: any): void;
    export function db_patchMultipleBy<T>(coll: string, query: MongoLib.FilterQuery<T>, patch: MongoLib.UpdateQuery<T>, callback: any): void;
    export function db_patchMany<T>(coll: string, arr: [MongoLib.FilterQuery<T>, Partial<T> | MongoLib.UpdateQuery<T>][], callback: any): void;
    export function db_remove(coll: any, query: any, isSingle: any, callback: any): void;
    export function db_ensureIndexes(collection: string, indexes: IndexRaw[], callback: any): void;
    export function db_getMongo(): typeof MongoLib;
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

declare module 'class-mongo/ICallback' {
    export interface ICallback<T> {
        (error: Error | string, result?: T): void;
    }
}

