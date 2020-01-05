import { core } from './DriverCore'

var state = false,

    // settins
    setts_slowLimit = 50,
    setts_onDetect = null,
    setts_detector = null,

    box = {
        count: 0,
        slow: [] as IQueryInfo[],
        errors: [] as Error[]
    },

    _core_findSingle = core.findSingle,
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
        core.findSingle = _core_findSingle;
        core.findMany = _core_findMany;
        core.upsertSingle = _core_upsertSingle;
        core.upsertMany = _core_upsertMany;
        core.updateSingle = _core_updateSingle;
        core.updateMany = _core_updateMany;
        core.removeSingle = _core_removeSingle;
        core.removeMany = _core_removeMany;
        core.count = _core_count;
        return;
    }

    core.findSingle = function (db, coll, query, options, callback /*<error, item>*/) {
        _core_findSingle.apply(null, arguments);
        _core_findSingle(
            db 
            , coll
            , query
            , wrapOptions(options)
            , analizator(coll, query));
    };
    core.findMany = function (db, coll, query, options, callback /*<error, array>*/) {
        _core_findMany.apply(null, arguments);
        _core_findMany(
            db 
            , coll
            , wrapQuery(query)
            , options
            , analizator(coll, query));
    };
    core.upsertSingle = function (db, coll, query, data, callback/*<error, stats>*/) {
        _core_upsertSingle.apply(null, arguments);
        _core_upsertSingle(
            db
            , coll
            , wrapQuery(query)
            , data
            , analizator(coll, query));
    };
    core.upsertMany = function (db, coll, array /*[[query, data]]*/, callback) {
        _core_upsertMany.apply(null, arguments);
        _core_upsertMany(
            db
            , coll
            , wrapMany(array)
            , analizator(coll, array));
    };
    core.updateSingle = function (db, coll, query, mod, callback /*<error, stats>*/) {
        _core_updateSingle.apply(null, arguments);
        _core_updateSingle(
            db
            , coll
            , wrapQuery(query)
            , mod
            , analizator(coll, query));
    };
    core.updateMany = function (db, coll, array/*[[query, data]]*/, callback) {
        _core_updateMany.apply(null, arguments);
        _core_updateMany(
            db
            , coll
            , wrapMany(array)
            , analizator(coll, array));
    };
    core.removeSingle = function (db, coll, query, callback /*<error, count>*/) {
        _core_removeSingle.apply(null, arguments);
        _core_removeSingle(
            db
            , coll
            , wrapQuery(query)
            , analizator(coll, query));
    };
    core.removeMany = function (db, coll, query, callback /*<error, count>*/) {
        _core_removeMany.apply(null, arguments);
        _core_removeMany(
            db
            , coll
            , wrapQuery(query)
            , analizator(coll, query));
    };
    core.count = function (db, coll, query, options, callback/*<error, count>*/) {
        _core_count.apply(null, arguments);
        _core_count(
            db
            , coll
            , wrapQuery(query)
            , wrapOptions(null)
            , analizator(coll, query));
    };
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