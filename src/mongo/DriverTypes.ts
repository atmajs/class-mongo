import * as MongoLib from 'mongodb';

/**
 * copy($($0).find('td:first-child').map((i, el) => `${el.textContent}?: any`).toArray().join('\n'))
 */

export type TFindQuery<T = any> = (keyof T) | Partial<T> | MongoLib.FilterQuery<T> | ((x: Partial<T>) => MongoLib.FilterQuery<T>);

export type TKeySelector = number | string

export interface IAggrArithmeticExp {
    $abs?: TAggrExpression
    $add?: TAggrExpression[]
    $ceil?: TAggrExpression
    $divide?: [TAggrExpression, TAggrExpression]
    $exp?: TAggrExpression
    $floor?: TAggrExpression
    $ln?: TAggrExpression
    $log?: TAggrExpression
    $log10?: TAggrExpression
    $mod?: [TAggrExpression, TAggrExpression]
    $multiply?: TAggrExpression[]
    $pow?: [TAggrExpression, TAggrExpression]
    $round? : [ TAggrExpression, number? ]
    $sqrt?: TAggrExpression
    $subtract?: [TAggrExpression, TAggrExpression]
    $trunc?:  [ TAggrExpression, number? ]
}

export interface IAggrArrayExp {

    $arrayElemAt?: [ TAggrExpression<any[]>, TAggrExpression<number> ]
    $arrayToObject?: TKeySelector | any
    $concatArrays?: TAggrExpression<any[]>[]
    $filter?: {
        input: TAggrExpression<any[]>
        as?: string
        cond: TAggrExpression<boolean>
    }
    $in?: [ TAggrExpression<any>, TAggrExpression<any[]> ]

    /** [ <array expression>, <search expression>, <start>, <end> ]  */
    $indexOfArray?: [ TAggrExpression<any[]>, TAggrExpression<string>, TAggrExpression<number>?, TAggrExpression<number>?]

    $isArray?: [ TAggrExpression<any[]> ]

    $map?: {
        input:  TAggrExpression<any[]>
        /** name for the variable for `in` */
        as?: string
        /**  is applied to each element of the input array */
        in: TAggrExpression<any>
    }

    $objectToArray?: any

    /** [ <start>, <end>, <non-zero step> ] */
    $range?: [ TAggrExpression<number>, TAggrExpression<number>, number? ]

    $reduce?: {
        input: TAggrExpression<any[]>
        initialValue: TAggrExpression<any>
        /** has vars in ctx: "$$value", "$$this" */
        in:  TAggrExpression<any>
    }

    $reverseArray?: TAggrExpression<any[]>
    $size?: TAggrExpression<any[]>

    /** [ <array>, <n> ] */
    $slice?: [ TAggrExpression<any[]>, number, number? ]

    $zip?: {
        inputs: TAggrExpression<any[]>[],
        useLongestLength?: boolean,
        defaults?:  TAggrExpression<any[]>
    }
}

export interface IAggrBoolean {
    $and?: TAggrExpression<boolean>[]
    $not?: TAggrExpression<boolean>
    $or?: TAggrExpression<boolean>[]
}


export interface IAggrComparison {
    $cmp?: [TAggrExpression<number>, TAggrExpression<number>]
    $eq?: [TAggrExpression<any>, TAggrExpression<any>]
    $gt?: [TAggrExpression<any>, TAggrExpression<any>]
    $gte?: [TAggrExpression<any>, TAggrExpression<any>]
    $lt?: [TAggrExpression<any>, TAggrExpression<any>]
    $lte?: [TAggrExpression<any>, TAggrExpression<any>]
    $ne?: [TAggrExpression<any>, TAggrExpression<any>]
}

export interface IAggrCondition {
    $cond?: {
        if: TAggrExpression<boolean>
        then: TAggrExpression<any>
        else: TAggrExpression<any>
    } | [ TAggrExpression<boolean>, TAggrExpression<any>, TAggrExpression<any> ]

    $ifNull?: [ TAggrExpression<any> , TAggrExpression<any>  ]
    $switch?: {
        branches: {
            case: TAggrExpression<boolean>
            then: TAggrExpression<any>
        } []
        default?: TAggrExpression<any>
    }
}


