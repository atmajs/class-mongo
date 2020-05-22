
// source ./UMD.js
(function(factory){
	
	var _name = 'class-mongo',
		_global = typeof window === 'undefined' ? global : window,
		_module = {
			exports: {}
		};

	factory(_module, _module.exports, _global);

	if (typeof define === 'function' && define.amd) {
        define([], function () {
        	return _module.exports;
        });
        return;
    } 
    if (typeof module === 'object' && module.exports) {
    	module.exports = _module.exports;
    	return;
    }

	if (_name) {
		_global[_name] = _module.exports;
	}

}(function(module, exports, global){
	var _src_MongoEntity = {};
var _src_MongoIndexes = {};
var _src_MongoMeta = {};
var _src_MongoUtils = {};
var _src_decos = {};
var _src_mongo_Driver = {};
var _src_mongo_DriverCore = {};
var _src_mongo_DriverProfiler = {};
var _src_mongo_DriverUtils = {};
var _src_mongo_IndexHandler = {};
var _src_mongo_Settings = {};
var _src_mongo_utils = {};
var _src_utils_array = {};
var _src_utils_patchObject = {};

// source ./ModuleSimplified.js
var _src_mongo_Settings;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var __ip = '127.0.0.1';
var __port = 27017;
var __db = null;
var __connection = null;
var __params = {
    auto_reconnect: true,
    native_parser: true,
    useUnifiedTopology: true,
    w: 1
};
var MongoSettings;
(function (MongoSettings) {
    function define(setts) {
        setts_define(setts);
    }
    MongoSettings.define = define;
})(MongoSettings = exports.MongoSettings || (exports.MongoSettings = {}));
function setts_define(setts) {
    if (setts.ip) {
        __ip = setts.ip;
    }
    if (setts.port) {
        __port = setts.port;
    }
    if (setts.db) {
        __db = setts.db;
    }
    if (setts.params) {
        __params = setts.params;
    }
    __connection = setts.connection;
}
exports.setts_define = setts_define;
;
function setts_getConnectionString() {
    if (__connection)
        return __connection;
    if (!__db) {
        return null;
    }
    return 'mongodb://'
        + __ip
        + ':'
        + __port
        + '/'
        + __db;
}
exports.setts_getConnectionString = setts_getConnectionString;
function setts_getParams() {
    return __params;
}
exports.setts_getParams = setts_getParams;
function setts_getDbName() {
    return __db;
}
exports.setts_getDbName = setts_getDbName;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Settings.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_Settings) && isObject(module.exports)) {
		Object.assign(_src_mongo_Settings, module.exports);
		return;
	}
	_src_mongo_Settings = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_array;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
function arr_remove(array, fn) {
    var imax = array.length, i = -1;
    while (++i < imax) {
        if (fn(array[i]) === true) {
            array.splice(i, 1);
            i--;
            imax--;
        }
    }
}
exports.arr_remove = arr_remove;
;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=array.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_array) && isObject(module.exports)) {
		Object.assign(_src_utils_array, module.exports);
		return;
	}
	_src_utils_array = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_patchObject;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var atma_utils_1 = require("atma-utils");
var array_1 = _src_utils_array;
function obj_patch(obj, patch) {
    for (var key in patch) {
        var patcher = patches[key];
        if (patcher)
            patcher[fn_WALKER](obj, patch[key], patcher[fn_MODIFIER]);
        else
            console.error('Unknown or not implemented patcher', key);
    }
    return obj;
}
exports.obj_patch = obj_patch;
;
function obj_partialToUpdateQuery(data) {
    if (obj_isPatch(data)) {
        return data;
    }
    var $set = {};
    for (var key in data) {
        if (key === '_id') {
            continue;
        }
        $set[key] = data[key];
    }
    return { $set: $set };
}
exports.obj_partialToUpdateQuery = obj_partialToUpdateQuery;
function obj_patchValidate(patch) {
    if (patch == null)
        return 'Patch in undefined';
    var has = false;
    for (var key in patch) {
        has = true;
        if (patches[key] == null)
            return 'Unsupported patcher: ' + key;
    }
    if (has === false)
        return 'No data';
    return null;
}
exports.obj_patchValidate = obj_patchValidate;
;
function obj_isPatch(patch) {
    if (patch == null) {
        return false;
    }
    for (var key in patches) {
        if (key in patch) {
            return true;
        }
    }
    return false;
}
exports.obj_isPatch = obj_isPatch;
;
// === private
function walk_mutator(obj, data, fn) {
    for (var key in data)
        fn(atma_utils_1.obj_getProperty(obj, key), data[key], key);
}
function walk_modifier(obj, data, fn) {
    for (var key in data)
        atma_utils_1.obj_setProperty(obj, key, fn(atma_utils_1.obj_getProperty(obj, key), data[key], key));
}
function fn_IoC() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (val, mix, prop) {
        for (var i = 0, fn, imax = fns.length; i < imax; i++) {
            fn = fns[i];
            if (fn(val, mix, prop) === false)
                return;
        }
    };
}
function arr_checkArray(val, mix, prop) {
    if (atma_utils_1.is_Array(val) === false) {
        // if DEBUG
        console.warn('<patch> property is not an array', prop);
        // endif
        return false;
    }
}
function arr_push(val, mix, prop) {
    if (mix.hasOwnProperty('$each')) {
        for (var i = 0, imax = mix.$each.length; i < imax; i++) {
            val.push(mix.$each[i]);
        }
        return;
    }
    val.push(mix);
}
function arr_pop(val, mix, prop) {
    val[mix > 0 ? 'pop' : 'shift']();
}
function arr_pull(val, mix, prop) {
    array_1.arr_remove(val, function (item) {
        return query_match(item, mix);
    });
}
function val_inc(val, mix, key) {
    return val + mix;
}
function val_set(val, mix, key) {
    return mix;
}
function val_unset() {
    return void 0;
}
function val_bit(val, mix) {
    if (mix.or)
        return val | mix.or;
    if (mix.and)
        return val & mix.and;
    return val;
}
var query_match;
(function () {
    /** @TODO improve object matcher */
    query_match = function (obj, mix) {
        for (var key in mix) {
            if (obj[key] !== mix[key])
                return false;
        }
        return true;
    };
}());
var fn_WALKER = 0, fn_MODIFIER = 1;
var patches = {
    '$push': [walk_mutator, fn_IoC(arr_checkArray, arr_push)],
    '$pop': [walk_mutator, fn_IoC(arr_checkArray, arr_pop)],
    '$pull': [walk_mutator, fn_IoC(arr_checkArray, arr_pull)],
    '$inc': [walk_modifier, val_inc],
    '$set': [walk_modifier, val_set],
    '$unset': [walk_modifier, val_unset],
    '$bit': [walk_modifier, val_bit]
};
//# sourceMappingURL=export.js.map
//# sourceMappingURL=patchObject.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_patchObject) && isObject(module.exports)) {
		Object.assign(_src_utils_patchObject, module.exports);
		return;
	}
	_src_utils_patchObject = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_DriverCore;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var Settings_1 = _src_mongo_Settings;
