
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
var _src_MongoProfiler = {};
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
var _src_utils_projection = {};

// source ./ModuleSimplified.js
var _src_mongo_Settings;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.setts_getDbName = exports.setts_getParams = exports.setts_getConnectionString = exports.setts_define = exports.MongoSettings = void 0;
var DefaultServer = {
    name: 'default',
    ip: '127.0.0.1',
    port: 27017,
    db: null,
    connection: null,
    params: {
        auto_reconnect: true,
        native_parser: true,
        useUnifiedTopology: true,
        writeConcern: {
            w: 1
        }
    }
};
var Servers = {};
var MongoSettings;
(function (MongoSettings) {
    function define(setts) {
        setts_define(setts);
    }
    MongoSettings.define = define;
})(MongoSettings = exports.MongoSettings || (exports.MongoSettings = {}));
function setts_define(setts) {
    var _a, _b, _c, _d, _e, _f;
    if (Array.isArray(setts)) {
        setts.forEach(function (x) { return setts_define(x); });
        return;
    }
    var name = (_a = setts.name) !== null && _a !== void 0 ? _a : 'default';
    var target = name === 'default' ? DefaultServer : Servers[name];
    if (target == null) {
        target = Servers[name] = __assign(__assign({}, DefaultServer), { name: setts === null || setts === void 0 ? void 0 : setts.name });
    }
    target.ip = (_b = setts.ip) !== null && _b !== void 0 ? _b : target.ip;
    target.port = (_c = setts.port) !== null && _c !== void 0 ? _c : target.port;
    target.db = (_d = setts.db) !== null && _d !== void 0 ? _d : target.db;
    target.params = (_e = setts.params) !== null && _e !== void 0 ? _e : target.params;
    target.connection = (_f = setts.connection) !== null && _f !== void 0 ? _f : target.connection;
    if (name !== 'default' && setts["default"]) {
        setts_define(__assign(__assign({}, setts), { name: null }));
    }
}
exports.setts_define = setts_define;
;
function setts_getConnectionString(server) {
    if (server === void 0) { server = 'default'; }
    var setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    if (setts == null) {
        throw new Error("Server " + server + " options are not set");
    }
    if (setts.connection != null) {
        return setts.connection;
    }
    if (setts.db == null) {
        throw new Error("Database for " + server + " is not set");
    }
    var ip = setts.ip, port = setts.port, db = setts.db;
    return "mongodb://" + ip + ":" + port + "/" + db;
}
exports.setts_getConnectionString = setts_getConnectionString;
function setts_getParams(server) {
    if (server === void 0) { server = 'default'; }
    var setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    return setts.params;
}
exports.setts_getParams = setts_getParams;
function setts_getDbName(server) {
    if (server === void 0) { server = 'default'; }
    var setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    return setts.db;
}
exports.setts_getDbName = setts_getDbName;
//# sourceMappingURL=Settings.js.map
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
exports.arr_remove = void 0;
function arr_remove(array, fn) {
    if (array == null) {
        return;
    }
    for (var i = 0; i < array.length; i++) {
        if (fn(array[i]) === true) {
            array.splice(i, 1);
            i--;
        }
    }
}
exports.arr_remove = arr_remove;
;
//# sourceMappingURL=array.js.map
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
exports.obj_isPatch = exports.obj_patchValidate = exports.obj_flattern = exports.obj_partialToUpdateQuery = exports.obj_patch = void 0;
var atma_utils_1 = require("atma-utils");
var array_1 = _src_utils_array;
function obj_patch(obj, patch) {
    for (var key in patch) {
        var patcher = patches[key];
        if (patcher) {
            var walkerFn = patcher[0], modifierFn = patcher[1];
            walkerFn(obj, patch[key], modifierFn);
        }
        else {
            console.error('Unknown or not implemented patcher', key);
        }
    }
    return obj;
}
exports.obj_patch = obj_patch;
;
function obj_partialToUpdateQuery(data, isOptional, isDeep) {
    if (obj_isPatch(data)) {
        return data;
    }
    var hasData = false;
    var $set = Object.create(null);
    for (var key in data) {
        if (key === '_id') {
            continue;
        }
        var val = data[key];
        if (typeof val === 'function') {
            // skip any methods
            continue;
        }
        hasData = true;
        if (isDeep === true && atma_utils_1.is_rawObject(val)) {
            obj_flattern($set, val, key);
            continue;
        }
        $set[key] = val;
    }
    if (hasData === false && isOptional === true) {
        return null;
    }
    return { $set: $set };
}
exports.obj_partialToUpdateQuery = obj_partialToUpdateQuery;
function obj_flattern(target, value, path) {
    if (path === void 0) { path = null; }
    if (!atma_utils_1.is_rawObject(value)) {
        target[path] = value;
        return;
    }
    for (var key in value) {
        var p = path != null ? path + "." + key : key;
        obj_flattern(target, value[key], p);
    }
    return target;
}
exports.obj_flattern = obj_flattern;
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
            for (var inner in patch[key]) {
                return true;
            }
        }
    }
    return false;
}
exports.obj_isPatch = obj_isPatch;
;
// === private
function walk_mutator(obj, data, mutatorFn) {
    for (var key in data) {
        mutatorFn(atma_utils_1.obj_getProperty(obj, key), data[key], key, obj);
    }
}
function walk_modifier(obj, data, fn) {
    for (var key in data) {
        atma_utils_1.obj_setProperty(obj, key, fn(atma_utils_1.obj_getProperty(obj, key), data[key], key));
    }
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
function arr_push(currentVal, mix, prop, obj) {
    if (currentVal == null) {
        obj[prop] = [mix];
        return;
    }
    if (mix.hasOwnProperty('$each')) {
        for (var i = 0, imax = mix.$each.length; i < imax; i++) {
            currentVal.push(mix.$each[i]);
        }
        return;
    }
    currentVal.push(mix);
}
function arr_pop(currentVal, mix, prop) {
    currentVal === null || currentVal === void 0 ? void 0 : currentVal[mix > 0 ? 'pop' : 'shift']();
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
    '$push': [walk_mutator, arr_push],
    '$pop': [walk_mutator, arr_pop],
    '$pull': [walk_mutator, arr_pull],
    '$inc': [walk_modifier, val_inc],
    '$set': [walk_modifier, val_set],
    '$unset': [walk_modifier, val_unset],
    '$bit': [walk_modifier, val_bit]
};
//# sourceMappingURL=patchObject.js.map
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
exports.core = void 0;
var Settings_1 = _src_mongo_Settings;
var patchObject_1 = _src_utils_patchObject;
var core;
(function (core) {
    var mongoLib = null;
    function getDb(server) {
        return Connections.getDb(server);
    }
    core.getDb = getDb;
    ;
    function connect(server, cb) {
        Connections.connect(server, null, cb);
    }
    core.connect = connect;
    ;
    function getMongoLib() {
        return mongoLib !== null && mongoLib !== void 0 ? mongoLib : (mongoLib = require('mongodb'));
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
    function patchMany(db, coll, array /*[[query, data]]*/, callback) {
        var ops = array
            .map(function (op) {
            var filter = op[0], data = op[1];
            var patch = patchObject_1.obj_partialToUpdateQuery(data, true);
            if (patch == null) {
                return null;
            }
            return {
                updateOne: {
                    filter: filter,
                    update: patch,
                    upsert: false
                }
            };
        })
            .filter(function (x) { return x != null; });
        if (ops.length === 0) {
            callback(null, {
                ok: true,
                nInserted: 0,
                nModified: 0,
                nMatched: 0,
                nRemoved: 0,
                nUpserted: 0
            });
            return;
        }
        bulkWrite(db, coll, ops, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }
    core.patchMany = patchMany;
    ;
    function updateSingle(db, coll, query, data, callback /*<error, stats>*/) {
        var update = patchObject_1.obj_partialToUpdateQuery(data, true);
        if (update == null) {
            callback(null, {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0
                }
            });
            return;
        }
        db
            .collection(coll)
            .updateOne(query, update, opt_updateSingle, callback);
    }
    core.updateSingle = updateSingle;
    ;
    function updateMultiple(db, coll, query, data, callback /*<error, stats>*/) {
        var update = patchObject_1.obj_partialToUpdateQuery(data, true);
        if (update == null) {
            callback(null, {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0
                }
            });
            return;
        }
        db
            .collection(coll)
            .updateMany(query, update, opt_updateMultiple, callback);
    }
    core.updateMultiple = updateMultiple;
    ;
    function updateMany(db, coll, array /*[[query, data]]*/, callback) {
        var ops = array
            .map(function (op) {
            var filter = op[0], data = op[1];
            var patch = patchObject_1.obj_partialToUpdateQuery(data, true);
            if (patch == null) {
                return null;
            }
            return {
                updateOne: {
                    filter: filter,
                    update: patch,
                    upsert: false
                }
            };
        })
            .filter(function (x) { return x != null; });
        if (ops.length === 0) {
            callback(null, {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0
                }
            });
            return;
        }
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
var opt_updateMultiple = {
    upsert: false,
    multi: true
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
                _this.connecting = false;
                _this.error = error;
                _this.client = client;
                _this.db = client === null || client === void 0 ? void 0 : client.db(Settings_1.setts_getDbName());
                var arr = _this.listeners;
                for (var i = 0; i < arr.length; i++) {
                    arr[i](_this.error, _this.db);
                }
            });
        };
        return Connection;
    }());
    function getDb(server) {
        var _a;
        if (server == null) {
            return _connection === null || _connection === void 0 ? void 0 : _connection.db;
        }
        return (_a = _connections[server]) === null || _a === void 0 ? void 0 : _a.db;
    }
    Connections.getDb = getDb;
    function connect(server, params, callback) {
        if (server === void 0) { server = null; }
        if (params === void 0) { params = null; }
        var connection = server == null ? _connection : _connections[server];
        if (connection) {
            connection.connect(callback);
            return;
        }
        var _url = Settings_1.setts_getConnectionString(server);
        var _params = params !== null && params !== void 0 ? params : Settings_1.setts_getParams(server);
        connection = new Connection(_url, _params);
        _connections[server] = connection;
        _connection = _connection !== null && _connection !== void 0 ? _connection : connection;
        connection.connect(callback);
    }
    Connections.connect = connect;
    ;
})(Connections || (Connections = {}));
//# sourceMappingURL=DriverCore.js.map
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
exports.cb_toPromise = exports.cb_completeDelegate = exports.cb_createListener = void 0;
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
//# sourceMappingURL=utils.js.map
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
exports.DriverUtils = void 0;
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
        if (typeof finder === 'function') {
            return finder(x);
        }
        return finder;
    }
    DriverUtils.getFindQuery = getFindQuery;
    function ensureObjectID(value) {
        if (value == null) {
            return value;
        }
        var ObjectID = DriverCore_1.core.getMongoLib().ObjectID;
        if (typeof value === 'string' && value.length === 24) {
            return new ObjectID(value);
        }
        if (value instanceof ObjectID) {
            return value;
        }
        var $in = value.$in;
        if ($in != null) {
            for (var i = 0; i < $in.length; i++) {
                $in[i] = ensureObjectID($in[i]);
            }
        }
        return value;
    }
    DriverUtils.ensureObjectID = ensureObjectID;
})(DriverUtils = exports.DriverUtils || (exports.DriverUtils = {}));
//# sourceMappingURL=DriverUtils.js.map
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
exports.core_profiler_toggle = exports.core_profiler_getData = void 0;
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
//# sourceMappingURL=DriverProfiler.js.map
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.db_getMongo = exports.db_ensureIndexes = exports.db_remove = exports.db_patchMany = exports.db_patchMultipleBy = exports.db_patchSingleBy = exports.db_patchSingle = exports.db_upsertSingleBy = exports.db_upsertManyBy = exports.db_updateManyBy = exports.db_updateMany = exports.db_updateSingle = exports.db_insertMany = exports.db_insertSingle = exports.db_insert = exports.db_count = exports.db_aggregate = exports.db_findManyPaged = exports.db_findMany = exports.db_findSingle = exports.db_resolveDb = exports.db_getDb = exports.db_resolveCollection = exports.db_getCollection = void 0;
var DriverCore_1 = _src_mongo_DriverCore;
var utils_1 = _src_mongo_utils;
var DriverUtils_1 = _src_mongo_DriverUtils;
var DriverProfiler_1 = _src_mongo_DriverProfiler;
__createBinding(exports, DriverProfiler_1, "core_profiler_getData", "db_profiler_getData");
var DriverProfiler_2 = _src_mongo_DriverProfiler;
__createBinding(exports, DriverProfiler_2, "core_profiler_toggle", "db_profiler_toggle");
function withDb(onError, server, fn) {
    var db = DriverCore_1.core.getDb(server);
    if (db == null) {
        DriverCore_1.core.connect(server, function (err, db) {
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
function db_getCollection(meta, cb) {
    withDb(cb, meta.server, function (db) {
        var coll = db.collection(meta.collection);
        if (coll == null) {
            return cb(new Error("<mongo> Collection Not Found: " + meta));
        }
        cb(null, coll);
    });
}
exports.db_getCollection = db_getCollection;
;
function db_resolveCollection(meta) {
    return utils_1.cb_toPromise(db_getCollection, meta);
}
exports.db_resolveCollection = db_resolveCollection;
;
function db_getDb(server, callback) {
    withDb(callback, server, function (db) {
        callback(null, db);
    });
}
exports.db_getDb = db_getDb;
;
function db_resolveDb(server) {
    return utils_1.cb_toPromise(db_getDb, server);
}
exports.db_resolveDb = db_resolveDb;
;
function db_findSingle(coll, query, options, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.findSingle(db, coll.collection, queryToMongo(query), options, callback);
    });
}
exports.db_findSingle = db_findSingle;
;
function db_findMany(coll, query, options, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.findMany(db, coll.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_findMany = db_findMany;
;
function db_findManyPaged(coll, query, options, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.findManyPaged(db, coll.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_findManyPaged = db_findManyPaged;
;
function db_aggregate(coll, pipeline, options, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.aggregate(db, coll.collection, pipeline, options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_aggregate = db_aggregate;
;
function db_count(coll, query, options, callback) {
    if (options === void 0) { options = null; }
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.count(db, coll.collection, query, options, callback);
    });
}
exports.db_count = db_count;
;
function db_insert(coll, data, callback) {
    withDb(callback, coll.server, function (db) {
        db
            .collection(coll.collection)
            .insert(data, {}, callback);
    });
}
exports.db_insert = db_insert;
;
function db_insertSingle(coll, data, callback) {
    withDb(callback, coll.server, function (db) {
        db
            .collection(coll.collection)
            .insertOne(data, {}, callback);
    });
}
exports.db_insertSingle = db_insertSingle;
;
function db_insertMany(coll, data, callback) {
    withDb(callback, coll.server, function (db) {
        db
            .collection(coll.collection)
            .insertMany(data, {}, callback);
    });
}
exports.db_insertMany = db_insertMany;
;
function db_updateSingle(coll, data, callback) {
    withDb(callback, coll.server, function (db) {
        if (data._id == null)
            return callback('<mongo:update> invalid ID');
        var query = {
            _id: DriverUtils_1.DriverUtils.ensureObjectID(data._id)
        };
        DriverCore_1.core.updateSingle(db, coll.collection, query, data, callback);
    });
}
exports.db_updateSingle = db_updateSingle;
;
function db_updateMany(coll, array, callback) {
    withDb(callback, coll.server, function (db) {
        var batch = array.map(function (x) {
            return [
                { _id: DriverUtils_1.DriverUtils.ensureObjectID(x._id) },
                x
            ];
        });
        DriverCore_1.core.updateMany(db, coll.collection, batch, callback);
    });
}
exports.db_updateMany = db_updateMany;
;
function db_updateManyBy(coll, finder, array, callback) {
    withDb(callback, coll.server, function (db) {
        var batch = array.map(function (x) {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        DriverCore_1.core.updateMany(db, coll.collection, batch, callback);
    });
}
exports.db_updateManyBy = db_updateManyBy;
;
function db_upsertManyBy(coll, finder, array, callback) {
    withDb(callback, coll.server, function (db) {
        var batch = array.map(function (x) {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        DriverCore_1.core.upsertMany(db, coll.collection, batch, callback);
    });
}
exports.db_upsertManyBy = db_upsertManyBy;
;
function db_upsertSingleBy(coll, finder, x, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.upsertSingle(db, coll.collection, DriverUtils_1.DriverUtils.getFindQuery(finder, x), x, callback);
    });
}
exports.db_upsertSingleBy = db_upsertSingleBy;
;
function db_patchSingle(coll, id, patch, callback) {
    withDb(callback, coll.server, function (db) {
        var query = { _id: DriverUtils_1.DriverUtils.ensureObjectID(id) };
        DriverCore_1.core.updateSingle(db, coll.collection, query, patch, callback);
    });
}
exports.db_patchSingle = db_patchSingle;
;
function db_patchSingleBy(coll, query, patch, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.updateSingle(db, coll.collection, query, patch, callback);
    });
}
exports.db_patchSingleBy = db_patchSingleBy;
;
function db_patchMultipleBy(coll, query, patch, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.updateMultiple(db, coll.collection, query, patch, callback);
    });
}
exports.db_patchMultipleBy = db_patchMultipleBy;
;
function db_patchMany(coll, arr, callback) {
    withDb(callback, coll.server, function (db) {
        DriverCore_1.core.patchMany(db, coll.collection, arr, callback);
    });
}
exports.db_patchMany = db_patchMany;
function db_remove(coll, query, isSingle, callback) {
    withDb(callback, coll.server, function (db) {
        query = queryToMongo(query);
        var fn = isSingle
            ? DriverCore_1.core.removeSingle
            : DriverCore_1.core.removeMany;
        fn(db, coll.collection, query, callback);
    });
}
exports.db_remove = db_remove;
;
function db_ensureIndexes(coll, indexes, callback) {
    withDb(callback, coll.server, function (db) {
        var dbCollection = db.collection(coll.collection);
        dbCollection.createIndexes(indexes, callback);
    });
}
exports.db_ensureIndexes = db_ensureIndexes;
;
function db_getMongo() {
    return DriverCore_1.core.getMongoLib();
}
exports.db_getMongo = db_getMongo;
;
var COMPARER = {
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
function queryToMongo(query) {
    if (query == null) {
        return query;
    }
    if ('$query' in query || '$limit' in query) {
        return query;
    }
    if ('_id' in query) {
        query._id = DriverUtils_1.DriverUtils.ensureObjectID(query._id);
    }
    for (var key in query) {
        var val = query[key];
        if (typeof val === 'string') {
            var c = val.charCodeAt(0);
            switch (c) {
                case 62:
                case 60:
                    // >
                    var compare = COMPARER[c]['0'];
                    if (val.charCodeAt(1) === 61) {
                        // =
                        compare = COMPARER[c]['61'];
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
}
;
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
exports.MongoMeta = void 0;
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
        if (meta.collection == null) {
            throw new Error("Collection not defined for the entity: " + meta.Type.name);
        }
        return meta;
    }
    MongoMeta.getCollection = getCollection;
})(MongoMeta = exports.MongoMeta || (exports.MongoMeta = {}));
;
//# sourceMappingURL=MongoMeta.js.map
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
var _src_utils_projection;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
exports.ProjectionUtil = void 0;
var ProjectionUtil;
(function (ProjectionUtil) {
    function handleOpts(opts) {
        if (opts === null || opts === void 0 ? void 0 : opts.projection) {
            opts.projection = flattern(opts.projection);
        }
        return opts;
    }
    ProjectionUtil.handleOpts = handleOpts;
    function flattern(projection) {
        var obj = Object.create(null);
        flatternByKey('', projection, obj);
        return obj;
    }
    ProjectionUtil.flattern = flattern;
    function flatternByKey(path, source, out) {
        var handled = false;
        for (var key in source) {
            if (handled === false && key === '$slice') {
                out[path] = source;
                return;
            }
            handled = true;
            var val = source[key];
            var pathNext = key;
            if (path) {
                pathNext = path + "." + key;
            }
            if (val == null || typeof val !== 'object') {
                out[pathNext] = val;
                continue;
            }
            flatternByKey(pathNext, val, out);
        }
    }
})(ProjectionUtil = exports.ProjectionUtil || (exports.ProjectionUtil = {}));
//# sourceMappingURL=projection.js.map
//# sourceMappingURL=projection.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_projection) && isObject(module.exports)) {
		Object.assign(_src_utils_projection, module.exports);
		return;
	}
	_src_utils_projection = module.exports;
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
exports.MongoEntityFor = exports.MongoEntity = void 0;
var class_json_1 = require("class-json");
var Driver_1 = _src_mongo_Driver;
var MongoMeta_1 = _src_MongoMeta;
var atma_utils_1 = require("atma-utils");
var utils_1 = _src_mongo_utils;
var patchObject_1 = _src_utils_patchObject;
var projection_1 = _src_utils_projection;
// type PickProjection<T, K extends keyof T> = {
//     [P in K]:
//         T[P] extends (Array<infer TArr> | Date)
//         ? (T[P])
//         : (T[P] extends object ? PickProjection<T[P], keyof T[P]> : T[P])
// };
var MongoEntity = /** @class */ (function (_super) {
    __extends(MongoEntity, _super);
    function MongoEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MongoEntity.fetch = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            var _this = this;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_findSingle, coll, query, options).then(function (json) {
                        if (json == null) {
                            return null;
                        }
                        return class_json_1.JsonConvert.fromJSON(json, { Type: _this });
                    })];
            });
        });
    };
    MongoEntity.fetchPartial = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetch(query, projection_1.ProjectionUtil.handleOpts(options))];
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
    MongoEntity.fetchManyPartial = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchMany(query, projection_1.ProjectionUtil.handleOpts(options))];
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
    MongoEntity.fetchManyPagedPartial = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchManyPaged(query, projection_1.ProjectionUtil.handleOpts(options))];
            });
        });
    };
    MongoEntity.aggregateMany = function (pipeline, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_aggregate, coll, pipeline, options).then(function (arr) {
                        return class_json_1.JsonConvert.fromJSON(arr, { Type: options === null || options === void 0 ? void 0 : options.Type });
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
                        var _a, _b;
                        var doc = resArr[0];
                        return {
                            collection: class_json_1.JsonConvert.fromJSON(doc.collection, { Type: options === null || options === void 0 ? void 0 : options.Type }),
                            total: (_b = (_a = doc.total[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0
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
    MongoEntity.del = function (entity) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.del(coll, entity)];
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
    MongoEntity.patchDeeply = function (instance, patch) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patch(coll, instance, patch, { deep: true })];
            });
        });
    };
    MongoEntity.patchMany = function (arr) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patchMany(coll, arr)];
            });
        });
    };
    /**
     * Find document by filter query, and patch it.
     */
    MongoEntity.patchDeeplyBy = function (finder, patch) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patchBy(coll, finder, patch, { deep: true })];
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
    MongoEntity.patchMultipleBy = function (finder, patch) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patchMultipleBy(coll, finder, patch)];
            });
        });
    };
    MongoEntity.patchMultipleDeeplyBy = function (finder, patch) {
        return __awaiter(this, void 0, Promise, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, EntityMethods.patchMultipleBy(coll, finder, patch, { deep: true })];
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
    MongoEntity.getDb = function (server) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.cb_toPromise(Driver_1.db_getDb, server)];
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
    MongoEntity.prototype.patch = function (patch, opts) {
        var coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, this, patch, /*isDeep*/ opts);
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
                        Type = Type !== null && Type !== void 0 ? Type : x.constructor;
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
    function patchBy(coll, finder, patch, opts) {
        var update = patchObject_1.obj_partialToUpdateQuery(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep);
        return utils_1.cb_toPromise(Driver_1.db_patchSingleBy, coll, finder, update);
    }
    EntityMethods.patchBy = patchBy;
    function patchMultipleBy(coll, finder, patch, opts) {
        var update = patchObject_1.obj_partialToUpdateQuery(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep);
        return utils_1.cb_toPromise(Driver_1.db_patchMultipleBy, coll, finder, update);
    }
    EntityMethods.patchMultipleBy = patchMultipleBy;
    function patch(coll, instance, patch, opts) {
        var id = instance._id;
        if (id == null) {
            return Promise.reject(new Error("<patch> '_id' is not defined for " + coll));
        }
        var update = patchObject_1.obj_partialToUpdateQuery(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep);
        patchObject_1.obj_patch(instance, update);
        return utils_1.cb_toPromise(Driver_1.db_patchSingle, coll, id, update).then(function (_) { return instance; });
    }
    EntityMethods.patch = patch;
    function patchMany(coll, arr, opts) {
        if (opts === null || opts === void 0 ? void 0 : opts.deep) {
            for (var i = 0; i < arr.length; i++) {
                arr[i][1] = patchObject_1.obj_partialToUpdateQuery(arr[i][1], false, /* deep */ true);
            }
        }
        return utils_1.cb_toPromise(Driver_1.db_patchMany, coll, arr);
    }
    EntityMethods.patchMany = patchMany;
    function del(coll, entity) {
        if (coll == null) {
            return Promise.reject(new Error("Delete for " + entity._id + " failed as Collection is not set"));
        }
        if (entity._id == null) {
            return Promise.reject(new Error("Delete in " + coll + " failed as ID is undefined"));
        }
        return utils_1.cb_toPromise(Driver_1.db_remove, coll, { _id: entity._id }, true).then(function (x) {
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
exports.IndexHandler = void 0;
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
        Driver_1.db_ensureIndexes(meta, meta.indexes, callback);
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
//# sourceMappingURL=IndexHandler.js.map
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
exports.MongoIndexes = void 0;
var IndexHandler_1 = _src_mongo_IndexHandler;
var utils_1 = _src_mongo_utils;
var MongoIndexes;
(function (MongoIndexes) {
    function ensureAll() {
        return utils_1.cb_toPromise(IndexHandler_1.IndexHandler.ensureAll);
    }
    MongoIndexes.ensureAll = ensureAll;
})(MongoIndexes = exports.MongoIndexes || (exports.MongoIndexes = {}));
//# sourceMappingURL=MongoIndexes.js.map
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
exports.MongoUtils = void 0;
var DriverUtils_1 = _src_mongo_DriverUtils;
var MongoUtils;
(function (MongoUtils) {
    function toObjectID(id) {
        return DriverUtils_1.DriverUtils.ensureObjectID(id);
    }
    MongoUtils.toObjectID = toObjectID;
    ;
})(MongoUtils = exports.MongoUtils || (exports.MongoUtils = {}));
//# sourceMappingURL=MongoUtils.js.map
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
var _src_MongoProfiler;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
exports.MongoProfiler = void 0;
var Driver_1 = _src_mongo_Driver;
var MongoProfiler;
(function (MongoProfiler) {
    function toggle(enabled, settings) {
        Driver_1.db_profiler_toggle(enabled, settings);
    }
    MongoProfiler.toggle = toggle;
    function getData() {
        return Driver_1.db_profiler_getData();
    }
    MongoProfiler.getData = getData;
})(MongoProfiler = exports.MongoProfiler || (exports.MongoProfiler = {}));
//# sourceMappingURL=MongoProfiler.js.map
//# sourceMappingURL=MongoProfiler.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_MongoProfiler) && isObject(module.exports)) {
		Object.assign(_src_MongoProfiler, module.exports);
		return;
	}
	_src_MongoProfiler = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_decos;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
exports.index = exports.table = void 0;
var MongoMeta_1 = _src_MongoMeta;
var atma_utils_1 = require("atma-utils");
var IndexHandler_1 = _src_mongo_IndexHandler;
function table(name, options) {
    return function (target) {
        if (typeof target !== 'function') {
            throw new Error("Decorator for table " + name + " must be called on class Ctor");
        }
        var meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        meta.collection = name;
        meta.server = options === null || options === void 0 ? void 0 : options.server;
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
            name_1 = name_1 !== null && name_1 !== void 0 ? name_1 : propertyKey;
            type = type !== null && type !== void 0 ? type : 1;
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
//# sourceMappingURL=decos.js.map
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
var MongoEntity_1 = _src_MongoEntity;
__createBinding(exports, MongoEntity_1, "MongoEntity");
var MongoIndexes_1 = _src_MongoIndexes;
__createBinding(exports, MongoIndexes_1, "MongoIndexes");
var Settings_1 = _src_mongo_Settings;
__createBinding(exports, Settings_1, "MongoSettings");
var MongoUtils_1 = _src_MongoUtils;
__createBinding(exports, MongoUtils_1, "MongoUtils");
var MongoMeta_1 = _src_MongoMeta;
__createBinding(exports, MongoMeta_1, "MongoMeta");
var MongoProfiler_1 = _src_MongoProfiler;
__createBinding(exports, MongoProfiler_1, "MongoProfiler");
var decos_1 = _src_decos;
__createBinding(exports, decos_1, "table");
__createBinding(exports, decos_1, "index");
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map
}));
// end:source ./UMD.js
