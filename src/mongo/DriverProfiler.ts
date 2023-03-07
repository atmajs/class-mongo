import * as alot from 'alot';
import { core } from './DriverCore'

let state = false;

    // settins
let setts_slowLimit = 50;
let setts_onDetect = null;
let setts_detector = null;

let box = {
        count: 0,
        slow: [] as IQueryInfo[],
        errors: [] as Error[]
    };
const OriginalKeys = alot.fromObject(core).toArray();

let _core_findSingle = core.findSingle,
    _core_findMany = core.findMany,
    _core_upsertSingle = core.upsertSingle,
    _core_upsertMany = core.upsertMany,
    _core_updateSingle = core.updateSingle,
    _core_updateMany = core.updateMany,
    _core_removeSingle = core.removeSingle,
    _core_removeMany = core.removeMany,
    _core_count = core.count
    ;

export interface IQueryInfo {
    coll: string
    query: any
    plan: any
    params: any
}
export interface IProfilerSettings {
    slow?: number
    onDetect?: (info: IQueryInfo) => void
    detector?: (plan, coll, query) => boolean
}

export function core_profiler_getData() {
    return box;
};

export function core_profiler_toggle(enable, settings) {
    if (settings) {
        setts_slowLimit = settings.slow || setts_slowLimit;
        setts_onDetect = settings.onDetect || setts_onDetect;
        setts_detector = settings.detector || setts_detector;
    }

    if (state === enable)
        return;
    if (enable == null)
        enable = !!state;

    state = enable;
    if (state === false) {
        OriginalKeys.forEach(tuple => core[tuple.key] = tuple.value);
        return;
    }

    function wrapSync(fnSync): any {
        return function (...args) {
            return new Promise((resolve, reject) => {
                function callback(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result)
                };
                fnSync(...args, callback);
            });
        };
    }

    core.findSingle = async function (db, coll, query, options, callback) {
        let result = await _core_findSingle.apply(null, arguments);
        await _core_findSingle(
            db
            , coll
            , query
            , wrapOptions(options)
            , analizator(coll, query));
        return result;
    };
    core.findSingleAsync = wrapSync(core.findSingle);

    core.findMany = async function (db, coll, query, options, callback /*<error, array>*/) {
        let result = await _core_findMany.apply(null, arguments);
        await _core_findMany(
            db
            , coll
            , wrapQuery(query)
            , options
            , analizator(coll, query));
        return result;
    };
    core.findManyAsync = wrapSync(core.findMany);

    core.upsertSingle = async function (db, coll, query, data, callback/*<error, stats>*/) {
        let result = await _core_upsertSingle.apply(null, arguments);
        await _core_upsertSingle(
            db
            , coll
            , wrapQuery(query)
            , data
            , analizator(coll, query));
        return result;
    };
    core.upsertSingleAsync = wrapSync(core.upsertSingle);


    core.upsertMany = async function (db, coll, array /*[[query, data]]*/, callback) {
        let result = await _core_upsertMany.apply(null, arguments);
        await _core_upsertMany(
            db
            , coll
            , wrapMany(array)
            , analizator(coll, array));
        return result;
    };
    core.upsertManyAsync = wrapSync(core.upsertMany);

    core.updateSingle = async function (db, meta, query, mod, callback /*<error, stats>*/) {
        let result = await _core_updateSingle.apply(null, arguments);
        await _core_updateSingle(
            db
            , meta
            , wrapQuery(query)
            , mod
            , analizator(meta, query));
        return result;
    };
    core.updateSingleAsync = wrapSync(core.updateSingle);

    core.updateMany = async function (db, coll, array/*[[query, data]]*/, callback) {
        let result = await _core_updateMany.apply(null, arguments);
        await _core_updateMany(
            db
            , coll
            , wrapMany(array)
            , analizator(coll, array));
        return result;
    };
    core.updateManyAsync = wrapSync(core.updateMany);

    core.removeSingle = async function (db, coll, query, callback /*<error, count>*/) {
        let result = await _core_removeSingle.apply(null, arguments);
        _core_removeSingle(
            db
            , coll
            , wrapQuery(query)
            , analizator(coll, query));
        return result;
    };
    core.removeSingleAsync = wrapSync(core.removeSingle);


    core.removeMany = async function (db, coll, query, callback /*<error, count>*/) {
        let result = await _core_removeMany.apply(null, arguments);
        _core_removeMany(
            db
            , coll
            , wrapQuery(query)
            , analizator(coll, query));
        return result;
    };
    core.removeManyAsync = wrapSync(core.removeMany);

    core.count = async function (db, coll, query, options, callback/*<error, count>*/) {
        let result = await _core_count.apply(null, arguments);
        _core_count(
            db
            , coll
            , wrapQuery(query)
            , wrapOptions(null)
            , analizator(coll, query));
        return result;
    };
    core.countAsync = wrapSync(core.count);

}

function  wrapQuery(query) {
    if (query == null)
        return { $query: {}, explain: true };

    if (query.$query) {
        query.explain = true;
        return query;
    }
    return {
        $query: query,
        explain: true
    };
}
function wrapOptions (options) {
    if (options == null) {
        return { explain: true }
    };
    options.explain = true;
    return options;
}
function wrapMany(array) {
    return array.forEach(function (x) {
        return [wrapQuery(x[0]), x[1]];
    });
}
function analizator(coll, query) {
    return function (error, plan) {
        box.count++;
        if (error) {
            box.errors.push(error);
            return;
        }
        analize(coll, query, plan);
    }
}
function analize(coll, query, plan, params: { isArray?: boolean, isClause?: boolean, index?: any} = {}) {
    if (plan == null || typeof plan === 'number' || plan.executionStats == null) {
        return;
    }
    if (Array.isArray(plan)) {
           plan.forEach(function (plan, index) {
            params.isArray = true;
            params.index = index;
            analize(coll, query, plan, params);
        });
        return;
    }
    if (plan.executionStats.executionTimeMillis >= setts_slowLimit) {
        add('slow', coll, query, plan, params);
        return;
    }

    if (plan.queryPlanner.indexFilterSet === false) {
        add('unindexed', coll, query, plan, params);
        return;
    }
    if (setts_detector && setts_detector(plan, coll, query)) {
        add('custom', coll, query, plan, params);
        return;
    }
}
function add(reason, coll, query, plan, params) {
    params.reason = reason;

    var obj = {
        coll: coll,
        query: query,
        plan: plan,
        params: params
    };
    setts_onDetect && setts_onDetect(obj);
    box.slow.push(obj);
}