var patchObject_1 = _src_utils_patchObject;
// export type BulkWriteOp<T> = {
//     insertOne: { document: T }
// } | {
//     updateOne: {
//         filter: FilterQuery<T>,
//         update: UpdateQuery<T> | Partial<T>
//         upsert?: boolean
//     }
// } | {
//     updateMany: {
//         filter: FilterQuery<T>
//         update: UpdateQuery<T> | Partial<T>
//         upsert?: boolean
//     }
// } | {
//     deleteOne: {
//         filter: FilterQuery<T>
//     }
// } | {
//     deleteMany: {
//         filter: FilterQuery<T>
//     }
// } | {
//     replaceOne: {
//         filter: FilterQuery<T>,
//         replacement: Partial<T>
//         upsert?: boolean
//     }
// };
var core;
(function (core) {
    var mongoLib = null;
    function getDb() {
        return Connections.getDb();
    }
    core.getDb = getDb;
    ;
    function connect(cb) {
        Connections.connect(null, null, cb);
    }
    core.connect = connect;
    ;
    function getMongoLib() {
        return (mongoLib !== null && mongoLib !== void 0 ? mongoLib : (mongoLib = require('mongodb')));
    }
    core.getMongoLib = getMongoLib;
    ;
    function findSingle(db, coll, query, options, callback /*<error, item>*/) {
        var c = db.collection(coll);
        if (options == null) {
            return c.findOne(query, callback);
        }
        c.findOne(query, options, callback);
    }
    core.findSingle = findSingle;
    ;
    function findMany(db, coll, query, options, callback /*<error, array>*/) {
        var c = db.collection(coll);
        var cursor = c.find(query, options);
        cursor.toArray(callback);
    }
    core.findMany = findMany;
    ;
    function findManyPaged(db, coll, query, options, callback) {
        var c = db.collection(coll);
        var cursor = c.find(query, options);
        cursor.count(false, function (error, total) {
            if (error) {
                callback(error, null);
                return;
            }
            cursor.toArray(function (error, arr) {
                if (error) {
                    callback(error, null);
                    return;
                }
                callback(null, {
                    collection: arr,
                    total: total
                });
            });
        });
    }
    core.findManyPaged = findManyPaged;
    ;
    function aggregate(db, coll, pipeline, options, callback /*<error, array>*/) {
        var c = db.collection(coll);
        var cursor = c.aggregate(pipeline, options);
        cursor.toArray(callback);
    }
    core.aggregate = aggregate;
    ;
    function upsertSingle(db, coll, query, data, callback) {
        var update = patchObject_1.obj_partialToUpdateQuery(data);
        db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle, callback);
    }
    core.upsertSingle = upsertSingle;
    ;
    function upsertMany(db, coll, array /*[[query, data]]*/, callback) {
        var ops = array.map(function (op) {
            return {
                updateOne: {
                    filter: op[0],
                    update: patchObject_1.obj_partialToUpdateQuery(op[1]),
                    upsert: true
                }
            };
        });
        bulkWrite(db, coll, ops, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            /** when updates of existed documents occures there will be no _id field */
            var upserted = result.getUpsertedIds();
            for (var i = 0; i < upserted.length; i++) {
                var singleResult = upserted[i];
                var index = singleResult.index, _id = singleResult._id;
                var x = array[index][1];
                if (x._id == null) {
                    x._id = _id;
                }
                else if (String(x._id) !== String(upserted[i])) {
                    callback(new Error("Unexpected missmatch: " + x._id + " != " + upserted[i]), null);
                    return;
                }
            }
            callback(err, result);
        });
    }
    core.upsertMany = upsertMany;
    ;
    function updateSingle(db, coll, query, data, callback /*<error, stats>*/) {
        var update = patchObject_1.obj_partialToUpdateQuery(data);
        db
            .collection(coll)
            .updateOne(query, update, opt_updateSingle, callback);
    }
    core.updateSingle = updateSingle;
    ;
    function updateMany(db, coll, array /*[[query, data]]*/, callback) {
        var ops = array.map(function (op) {
            return {
                updateOne: {
                    filter: op[0],
                    update: op[1],
                    upsert: false
                }
            };
        });
        bulkWrite(db, coll, ops, callback);
    }
    core.updateMany = updateMany;
    ;
    function removeSingle(db, coll, query, callback /*<error, count>*/) {
        db
            .collection(coll)
            .deleteOne(query, callback);
    }
    core.removeSingle = removeSingle;
    ;
    function removeMany(db, coll, query, callback /*<error, count>*/) {
        db
            .collection(coll)
            .deleteMany(query, callback);
    }
    core.removeMany = removeMany;
    ;
    function count(db, coll, query, options, callback /*<error, count>*/) {
        db
            .collection(coll)
            .countDocuments(query, options, callback);
    }
    core.count = count;
    function bulkWrite(db, coll, operations, callback) {
        db.collection(coll).bulkWrite(operations, callback);
    }
    core.bulkWrite = bulkWrite;
    ;
})(core = exports.core || (exports.core = {}));
// ==== private
var opt_upsertSingle = {
    upsert: true,
    multi: false
};
var opt_updateSingle = {
    upsert: false,
    multi: false
};
function modifyMany(modifier, db, coll, array /*[[query, data]]*/, callback) {
    var error;
    var imax = array.length;
    var count = imax;
    var i = -1;
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
var Connections;
(function (Connections) {
    var _connection = null;
    var _connections = {};
    var Connection = /** @class */ (function () {
        function Connection(url, params) {
            if (url === void 0) { url = null; }
            if (params === void 0) { params = null; }
            this.url = url;
            this.params = params;
            this.connecting = false;
            this.listeners = [];
            if (url == null) {
                this.url = Settings_1.setts_getConnectionString();
            }
            if (params == null) {
                this.params = Settings_1.setts_getParams();
            }
        }
        Connection.prototype.connect = function (callback) {
            var _this = this;
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
                .connect(this.url, this.params, function (error, client) {
                var _a;
                _this.connecting = false;
                _this.error = error;
                _this.client = client;
                _this.db = (_a = client) === null || _a === void 0 ? void 0 : _a.db(Settings_1.setts_getDbName());
                var arr = _this.listeners;
                for (var i = 0; i < arr.length; i++) {
                    arr[i](_this.error, _this.db);
                }
            });
        };
        return Connection;
    }());
    function getDb(url) {
        var _a, _b;
        if (url == null) {
            return (_a = _connection) === null || _a === void 0 ? void 0 : _a.db;
        }
        return (_b = _connections[url]) === null || _b === void 0 ? void 0 : _b.db;
    }
    Connections.getDb = getDb;
    function connect(url, params, callback) {
        if (url === void 0) { url = null; }
        if (params === void 0) { params = null; }
        var connection = url == null ? _connection : _connections[url];
        if (connection) {
            connection.connect(callback);
            return;
        }
        var _url = (url !== null && url !== void 0 ? url : Settings_1.setts_getConnectionString());
        var _params = (params !== null && params !== void 0 ? params : Settings_1.setts_getParams());
        connection = new Connection(_url, _params);
        _connections[url] = connection;
        _connection = (_connection !== null && _connection !== void 0 ? _connection : connection);
        connection.connect(callback);
    }
    Connections.connect = connect;
    ;
})(Connections || (Connections = {}));
//# sourceMappingURL=MongoEntity.js.map
//# sourceMappingURL=DriverCore.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_DriverCore) && isObject(module.exports)) {
		Object.assign(_src_mongo_DriverCore, module.exports);
		return;
	}
	_src_mongo_DriverCore = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_utils;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