export interface IAggrDate {
    $dateFromParts?: any
    $dateFromString?: any
    $dateToParts?: any
    $dateToString?: any
    $dayOfMonth?: any
    $dayOfWeek?: any
    $dayOfYear?: any
    $hour?: any
    $isoDayOfWeek?: any
    $isoWeek?: any
    $isoWeekYear?: any
    $millisecond?: any
    $minute?: any
    $month?: any
    $second?: any
    $toDate?: any
    $week?: any
    $year?: any
}

export interface IAggrLiteral {
    $literal?: any
}
export interface IAggrSetExpr {
    $allElementsTrue?: any
    $anyElementTrue?: any
    $setDifference?: any
    $setEquals?: any
    $setIntersection?: any
    $setIsSubset?: any
    $setUnion?: any
}

export interface IAggrString {
    $concat?: any
    $dateFromString?: any
    $dateToString?: any
    $indexOfBytes?: any
    $indexOfCP?: any
    $ltrim?: any
    $regexFind?: any
    $regexFindAll?: any
    $regexMatch?: any
    $rtrim?: any
    $split?: any
    $strLenBytes?: any
    $strLenCP?: any
    $strcasecmp?: any
    $substr?: any
    $substrBytes?: any
    $substrCP?: any
    $toLower?: any
    $toString?: any
    $trim?: any
    $toUpper?: any
}

export interface IAggrTrigonometry  {
    $sin?: any
    $cos?: any
    $tan?: any
    $asin?: any
    $acos?: any
    $atan?: any
    $atan2?: any
    $asinh?: any
    $acosh?: any
    $atanh?: any
    $degreesToRadians?: any
    $radiansToDegrees?: any
}

export interface IAggrType  {
    $convert?: any
    $toBool?: any
    $toDate?: any
    $toDecimal?: any
    $toDouble?: any
    $toInt?: any
    $toLong?: any
    $toObjectId?: any
    $toString?: any
    $type?: any
}

export interface IAggrAccum {
    $addToSet?: any
    $avg?: any
    $first?: any
    $last?: any
    $max?: any
    $mergeObjects?: any
    $min?: any
    $push?: any
    $stdDevPop?: any
    $stdDevSamp?: any
    $sum?: any
}

export interface IAggrExpression<T = any> extends IAggrArithmeticExp
    , IAggrArrayExp
    , IAggrBoolean
    , IAggrComparison
    , IAggrCondition
    , IAggrDate
    , IAggrLiteral
    , IAggrSetExpr
    , IAggrString
    , IAggrTrigonometry {

}
export type TAggrExpression<T = any> = TKeySelector | IAggrExpression<T>;



export interface IAggrPipeline<T = any> {
    $addFields?: {
        [newKey: string]: TAggrExpression
    }
    $bucket?: any
    $bucketAuto?: any
    $collStats?: any
    $count?: string
    $facet?: any
    $geoNear?: {
        near?: any
        distanceField?: string
        spherical?: boolean
        maxDistance?: number
        query?: any
        distanceMultiplier?: any
        includeLocs?: any
        uniqueDocs?: any
        minDistance?: any
        key?: any
    }
    $graphLookup?: any
    $group?: {
        _id: TAggrExpression | any
        [key: string]: {
            $addToSet?: TAggrExpression
            $avg?: TAggrExpression
            $first?: TAggrExpression
            $last?: TAggrExpression
            $max?: TAggrExpression
            $mergeObjects?: TAggrExpression
            $min?: TAggrExpression
            $push?: TAggrExpression
            $stdDevPop?: TAggrExpression
            $stdDevSamp?: TAggrExpression
            $sum?: TAggrExpression
        }

    }
    $indexStats?: any
    $limit?: any
    $listSessions?: any
    $lookup?: any
    $match?: Partial<T> | MongoLib.QuerySelector<T>
    $merge?: any
    $out?: any
    $planCacheStats?: any
    $project?: any
    $redact?: any
    $replaceRoot?: any
    $replaceWith?: any
    $sample?: any
    $set?: any
    $skip?: any
    $sort?: any
    $sortByCount?: any
    $unset?: any
    $unwind?: any
}