function cb_createListener(count, cb) {
    var _error;
    return function (error) {
        if (error)
            _error = error;
        if (--count === 0)
            cb(_error);
    };
}
exports.cb_createListener = cb_createListener;
;
function cb_completeDelegate(dfr) {
    return function (error) {
        if (error)
            return dfr.reject(error);
        dfr.resolve();
    };
}
exports.cb_completeDelegate = cb_completeDelegate;
;
function cb_toPromise(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        fn.apply(void 0, __spreadArrays(args, [function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }]));
    });
}
exports.cb_toPromise = cb_toPromise;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=utils.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_utils) && isObject(module.exports)) {
		Object.assign(_src_mongo_utils, module.exports);
		return;
	}
	_src_mongo_utils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_DriverUtils;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var DriverCore_1 = _src_mongo_DriverCore;
var DriverUtils;
(function (DriverUtils) {
    function getFindQuery(finder, x) {
        var _a;
        if (typeof finder === 'string') {
            if (finder === '_id') {
                return {
                    _id: ensureObjectID(x._id)
                };
            }
            return _a = {},
                _a[finder] = x[finder],
                _a;
        }
        return x;
    }
    DriverUtils.getFindQuery = getFindQuery;
    function ensureObjectID(value) {
        if (typeof value === 'string' && value.length === 24) {
            var ObjectID = DriverCore_1.core.getMongoLib().ObjectID;
            return new ObjectID(value);
        }
        return value;
    }
    DriverUtils.ensureObjectID = ensureObjectID;
})(DriverUtils = exports.DriverUtils || (exports.DriverUtils = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=DriverUtils.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_DriverUtils) && isObject(module.exports)) {
		Object.assign(_src_mongo_DriverUtils, module.exports);
		return;
	}
	_src_mongo_DriverUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_DriverProfiler;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var DriverCore_1 = _src_mongo_DriverCore;
var state = false, 
// settins
setts_slowLimit = 50, setts_onDetect = null, setts_detector = null, box = {
    count: 0,
    slow: [],
    errors: []
}, _core_findSingle = DriverCore_1.core.findSingle, _core_findMany = DriverCore_1.core.findMany, _core_upsertSingle = DriverCore_1.core.upsertSingle, _core_upsertMany = DriverCore_1.core.upsertMany, _core_updateSingle = DriverCore_1.core.updateSingle, _core_updateMany = DriverCore_1.core.updateMany, _core_removeSingle = DriverCore_1.core.removeSingle, _core_removeMany = DriverCore_1.core.removeMany, _core_count = DriverCore_1.core.count;
function core_profiler_getData() {
    return box;
}
exports.core_profiler_getData = core_profiler_getData;
;
function core_profiler_toggle(enable, settings) {
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
        DriverCore_1.core.findSingle = _core_findSingle;
        DriverCore_1.core.findMany = _core_findMany;
        DriverCore_1.core.upsertSingle = _core_upsertSingle;
        DriverCore_1.core.upsertMany = _core_upsertMany;
        DriverCore_1.core.updateSingle = _core_updateSingle;
        DriverCore_1.core.updateMany = _core_updateMany;
        DriverCore_1.core.removeSingle = _core_removeSingle;
        DriverCore_1.core.removeMany = _core_removeMany;
        DriverCore_1.core.count = _core_count;
        return;
    }
    DriverCore_1.core.findSingle = function (db, coll, query, options, callback /*<error, item>*/) {
        _core_findSingle.apply(null, arguments);
        _core_findSingle(db, coll, query, wrapOptions(options), analizator(coll, query));
    };
    DriverCore_1.core.findMany = function (db, coll, query, options, callback /*<error, array>*/) {
        _core_findMany.apply(null, arguments);
        _core_findMany(db, coll, wrapQuery(query), options, analizator(coll, query));
    };
    DriverCore_1.core.upsertSingle = function (db, coll, query, data, callback /*<error, stats>*/) {
        _core_upsertSingle.apply(null, arguments);
        _core_upsertSingle(db, coll, wrapQuery(query), data, analizator(coll, query));
    };
    DriverCore_1.core.upsertMany = function (db, coll, array /*[[query, data]]*/, callback) {
        _core_upsertMany.apply(null, arguments);
        _core_upsertMany(db, coll, wrapMany(array), analizator(coll, array));
    };
    DriverCore_1.core.updateSingle = function (db, coll, query, mod, callback /*<error, stats>*/) {
        _core_updateSingle.apply(null, arguments);
        _core_updateSingle(db, coll, wrapQuery(query), mod, analizator(coll, query));
    };
    DriverCore_1.core.updateMany = function (db, coll, array /*[[query, data]]*/, callback) {
        _core_updateMany.apply(null, arguments);
        _core_updateMany(db, coll, wrapMany(array), analizator(coll, array));
    };
    DriverCore_1.core.removeSingle = function (db, coll, query, callback /*<error, count>*/) {
        _core_removeSingle.apply(null, arguments);
        _core_removeSingle(db, coll, wrapQuery(query), analizator(coll, query));
    };
    DriverCore_1.core.removeMany = function (db, coll, query, callback /*<error, count>*/) {
        _core_removeMany.apply(null, arguments);
        _core_removeMany(db, coll, wrapQuery(query), analizator(coll, query));
    };
    DriverCore_1.core.count = function (db, coll, query, options, callback /*<error, count>*/) {
        _core_count.apply(null, arguments);
        _core_count(db, coll, wrapQuery(query), wrapOptions(null), analizator(coll, query));
    };
}
exports.core_profiler_toggle = core_profiler_toggle;
function wrapQuery(query) {
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
function wrapOptions(options) {
    if (options == null) {
        return { explain: true };
    }
    ;
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
    };
}
function analize(coll, query, plan, params) {
    if (params === void 0) { params = {}; }
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
//# sourceMappingURL=export.js.map
//# sourceMappingURL=DriverProfiler.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_DriverProfiler) && isObject(module.exports)) {
		Object.assign(_src_mongo_DriverProfiler, module.exports);
		return;
	}
	_src_mongo_DriverProfiler = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_Driver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var DriverCore_1 = _src_mongo_DriverCore;
var utils_1 = _src_mongo_utils;
var DriverUtils_1 = _src_mongo_DriverUtils;
var patchObject_1 = _src_utils_patchObject;
var DriverProfiler_1 = _src_mongo_DriverProfiler;
exports.db_profiler_getData = DriverProfiler_1.core_profiler_getData;
var DriverProfiler_2 = _src_mongo_DriverProfiler;
exports.db_profiler_toggle = DriverProfiler_2.core_profiler_toggle;
function withDb(onError, fn) {
    var db = DriverCore_1.core.getDb();
    if (db == null) {
        DriverCore_1.core.connect(function (err, db) {
            if (err) {
                onError(err);
                return;
            }
            fn(db);
        });
        return;
    }
    fn(db);
}
function db_getCollection(name, cb) {
    withDb(cb, function (db) {
        var coll = db.collection(name);
        if (coll == null) {
            return cb(new Error("<mongo> Collection Not Found: " + name));
        }
        cb(null, coll);
    });
}
exports.db_getCollection = db_getCollection;
;
function db_resolveCollection(name) {
    return utils_1.cb_toPromise(db_getCollection, name);
}
exports.db_resolveCollection = db_resolveCollection;
;
function db_getDb(callback) {
    withDb(callback, function (db) {
        callback(null, db);
    });
}
exports.db_getDb = db_getDb;
;
function db_resolveDb() {
    return utils_1.cb_toPromise(db_getDb);
}
exports.db_resolveDb = db_resolveDb;
;
function db_findSingle(coll, query, callback) {
    withDb(callback, function (db) {
        DriverCore_1.core.findSingle(db, coll, queryToMongo(query), null, callback);
    });
}
exports.db_findSingle = db_findSingle;
;
function db_findMany(coll, query, options, callback) {
    withDb(callback, function (db) {
        DriverCore_1.core.findMany(db, coll, queryToMongo(query), (options !== null && options !== void 0 ? options : {}), callback);
    });
}
exports.db_findMany = db_findMany;
;
function db_findManyPaged(coll, query, options, callback) {
    withDb(callback, function (db) {
        DriverCore_1.core.findManyPaged(db, coll, queryToMongo(query), (options !== null && options !== void 0 ? options : {}), callback);
    });
}
exports.db_findManyPaged = db_findManyPaged;
;
function db_aggregate(coll, pipeline, options, callback) {
    withDb(callback, function (db) {
        DriverCore_1.core.aggregate(db, coll, pipeline, (options !== null && options !== void 0 ? options : {}), callback);
    });
}
exports.db_aggregate = db_aggregate;
;
function db_count(coll, query, options, callback) {
    if (options === void 0) { options = null; }
    withDb(callback, function (db) {
        DriverCore_1.core.count(db, coll, query, options, callback);
    });
}
exports.db_count = db_count;
;
function db_insert(coll, data, callback) {
    withDb(callback, function (db) {
        db
            .collection(coll)
            .insert(data, {}, callback);
    });
}
exports.db_insert = db_insert;
;
function db_insertSingle(coll, data, callback) {
    withDb(callback, function (db) {
        db
            .collection(coll)
            .insertOne(data, {}, callback);
    });
}
exports.db_insertSingle = db_insertSingle;
;
function db_insertMany(coll, data, callback) {
    withDb(callback, function (db) {
        db
            .collection(coll)
            .insertMany(data, {}, callback);
    });
}
exports.db_insertMany = db_insertMany;
;
function db_updateSingle(coll, data, callback) {
    withDb(callback, function (db) {
        if (data._id == null)
            return callback('<mongo:update> invalid ID');
        var query = {
            _id: DriverUtils_1.DriverUtils.ensureObjectID(data._id)
        };
        var patch = patchObject_1.obj_partialToUpdateQuery(data);
        DriverCore_1.core.updateSingle(db, coll, query, patch, callback);
    });
}
exports.db_updateSingle = db_updateSingle;
;
function db_updateMany(coll, array, callback) {
    withDb(callback, function (db) {
        var batch = array.map(function (x) {
            return [
                { _id: DriverUtils_1.DriverUtils.ensureObjectID(x._id) },
                x
            ];
        });
        DriverCore_1.core.updateMany(db, coll, batch, callback);
    });
}
exports.db_updateMany = db_updateMany;
;
function db_updateManyBy(coll, finder, array, callback) {
    withDb(callback, function (db) {
        var batch = array.map(function (x) {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        DriverCore_1.core.updateMany(db, coll, batch, callback);
    });
}
exports.db_updateManyBy = db_updateManyBy;
;
function db_upsertManyBy(coll, finder, array, callback) {
    withDb(callback, function (db) {
        var batch = array.map(function (x) {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        DriverCore_1.core.upsertMany(db, coll, batch, callback);
    });
}
exports.db_upsertManyBy = db_upsertManyBy;
;
function db_upsertSingleBy(coll, finder, x, callback) {
    withDb(callback, function (db) {
        DriverCore_1.core.upsertSingle(db, coll, DriverUtils_1.DriverUtils.getFindQuery(finder, x), x, callback);
    });
}
exports.db_upsertSingleBy = db_upsertSingleBy;
;
function db_patchSingle(coll, id, patch, callback) {
    withDb(callback, function (db) {
        var query = { _id: DriverUtils_1.DriverUtils.ensureObjectID(id) };
        DriverCore_1.core.updateSingle(db, coll, query, patch, callback);
    });
}
exports.db_patchSingle = db_patchSingle;
;
function db_patchSingleBy(coll, query, patch, callback) {
    withDb(callback, function (db) {
        DriverCore_1.core.updateSingle(db, coll, query, patch, callback);
    });
}
exports.db_patchSingleBy = db_patchSingleBy;
;
function db_remove(coll, query, isSingle, callback) {
    withDb(callback, function (db) {
        query = queryToMongo(query);
        var fn = isSingle
            ? DriverCore_1.core.removeSingle
            : DriverCore_1.core.removeMany;
        fn(db, coll, query, callback);
    });
}
exports.db_remove = db_remove;
;
function db_ensureIndexes(collection, indexes, callback) {
    withDb(callback, function (db) {
        var coll = db.collection(collection);
        coll.createIndexes(indexes, callback);
    });
}
exports.db_ensureIndexes = db_ensureIndexes;
;
function db_getMongo() {
    return DriverCore_1.core.getMongoLib();
}
exports.db_getMongo = db_getMongo;
;
var queryToMongo = function (query) {
    if (query == null)
        return query;
    if (query.hasOwnProperty('$query') || query.hasOwnProperty('$limit'))
        return query;
    if (query.hasOwnProperty('_id'))
        query._id = DriverUtils_1.DriverUtils.ensureObjectID(query._id);
    var comparer = {
        62: {
            // >
            0: '$gt',
            // >=
            61: '$gte'
        },
        60: {
            // <
            0: '$lt',
            // <=
            61: '$lte'
        }
    };
    for (var key in query) {
        var val = query[key], c;
        if (typeof val === 'string') {
            c = val.charCodeAt(0);
            switch (c) {
                case 62:
                case 60:
                    // >
                    var compare = comparer[c]['0'];
                    if (val.charCodeAt(1) === 61) {
                        // =
                        compare = comparer[c]['61'];
                        val = val.substring(2);
                    }
                    else {
                        val = val.substring(1);
                    }
                    query[key] = {};
                    query[key][compare] = parseFloat(val);
                    continue;
            }
            ;
        }
    }
    return query;
};
var createDbDelegate = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var cb = args[args.length - 1];
    return function (error, db) {
        if (error)
            return cb(error);
        return fn.call.apply(fn, __spreadArrays([null, db], args));
    };
};
//# sourceMappingURL=Driver.js.map
//# sourceMappingURL=Driver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_Driver) && isObject(module.exports)) {
		Object.assign(_src_mongo_Driver, module.exports);
		return;
	}
	_src_mongo_Driver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoMeta;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var class_json_1 = require("class-json");
;
var MongoMeta;
(function (MongoMeta) {
    function pickModelMeta(mix) {
        return class_json_1.JsonUtils.pickModelMeta(mix);
    }
    MongoMeta.pickModelMeta = pickModelMeta;
    function resolveModelMeta(mix) {
        return class_json_1.JsonUtils.resolveModelMeta(mix);
    }
    MongoMeta.resolveModelMeta = resolveModelMeta;
    function getCollection(mix) {
        var meta = resolveModelMeta(mix);
        var name = meta.collection;
        if (name == null) {
            throw new Error("Collection not defined for the entity: " + meta.Type.name);
        }
        return name;
    }
    MongoMeta.getCollection = getCollection;
})(MongoMeta = exports.MongoMeta || (exports.MongoMeta = {}));
;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=MongoMeta.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_MongoMeta) && isObject(module.exports)) {
		Object.assign(_src_MongoMeta, module.exports);
		return;
	}
	_src_MongoMeta = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoEntity;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var class_json_1 = require("class-json");
var Driver_1 = _src_mongo_Driver;
var MongoMeta_1 = _src_MongoMeta;
var atma_utils_1 = require("atma-utils");
var utils_1 = _src_mongo_utils;
var patchObject_1 = _src_utils_patchObject;
var MongoEntity = /** @class */ (function (_super) {
    __extends(MongoEntity, _super);
    function MongoEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MongoEntity.fetch = function (query) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            var _this = this;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_findSingle, coll, query).then(function (json) {
                        if (json == null) {
                            return null;
                        }
                        return class_json_1.JsonConvert.fromJSON(json, { Type: _this });
                    })];
            });
        });
    };
    MongoEntity.fetchMany = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            var _this = this;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_findMany, coll, query, options).then(function (arr) {
                        return class_json_1.JsonConvert.fromJSON(arr, { Type: _this });
                    })];
            });
        });
    };
    MongoEntity.fetchManyPaged = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            var _this = this;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_findManyPaged, coll, query, options).then(function (result) {
                        return {
                            collection: class_json_1.JsonConvert.fromJSON(result.collection, { Type: _this }),
                            total: result.total
                        };
                    })];
            });
        });
    };
    MongoEntity.aggregateMany = function (pipeline, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_aggregate, coll, pipeline, options).then(function (arr) {
                        var _a;
                        return class_json_1.JsonConvert.fromJSON(arr, { Type: (_a = options) === null || _a === void 0 ? void 0 : _a.Type });
                    })];
            });
        });
    };
    MongoEntity.aggregateManyPaged = function (pipeline, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll, countPipeline, i, x, $facet;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                countPipeline = [];
                for (i = 0; i < pipeline.length; i++) {
                    x = pipeline[i];
                    if ('$sort' in x || '$skip' in x || '$limit' in x) {
                        continue;
                    }
                    countPipeline.push(x);
                }
                countPipeline.push({ $count: 'count' });
                $facet = {
                    $facet: {
                        collection: pipeline,
                        total: countPipeline
                    }
                };
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_aggregate, coll, $facet, options).then(function (resArr) {
                        var _a;
                        var doc = resArr[0];
                        return {
                            collection: class_json_1.JsonConvert.fromJSON(doc.collection, { Type: (_a = options) === null || _a === void 0 ? void 0 : _a.Type }),
                            total: doc.total[0].count
                        };
                    })];
            });
        });
    };
    MongoEntity.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_count, coll, query, null)];
            });
        });
    };
    MongoEntity.upsert = function (instance) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EntityMethods.save(instance)];
            });
        });
    };
    MongoEntity.upsertBy = function (finder, instance) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EntityMethods.saveBy(finder, instance, this)];
            });
        });
    };
    MongoEntity.upsertMany = function (arr) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EntityMethods.saveMany(arr)];
            });
        });
    };
    MongoEntity.upsertManyBy = function (finder, arr) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EntityMethods.upsertManyBy(finder, arr)];
            });
        });
    };
    MongoEntity.del = function (x) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.del(coll, x)];
            });
        });
    };
    MongoEntity.delMany = function (arr) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.delMany(coll, arr)];
            });
        });
    };
    MongoEntity.patch = function (instance, patch) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patch(coll, instance, patch)];
            });
        });
    };
    MongoEntity.patchBy = function (finder, patch) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patchBy(coll, finder, patch)];
            });
        });
    };
    MongoEntity.getCollection = function () {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_getCollection, coll)];
            });
        });
    };
    MongoEntity.getDb = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_getDb)];
            });
        });
    };
    MongoEntity.prototype.upsert = function () {
        return EntityMethods.save(this);
    };
    MongoEntity.prototype.del = function () {
        var coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.del(coll, this);
    };
    MongoEntity.prototype.patch = function (patch) {
        var coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, this, patch);
    };
    return MongoEntity;
}(class_json_1.Serializable));
exports.MongoEntity = MongoEntity;
function MongoEntityFor(Base) {
    return atma_utils_1.mixin(Base, MongoEntity);
}
exports.MongoEntityFor = MongoEntityFor;
var EntityMethods;
(function (EntityMethods) {
    function save(x) {
        var coll = MongoMeta_1.MongoMeta.getCollection(x);
        var json = class_json_1.JsonConvert.toJSON(x, { Type: x.constructor });
        var fn = json._id == null
            ? Driver_1.db_insertSingle
            : Driver_1.db_updateSingle;
        return utils_1.cb_toPromise(fn, coll, json).then(function (result) {
            var array = result.ops;
            if (array != null && x._id == null) {
                if (atma_utils_1.is_Array(array) && array.length === 1) {
                    x._id = array[0]._id;
                }
                else {
                    return Promise.reject('<mongo:insert-single> expected an array in callback');
                }
            }
            return x;
        });
    }
    EntityMethods.save = save;
    function saveBy(finder, x, Type) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var coll, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Type = (Type !== null && Type !== void 0 ? Type : x.constructor);
                        coll = MongoMeta_1.MongoMeta.getCollection(Type);
                        if (coll == null) {
                            return [2 /*return*/, Promise.reject(new Error("<class:patch> 'Collection' is not defined for " + Type.name))];
                        }
                        return [4 /*yield*/, utils_1.cb_toPromise(Driver_1.db_upsertSingleBy, coll, finder, x)];
                    case 1:
                        result = _b.sent();
                        if (((_a = result.upsertedId) === null || _a === void 0 ? void 0 : _a._id) && x._id == null) {
                            x._id = result.upsertedId._id;
                        }
                        return [2 /*return*/, x];
                }
            });
        });
    }
    EntityMethods.saveBy = saveBy;
    function saveMany(arr) {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }
        var Type = arr[0].constructor;
        var coll = MongoMeta_1.MongoMeta.getCollection(Type);
        var insert = [], insertIndexes = [], update = [];
        for (var i = 0; i < arr.length; i++) {
            var x = arr[i];
            var json = class_json_1.JsonConvert.toJSON(x, { Type: Type });
            if (x._id == null) {
                insert.push(json);
                insertIndexes.push(i);
                continue;
            }
            update.push(json);
        }
        var awaitCount = insert.length > 0 && update.length > 0 ? 2 : 1;
        var dfr = new atma_utils_1.class_Dfr;
        var listener = utils_1.cb_createListener(awaitCount, function (error) {
            if (error) {
                dfr.reject(error);
                return;
            }
            dfr.resolve(arr);
        });
        if (insert.length) {
            Driver_1.db_insertMany(coll, insert, function (error, result) {
                if (result != null) {
                    var ops = result.ops;
                    if (atma_utils_1.is_Array(ops) === false) {
                        listener(new Error('<mongo:bulk insert> array expected'));
                        return;
                    }
                    if (ops.length !== insertIndexes.length) {
                        listener(new Error("<mongo:bulk insert> count missmatch: " + ops.length + "/" + insertIndexes.length));
                        return;
                    }
                    /**
                    *   @TODO make sure if mongodb returns an array of inserted documents
                    *   in the same order as it was passed to insert method
                    */
                    for (var i = 0; i < insertIndexes.length; i++) {
                        var index = insertIndexes[i];
                        arr[index]._id = ops[i]._id;
                    }
                }
                listener(error);
            });
        }
        if (update.length) {
            Driver_1.db_updateMany(coll, update, listener);
        }
        return dfr;
    }
    EntityMethods.saveMany = saveMany;
    function upsertManyBy(finder, arr) {
        return __awaiter(this, void 0, Promise, function () {
            var Type, coll, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (arr == null || arr.length === 0) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        Type = arr[0].constructor;
                        coll = MongoMeta_1.MongoMeta.getCollection(Type);
                        if (coll == null) {
                            return [2 /*return*/, Promise.reject(new Error("<class:patch> 'Collection' is not defined for " + Type.name))];
                        }
                        return [4 /*yield*/, utils_1.cb_toPromise(Driver_1.db_upsertManyBy, coll, finder, arr)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, arr];
                }
            });
        });
    }
    EntityMethods.upsertManyBy = upsertManyBy;
    function patchBy(coll, finder, patch) {
        return utils_1.cb_toPromise(Driver_1.db_patchSingleBy, coll, finder, patch);
    }
    EntityMethods.patchBy = patchBy;
    function patch(coll, x, patch) {
        var id = x._id;
        if (id == null) {
            return Promise.reject(new Error("<patch> 'id' is not defined for " + coll));
        }
        var update = patchObject_1.obj_partialToUpdateQuery(patch);
        patchObject_1.obj_patch(this, update);
        return utils_1.cb_toPromise(Driver_1.db_patchSingle, coll, id, update).then(function (_) { return x; });
    }
    EntityMethods.patch = patch;
    function del(coll, x) {
        if (coll == null) {
            return Promise.reject(new Error("Delete for " + x._id + " failed as Collection is not set"));
        }
        if (x._id == null) {
            return Promise.reject(new Error("Delete in " + coll + " failed as ID is undefined"));
        }
        return utils_1.cb_toPromise(Driver_1.db_remove, coll, x, true).then(function (x) {
            return x.result;
        });
    }
    EntityMethods.del = del;
    function delMany(coll, arr) {
        if (coll == null) {
            return Promise.reject(new Error("Delete many failed as collection is not set"));
        }
        var ids = [];
        for (var i = 0; i < arr.length; i++) {
            var x = arr[i];
            if (x._id) {
                ids.push(x._id);
            }
        }
        return utils_1.cb_toPromise(Driver_1.db_remove, coll, { _id: { $in: ids } }, false).then(function (x) {
            return x.result;
        });
    }
    EntityMethods.delMany = delMany;
})(EntityMethods || (EntityMethods = {}));
//# sourceMappingURL=MongoEntity.js.map
//# sourceMappingURL=MongoEntity.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_MongoEntity) && isObject(module.exports)) {
		Object.assign(_src_MongoEntity, module.exports);
		return;
	}
	_src_MongoEntity = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_IndexHandler;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var utils_1 = _src_mongo_utils;
var Driver_1 = _src_mongo_Driver;
var MongoMeta_1 = _src_MongoMeta;
var IndexHandler;
(function (IndexHandler) {
    var TYPES = [];
    function register(Type) {
        if (TYPES.includes(Type) === false) {
            TYPES.push(Type);
        }
    }
    IndexHandler.register = register;
    function ensure(Type, callback) {
        var meta = MongoMeta_1.MongoMeta.pickModelMeta(Type);
        if (meta == null || meta.indexes == null || meta.indexes.length === 0) {
            callback();
            return;
        }
        var coll = meta.collection;
        Driver_1.db_ensureIndexes(coll, meta.indexes, callback);
    }
    IndexHandler.ensure = ensure;
    function ensureAll(callback) {
        var imax = TYPES.length, listener = utils_1.cb_createListener(imax, callback), i = -1;
        while (++i < imax) {
            ensure(TYPES[i], listener);
        }
    }
    IndexHandler.ensureAll = ensureAll;
})(IndexHandler = exports.IndexHandler || (exports.IndexHandler = {}));
;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=IndexHandler.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_mongo_IndexHandler) && isObject(module.exports)) {
		Object.assign(_src_mongo_IndexHandler, module.exports);
		return;
	}
	_src_mongo_IndexHandler = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoIndexes;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var IndexHandler_1 = _src_mongo_IndexHandler;
var utils_1 = _src_mongo_utils;
var MongoIndexes;
(function (MongoIndexes) {
    function ensureAll() {
        return utils_1.cb_toPromise(IndexHandler_1.IndexHandler.ensureAll);
    }
    MongoIndexes.ensureAll = ensureAll;
})(MongoIndexes = exports.MongoIndexes || (exports.MongoIndexes = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=MongoIndexes.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_MongoIndexes) && isObject(module.exports)) {
		Object.assign(_src_MongoIndexes, module.exports);
		return;
	}
	_src_MongoIndexes = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoUtils;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var DriverUtils_1 = _src_mongo_DriverUtils;
var MongoUtils;
(function (MongoUtils) {
    function toObjectID(id) {
        return DriverUtils_1.DriverUtils.ensureObjectID(id);
    }
    MongoUtils.toObjectID = toObjectID;
    ;
})(MongoUtils = exports.MongoUtils || (exports.MongoUtils = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=MongoUtils.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_MongoUtils) && isObject(module.exports)) {
		Object.assign(_src_MongoUtils, module.exports);
		return;
	}
	_src_MongoUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_decos;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var MongoMeta_1 = _src_MongoMeta;
var atma_utils_1 = require("atma-utils");
var IndexHandler_1 = _src_mongo_IndexHandler;
function table(name) {
    return function (target) {
        if (typeof target !== 'function') {
            throw new Error("Decorator for table " + name + " must be called on class Ctor");
        }
        var meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        meta.collection = name;
        return target;
    };
}
exports.table = table;
function index(arg1, arg2, arg3) {
    return function (target, propertyKey, descriptor) {
        var _a;
        var meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        if (meta.indexes == null) {
            meta.indexes = [];
        }
        var indexes = meta.indexes;
        var forProp = typeof propertyKey === 'string';
        if (forProp) {
            var name_1;
            var type = void 0;
            var opts = void 0;
            var t1 = arg1 == null ? 'null' : typeof arg1;
            var t2 = arg2 == null ? 'null' : typeof arg2;
            var t3 = arg3 == null ? 'null' : typeof arg3;
            if (t1 === 'object') {
                opts = arg1;
            }
            if (t1 === 'string') {
                name_1 = arg1;
            }
            if (t2 === 'object') {
                opts = arg2;
            }
            if (t2 === 'string' || t2 === 'number') {
                type = arg2;
            }
            if (t3 === 'object') {
                opts = arg3;
            }
            name_1 = (name_1 !== null && name_1 !== void 0 ? name_1 : propertyKey);
            type = (type !== null && type !== void 0 ? type : 1);
            var idx = name_1 ? indexes.find(function (x) { return x.name === name_1; }) : null;
            if (idx == null) {
                idx = {
                    name: name_1,
                    key: {}
                };
                indexes.push(idx);
            }
            idx.key = atma_utils_1.obj_extend(idx.key, (_a = {}, _a[propertyKey] = type, _a));
            atma_utils_1.obj_extend(idx, opts);
            IndexHandler_1.IndexHandler.register(typeof target === 'function' ? target : target.constructor);
            return;
        }
        var raw = arg1;
        indexes.push(raw);
        IndexHandler_1.IndexHandler.register(typeof target === 'function' ? target : target.constructor);
    };
}
exports.index = index;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=decos.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_decos) && isObject(module.exports)) {
		Object.assign(_src_decos, module.exports);
		return;
	}
	_src_decos = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
exports.__esModule = true;
var MongoEntity_1 = _src_MongoEntity;
exports.MongoEntity = MongoEntity_1.MongoEntity;
var MongoIndexes_1 = _src_MongoIndexes;
exports.MongoIndexes = MongoIndexes_1.MongoIndexes;
var Settings_1 = _src_mongo_Settings;
exports.MongoSettings = Settings_1.MongoSettings;
var MongoUtils_1 = _src_MongoUtils;
exports.MongoUtils = MongoUtils_1.MongoUtils;
var MongoMeta_1 = _src_MongoMeta;
exports.MongoMeta = MongoMeta_1.MongoMeta;
var decos_1 = _src_decos;
exports.table = decos_1.table;
exports.index = decos_1.index;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map
}));
// end:source ./UMD.js
