
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
var _src_types_Types = {};
var _src_utils_array = {};
var _src_utils_bson = {};
var _src_utils_patchObject = {};
var _src_utils_projection = {};

// source ./ModuleSimplified.js
var _src_mongo_Settings;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setts_getDbName = exports.setts_getParams = exports.setts_getConnectionString = exports.setts_define = exports.MongoSettings = void 0;
const DefaultServer = {
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
        },
    }
};
const Servers = {};
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
        setts.forEach(x => setts_define(x));
        return;
    }
    let name = (_a = setts.name) !== null && _a !== void 0 ? _a : 'default';
    let target = name === 'default' ? DefaultServer : Servers[name];
    if (target == null) {
        target = Servers[name] = { ...DefaultServer, name: setts === null || setts === void 0 ? void 0 : setts.name };
    }
    target.ip = (_b = setts.ip) !== null && _b !== void 0 ? _b : target.ip;
    target.port = (_c = setts.port) !== null && _c !== void 0 ? _c : target.port;
    target.db = (_d = setts.db) !== null && _d !== void 0 ? _d : target.db;
    target.params = (_e = setts.params) !== null && _e !== void 0 ? _e : target.params;
    target.connection = (_f = setts.connection) !== null && _f !== void 0 ? _f : target.connection;
    if (name !== 'default' && setts.default) {
        setts_define({
            ...setts,
            name: null
        });
    }
}
exports.setts_define = setts_define;
;
function setts_getConnectionString(server = 'default') {
    let setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    if (setts == null) {
        throw new Error(`Server ${server} options are not set`);
    }
    if (setts.connection != null) {
        return setts.connection;
    }
    if (setts.db == null) {
        throw new Error(`Database for ${server} is not set`);
    }
    let { ip, port, db } = setts;
    return `mongodb://${ip}:${port}/${db}`;
}
exports.setts_getConnectionString = setts_getConnectionString;
function setts_getParams(server = 'default') {
    let setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    return setts.params;
}
exports.setts_getParams = setts_getParams;
function setts_getDbName(server = 'default') {
    let setts = server == null || server === 'default' ? DefaultServer : Servers[server];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr_remove = void 0;
function arr_remove(array, fn) {
    if (array == null) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
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
var _src_MongoMeta;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoMeta = void 0;
const class_json_1 = require("class-json");
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
        let meta = resolveModelMeta(mix);
        if (meta.collection == null) {
            throw new Error(`Collection not defined for the entity: ${meta.Type.name}`);
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
var _src_utils_bson;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bson_prepairPartial = exports.bson_toEntity = exports.bson_fromEntity = void 0;
const atma_utils_1 = require("atma-utils");
const class_json_1 = require("class-json");
const MongoMeta_1 = _src_MongoMeta;
function bson_fromEntity(entity, Type) {
    Type = Type !== null && Type !== void 0 ? Type : entity.constructor;
    let json = class_json_1.JsonConvert.toJSON(entity, { Type });
    let meta = MongoMeta_1.MongoMeta.pickModelMeta(entity);
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToMongoTypes(json, meta.types);
    }
    return json;
}
exports.bson_fromEntity = bson_fromEntity;
function bson_toEntity(dbJson, Type) {
    let json = class_json_1.JsonConvert.fromJSON(dbJson, { Type });
    let meta = MongoMeta_1.MongoMeta.pickModelMeta(Type);
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToJsTypes(json, meta.types);
    }
    return json;
}
exports.bson_toEntity = bson_toEntity;
function bson_prepairPartial(json, meta) {
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToMongoTypes(json, meta.types);
    }
}
exports.bson_prepairPartial = bson_prepairPartial;
function mapToMongoTypes(json, types) {
    for (let i = 0; i < types.length; i++) {
        let propInfo = types[i];
        let current = atma_utils_1.obj_getProperty(json, propInfo.property);
        if (current != null) {
            let val = propInfo.TypeMongo(current);
            atma_utils_1.obj_setProperty(json, propInfo.property, val);
        }
    }
}
function mapToJsTypes(dbJson, types) {
    for (let i = 0; i < types.length; i++) {
        let propInfo = types[i];
        if (propInfo.TypeJS == null) {
            continue;
        }
        let current = atma_utils_1.obj_getProperty(dbJson, propInfo.property);
        if (current != null) {
            let val = propInfo.TypeJS(current.toString());
            atma_utils_1.obj_setProperty(dbJson, propInfo.property, val);
        }
    }
}
//# sourceMappingURL=bson.js.map
//# sourceMappingURL=bson.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_bson) && isObject(module.exports)) {
		Object.assign(_src_utils_bson, module.exports);
		return;
	}
	_src_utils_bson = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_patchObject;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_isPatch = exports.obj_patchValidate = exports.obj_flattern = exports.obj_partialToUpdateQuery = exports.obj_patch = void 0;
const atma_utils_1 = require("atma-utils");
const array_1 = _src_utils_array;
const bson_1 = _src_utils_bson;
function obj_patch(obj, patch) {
    for (const key in patch) {
        let patcher = patches[key];
        if (patcher) {
            let [walkerFn, modifierFn] = patcher;
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
function obj_partialToUpdateQuery(data, isOptional, isDeep, meta) {
    if (obj_isPatch(data)) {
        return data;
    }
    if (meta === null || meta === void 0 ? void 0 : meta.types) {
        bson_1.bson_prepairPartial(data, meta);
    }
    let hasData = false;
    let $set = Object.create(null);
    for (let key in data) {
        if (key === '_id') {
            continue;
        }
        let val = data[key];
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
    return { $set };
}
exports.obj_partialToUpdateQuery = obj_partialToUpdateQuery;
function obj_flattern(target, value, path = null) {
    if (!atma_utils_1.is_rawObject(value)) {
        target[path] = value;
        return;
    }
    for (let key in value) {
        let p = path != null ? `${path}.${key}` : key;
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
    for (let key in patches) {
        if (key in patch) {
            for (let inner in patch[key]) {
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
    for (const key in data) {
        mutatorFn(atma_utils_1.obj_getProperty(obj, key), data[key], key, obj);
    }
}
function walk_modifier(obj, data, fn) {
    for (var key in data) {
        atma_utils_1.obj_setProperty(obj, key, fn(atma_utils_1.obj_getProperty(obj, key), data[key], key));
    }
}
function fn_IoC(...fns) {
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
        for (let i = 0, imax = mix.$each.length; i < imax; i++) {
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
    '$bit': [walk_modifier, val_bit],
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const Settings_1 = _src_mongo_Settings;
const patchObject_1 = _src_utils_patchObject;
var core;
(function (core) {
    let mongoLib = null;
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
        let c = db.collection(coll);
        if (options == null) {
            return c.findOne(query, callback);
        }
        c.findOne(query, options, callback);
    }
    core.findSingle = findSingle;
    ;
    function findMany(db, coll, query, options, callback /*<error, array>*/) {
        let c = db.collection(coll);
        let cursor = c.find(query, options);
        cursor.toArray(callback);
    }
    core.findMany = findMany;
    ;
    function findManyPaged(db, coll, query, options, callback) {
        let c = db.collection(coll);
        let cursor = c.find(query, options);
        cursor.count(false, (error, total) => {
            if (error) {
                callback(error, null);
                return;
            }
            cursor.toArray((error, arr) => {
                if (error) {
                    callback(error, null);
                    return;
                }
                callback(null, {
                    collection: arr,
                    total
                });
            });
        });
    }
    core.findManyPaged = findManyPaged;
    ;
    function aggregate(db, coll, pipeline, options, callback /*<error, array>*/) {
        let c = db.collection(coll);
        let cursor = c.aggregate(pipeline, options);
        cursor.toArray(callback);
    }
    core.aggregate = aggregate;
    ;
    function upsertSingle(db, coll, query, data, callback) {
        let update = patchObject_1.obj_partialToUpdateQuery(data);
        db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle, callback);
    }
    core.upsertSingle = upsertSingle;
    ;
    function upsertMany(db, meta, array /*[[query, data]]*/, callback) {
        let ops = array.map(op => {
            return {
                updateOne: {
                    filter: op[0],
                    update: patchObject_1.obj_partialToUpdateQuery(op[1], null, null, meta),
                    upsert: true
                }
            };
        });
        bulkWrite(db, meta.collection, ops, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            /** when updates of existed documents occures there will be no _id field */
            let upserted = result.getUpsertedIds();
            for (let i = 0; i < upserted.length; i++) {
                let singleResult = upserted[i];
                let { index, _id } = singleResult;
                let x = array[index][1];
                if (x._id == null) {
                    x._id = _id;
                }
                else if (String(x._id) !== String(upserted[i])) {
                    callback(new Error(`Unexpected missmatch: ${x._id} != ${upserted[i]}`), null);
                    return;
                }
            }
            callback(err, result);
        });
    }
    core.upsertMany = upsertMany;
    ;
    function patchMany(db, meta, array /*[[query, data]]*/, callback) {
        let ops = array
            .map(op => {
            let [filter, data] = op;
            let patch = patchObject_1.obj_partialToUpdateQuery(data, true, null, meta);
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
            .filter(x => x != null);
        if (ops.length === 0) {
            callback(null, {
                ok: true,
                nInserted: 0,
                nModified: 0,
                nMatched: 0,
                nRemoved: 0,
                nUpserted: 0,
            });
            return;
        }
        bulkWrite(db, meta.collection, ops, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }
    core.patchMany = patchMany;
    ;
    function updateSingle(db, meta, query, data, callback /*<error, stats>*/) {
        let update = patchObject_1.obj_partialToUpdateQuery(data, true, null, meta);
        if (update == null) {
            callback(null, {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        db
            .collection(meta.collection)
            .updateOne(query, update, opt_updateSingle, callback);
    }
    core.updateSingle = updateSingle;
    ;
    function updateMultiple(db, meta, query, data, callback /*<error, stats>*/) {
        let update = patchObject_1.obj_partialToUpdateQuery(data, true, null, meta);
        if (update == null) {
            callback(null, {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        db
            .collection(meta.collection)
            .updateMany(query, update, opt_updateMultiple, callback);
    }
    core.updateMultiple = updateMultiple;
    ;
    function updateMany(db, meta, array /*[[query, data]]*/, callback) {
        let ops = array
            .map(op => {
            let [filter, data] = op;
            let patch = patchObject_1.obj_partialToUpdateQuery(data, true, null, meta);
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
            .filter(x => x != null);
        if (ops.length === 0) {
            callback(null, {
                result: {
                    ok: true,
                    n: 0,
                    nModified: 0,
                },
            });
            return;
        }
        bulkWrite(db, meta.collection, ops, callback);
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
const opt_upsertSingle = {
    upsert: true,
    multi: false,
};
const opt_updateSingle = {
    upsert: false,
    multi: false,
};
const opt_updateMultiple = {
    upsert: false,
    multi: true,
};
function modifyMany(modifier, db, coll, array /*[[query, data]]*/, callback) {
    var error;
    let imax = array.length;
    let count = imax;
    let i = -1;
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
    let _connection = null;
    let _connections = {};
    class Connection {
        constructor(url = null, params = null) {
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
        connect(callback) {
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
                .connect(this.url, this.params, (error, client) => {
                this.connecting = false;
                this.error = error;
                this.client = client;
                this.db = client === null || client === void 0 ? void 0 : client.db(Settings_1.setts_getDbName());
                let arr = this.listeners;
                for (let i = 0; i < arr.length; i++) {
                    arr[i](this.error, this.db);
                }
            });
        }
    }
    function getDb(server) {
        var _a;
        if (server == null) {
            return _connection === null || _connection === void 0 ? void 0 : _connection.db;
        }
        return (_a = _connections[server]) === null || _a === void 0 ? void 0 : _a.db;
    }
    Connections.getDb = getDb;
    function connect(server = null, params = null, callback) {
        let connection = server == null ? _connection : _connections[server];
        if (connection) {
            connection.connect(callback);
            return;
        }
        let _url = Settings_1.setts_getConnectionString(server);
        let _params = params !== null && params !== void 0 ? params : Settings_1.setts_getParams(server);
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
Object.defineProperty(exports, "__esModule", { value: true });
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
function cb_toPromise(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverUtils = void 0;
const DriverCore_1 = _src_mongo_DriverCore;
var DriverUtils;
(function (DriverUtils) {
    function getFindQuery(finder, x) {
        if (typeof finder === 'string') {
            if (finder === '_id') {
                return {
                    _id: ensureObjectID(x._id)
                };
            }
            return {
                [finder]: x[finder]
            };
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
        let { ObjectID } = DriverCore_1.core.getMongoLib();
        if (typeof value === 'string' && value.length === 24) {
            return new ObjectID(value);
        }
        if (value instanceof ObjectID) {
            return value;
        }
        let $in = value.$in;
        if ($in != null) {
            for (let i = 0; i < $in.length; i++) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.core_profiler_toggle = exports.core_profiler_getData = void 0;
const DriverCore_1 = _src_mongo_DriverCore;
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
    DriverCore_1.core.updateSingle = function (db, meta, query, mod, callback /*<error, stats>*/) {
        _core_updateSingle.apply(null, arguments);
        _core_updateSingle(db, meta, wrapQuery(query), mod, analizator(meta, query));
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
function analize(coll, query, plan, params = {}) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_getMongo = exports.db_ensureIndexes = exports.db_remove = exports.db_patchMany = exports.db_patchMultipleBy = exports.db_patchSingleBy = exports.db_patchSingle = exports.db_upsertSingleBy = exports.db_upsertManyBy = exports.db_updateManyBy = exports.db_updateMany = exports.db_updateSingle = exports.db_insertMany = exports.db_insertSingle = exports.db_insert = exports.db_count = exports.db_aggregate = exports.db_findManyPaged = exports.db_findMany = exports.db_findSingle = exports.db_resolveDb = exports.db_getDb = exports.db_resolveCollection = exports.db_getCollection = void 0;
const DriverCore_1 = _src_mongo_DriverCore;
const utils_1 = _src_mongo_utils;
const DriverUtils_1 = _src_mongo_DriverUtils;
var DriverProfiler_1 = _src_mongo_DriverProfiler;
Object.defineProperty(exports, "db_profiler_getData", { enumerable: true, get: function () { return DriverProfiler_1.core_profiler_getData; } });
var DriverProfiler_2 = _src_mongo_DriverProfiler;
Object.defineProperty(exports, "db_profiler_toggle", { enumerable: true, get: function () { return DriverProfiler_2.core_profiler_toggle; } });
function withDb(onError, server, fn) {
    let db = DriverCore_1.core.getDb(server);
    if (db == null) {
        DriverCore_1.core.connect(server, (err, db) => {
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
    withDb(cb, meta.server, db => {
        let coll = db.collection(meta.collection);
        if (coll == null) {
            return cb(new Error(`<mongo> Collection Not Found: ${meta}`));
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
    withDb(callback, server, db => {
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
function db_findSingle(meta, query, options, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.findSingle(db, meta.collection, queryToMongo(query), options, callback);
    });
}
exports.db_findSingle = db_findSingle;
;
function db_findMany(meta, query, options, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.findMany(db, meta.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_findMany = db_findMany;
;
function db_findManyPaged(meta, query, options, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.findManyPaged(db, meta.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_findManyPaged = db_findManyPaged;
;
function db_aggregate(meta, pipeline, options, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.aggregate(db, meta.collection, pipeline, options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_aggregate = db_aggregate;
;
function db_count(meta, query, options = null, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.count(db, meta.collection, query, options, callback);
    });
}
exports.db_count = db_count;
;
function db_insert(meta, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insert(data, {}, callback);
    });
}
exports.db_insert = db_insert;
;
function db_insertSingle(meta, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insertOne(data, {}, callback);
    });
}
exports.db_insertSingle = db_insertSingle;
;
function db_insertMany(meta, data, callback) {
    withDb(callback, meta.server, db => {
        db
            .collection(meta.collection)
            .insertMany(data, {}, callback);
    });
}
exports.db_insertMany = db_insertMany;
;
function db_updateSingle(meta, data, callback) {
    withDb(callback, meta.server, db => {
        if (data._id == null)
            return callback('<mongo:update> invalid ID');
        let query = {
            _id: DriverUtils_1.DriverUtils.ensureObjectID(data._id)
        };
        DriverCore_1.core.updateSingle(db, meta, query, data, callback);
    });
}
exports.db_updateSingle = db_updateSingle;
;
function db_updateMany(meta, array, callback) {
    withDb(callback, meta.server, db => {
        let batch = array.map(x => {
            return [
                { _id: DriverUtils_1.DriverUtils.ensureObjectID(x._id) },
                x
            ];
        });
        DriverCore_1.core.updateMany(db, meta, batch, callback);
    });
}
exports.db_updateMany = db_updateMany;
;
function db_updateManyBy(meta, finder, array, callback) {
    withDb(callback, meta.server, db => {
        let batch = array.map(x => {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        DriverCore_1.core.updateMany(db, meta, batch, callback);
    });
}
exports.db_updateManyBy = db_updateManyBy;
;
function db_upsertManyBy(meta, finder, array, callback) {
    withDb(callback, meta.server, db => {
        let batch = array.map(x => {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, x),
                x
            ];
        });
        DriverCore_1.core.upsertMany(db, meta, batch, callback);
    });
}
exports.db_upsertManyBy = db_upsertManyBy;
;
function db_upsertSingleBy(meta, finder, x, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.upsertSingle(db, meta.collection, DriverUtils_1.DriverUtils.getFindQuery(finder, x), x, callback);
    });
}
exports.db_upsertSingleBy = db_upsertSingleBy;
;
function db_patchSingle(meta, id, patch, callback) {
    withDb(callback, meta.server, db => {
        let query = { _id: DriverUtils_1.DriverUtils.ensureObjectID(id) };
        DriverCore_1.core.updateSingle(db, meta, query, patch, callback);
    });
}
exports.db_patchSingle = db_patchSingle;
;
function db_patchSingleBy(meta, query, patch, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.updateSingle(db, meta, query, patch, callback);
    });
}
exports.db_patchSingleBy = db_patchSingleBy;
;
function db_patchMultipleBy(meta, query, patch, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.updateMultiple(db, meta, query, patch, callback);
    });
}
exports.db_patchMultipleBy = db_patchMultipleBy;
;
function db_patchMany(meta, arr, callback) {
    withDb(callback, meta.server, db => {
        DriverCore_1.core.patchMany(db, meta, arr, callback);
    });
}
exports.db_patchMany = db_patchMany;
function db_remove(meta, query, isSingle, callback) {
    withDb(callback, meta.server, db => {
        query = queryToMongo(query);
        const fn = isSingle
            ? DriverCore_1.core.removeSingle
            : DriverCore_1.core.removeMany;
        fn(db, meta.collection, query, callback);
    });
}
exports.db_remove = db_remove;
;
function db_ensureIndexes(meta, indexes, callback) {
    withDb(callback, meta.server, db => {
        let dbCollection = db.collection(meta.collection);
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
const COMPARER = {
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
    for (let key in query) {
        let val = query[key];
        if (typeof val === 'string') {
            let c = val.charCodeAt(0);
            switch (c) {
                case 62:
                case 60:
                    // >
                    let compare = COMPARER[c]['0'];
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
var _src_utils_projection;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        let obj = Object.create(null);
        flatternByKey('', projection, obj);
        return obj;
    }
    ProjectionUtil.flattern = flattern;
    function flatternByKey(path, source, out) {
        let handled = false;
        for (let key in source) {
            if (handled === false && key === '$slice') {
                out[path] = source;
                return;
            }
            handled = true;
            let val = source[key];
            let pathNext = key;
            if (path) {
                pathNext = `${path}.${key}`;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoEntityFor = exports.MongoEntity = void 0;
const class_json_1 = require("class-json");
const Driver_1 = _src_mongo_Driver;
const MongoMeta_1 = _src_MongoMeta;
const atma_utils_1 = require("atma-utils");
const utils_1 = _src_mongo_utils;
const patchObject_1 = _src_utils_patchObject;
const projection_1 = _src_utils_projection;
const bson_1 = _src_utils_bson;
// type PickProjection<T, K extends keyof T> = {
//     [P in K]:
//         T[P] extends (Array<infer TArr> | Date)
//         ? (T[P])
//         : (T[P] extends object ? PickProjection<T[P], keyof T[P]> : T[P])
// };
class MongoEntity extends class_json_1.Serializable {
    static async fetch(query, options) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return utils_1.cb_toPromise(Driver_1.db_findSingle, coll, query, options).then(dbJson => {
            if (dbJson == null) {
                return null;
            }
            return bson_1.bson_toEntity(dbJson, this);
            //return JsonConvert.fromJSON<InstanceType<T>>(json, { Type: this });
        });
    }
    static async fetchPartial(query, options) {
        return this.fetch(query, projection_1.ProjectionUtil.handleOpts(options));
    }
    static async fetchMany(query, options) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return utils_1.cb_toPromise(Driver_1.db_findMany, coll, query, options).then(arr => {
            if (arr == null) {
                return null;
            }
            return arr.map(dbJson => bson_1.bson_toEntity(dbJson, this));
            //return JsonConvert.fromJSON<InstanceType<T>[]>(arr, { Type: this });
        });
    }
    static async fetchManyPartial(query, options) {
        return this.fetchMany(query, projection_1.ProjectionUtil.handleOpts(options));
    }
    static async fetchManyPaged(query, options) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return utils_1.cb_toPromise(Driver_1.db_findManyPaged, coll, query, options).then(result => {
            let arr = result.collection;
            if (arr != null) {
                arr = arr.map(dbJson => bson_1.bson_toEntity(dbJson, this));
            }
            return {
                collection: arr,
                total: result.total
            };
        });
    }
    static async fetchManyPagedPartial(query, options) {
        return this.fetchManyPaged(query, projection_1.ProjectionUtil.handleOpts(options));
    }
    static async aggregateMany(pipeline, options) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return utils_1.cb_toPromise(Driver_1.db_aggregate, coll, pipeline, options).then(arr => {
            if (arr != null) {
                arr = arr.map(dbJson => { var _a; return bson_1.bson_toEntity(dbJson, (_a = options === null || options === void 0 ? void 0 : options.Type) !== null && _a !== void 0 ? _a : this); });
            }
            return arr; //JsonConvert.fromJSON<TOut[]>(arr, { Type: options?.Type });
        });
    }
    static async aggregateManyPaged(pipeline, options) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        let countPipeline = [];
        for (let i = 0; i < pipeline.length; i++) {
            let x = pipeline[i];
            if ('$sort' in x || '$skip' in x || '$limit' in x) {
                continue;
            }
            countPipeline.push(x);
        }
        countPipeline.push({ $count: 'count' });
        let $facet = {
            $facet: {
                collection: pipeline,
                total: countPipeline
            }
        };
        return utils_1.cb_toPromise(Driver_1.db_aggregate, coll, $facet, options).then(resArr => {
            var _a, _b;
            let doc = resArr[0];
            let arr = doc.collection;
            if (arr != null) {
                arr = arr.map(dbJson => { var _a; return bson_1.bson_toEntity(dbJson, (_a = options === null || options === void 0 ? void 0 : options.Type) !== null && _a !== void 0 ? _a : this); });
            }
            return {
                collection: arr,
                total: (_b = (_a = doc.total[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0
            };
        });
    }
    static async count(query) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return utils_1.cb_toPromise(Driver_1.db_count, coll, query, null);
    }
    static async upsert(instance) {
        return EntityMethods.save(instance);
    }
    static async upsertBy(finder, instance) {
        return EntityMethods.saveBy(finder, instance, this);
    }
    static async upsertMany(arr) {
        return EntityMethods.saveMany(arr, this);
    }
    static async upsertManyBy(finder, arr) {
        return EntityMethods.upsertManyBy(finder, arr, this);
    }
    static async del(entity) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.del(coll, entity);
    }
    static async delMany(arr) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.delMany(coll, arr);
    }
    static async patch(instance, patch) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, instance, patch);
    }
    static async patchDeeply(instance, patch) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, instance, patch, { deep: true });
    }
    static async patchMany(arr) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patchMany(coll, arr);
    }
    /**
     * Find document by filter query, and patch it.
     */
    static async patchDeeplyBy(finder, patch) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patchBy(coll, finder, patch, { deep: true });
    }
    static async patchBy(finder, patch) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patchBy(coll, finder, patch);
    }
    static async patchMultipleBy(finder, patch) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patchMultipleBy(coll, finder, patch);
    }
    static async patchMultipleDeeplyBy(finder, patch) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patchMultipleBy(coll, finder, patch, { deep: true });
    }
    static async getCollection() {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return utils_1.cb_toPromise(Driver_1.db_getCollection, coll);
    }
    static async getDb(server) {
        return utils_1.cb_toPromise(Driver_1.db_getDb, server);
    }
    upsert() {
        return EntityMethods.save(this);
    }
    del() {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.del(coll, this);
    }
    patch(patch, opts) {
        let coll = MongoMeta_1.MongoMeta.getCollection(this);
        return EntityMethods.patch(coll, this, patch, /*isDeep*/ opts);
    }
}
exports.MongoEntity = MongoEntity;
function MongoEntityFor(Base) {
    return atma_utils_1.mixin(Base, MongoEntity);
}
exports.MongoEntityFor = MongoEntityFor;
var EntityMethods;
(function (EntityMethods) {
    function save(x) {
        let coll = MongoMeta_1.MongoMeta.getCollection(x);
        let json = bson_1.bson_fromEntity(x);
        let fn = json._id == null
            ? Driver_1.db_insertSingle
            : Driver_1.db_updateSingle;
        return utils_1.cb_toPromise(fn, coll, json).then(result => {
            let array = result.ops;
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
    async function saveBy(finder, x, Type) {
        var _a;
        Type = Type !== null && Type !== void 0 ? Type : x.constructor;
        let coll = MongoMeta_1.MongoMeta.getCollection(Type);
        if (coll == null) {
            return Promise.reject(new Error(`<class:patch> 'Collection' is not defined for ${Type.name}`));
        }
        let json = bson_1.bson_fromEntity(x, Type);
        let result = await utils_1.cb_toPromise(Driver_1.db_upsertSingleBy, coll, finder, json);
        if (((_a = result.upsertedId) === null || _a === void 0 ? void 0 : _a._id) && x._id == null) {
            x._id = result.upsertedId._id;
        }
        return x;
    }
    EntityMethods.saveBy = saveBy;
    function saveMany(arr, Type) {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }
        Type = Type !== null && Type !== void 0 ? Type : arr[0].constructor;
        let coll = MongoMeta_1.MongoMeta.getCollection(Type);
        let insert = [];
        let insertIndexes = [];
        let update = [];
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            let json = bson_1.bson_fromEntity(x, Type);
            if (x._id == null) {
                insert.push(json);
                insertIndexes.push(i);
                continue;
            }
            update.push(json);
        }
        let awaitCount = insert.length > 0 && update.length > 0 ? 2 : 1;
        let dfr = new atma_utils_1.class_Dfr;
        let listener = utils_1.cb_createListener(awaitCount, (error) => {
            if (error) {
                dfr.reject(error);
                return;
            }
            dfr.resolve(arr);
        });
        if (insert.length) {
            Driver_1.db_insertMany(coll, insert, (error, result) => {
                if (result != null) {
                    let ops = result.ops;
                    if (atma_utils_1.is_Array(ops) === false) {
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
            Driver_1.db_updateMany(coll, update, listener);
        }
        return dfr;
    }
    EntityMethods.saveMany = saveMany;
    async function upsertManyBy(finder, arr, Type) {
        if (arr == null || arr.length === 0) {
            return Promise.resolve([]);
        }
        Type = Type !== null && Type !== void 0 ? Type : arr[0].constructor;
        let coll = MongoMeta_1.MongoMeta.getCollection(Type);
        let jsons = arr.map(x => bson_1.bson_fromEntity(x, Type));
        let result = await utils_1.cb_toPromise(Driver_1.db_upsertManyBy, coll, finder, jsons);
        return arr;
    }
    EntityMethods.upsertManyBy = upsertManyBy;
    function patchBy(coll, finder, patch, opts) {
        let update = patchObject_1.obj_partialToUpdateQuery(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep, coll);
        return utils_1.cb_toPromise(Driver_1.db_patchSingleBy, coll, finder, update);
    }
    EntityMethods.patchBy = patchBy;
    function patchMultipleBy(coll, finder, patch, opts) {
        let update = patchObject_1.obj_partialToUpdateQuery(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep, coll);
        return utils_1.cb_toPromise(Driver_1.db_patchMultipleBy, coll, finder, update);
    }
    EntityMethods.patchMultipleBy = patchMultipleBy;
    function patch(coll, instance, patch, opts) {
        let id = instance._id;
        if (id == null) {
            return Promise.reject(new Error(`<patch> '_id' is not defined for ${coll}`));
        }
        let update = patchObject_1.obj_partialToUpdateQuery(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep, coll);
        patchObject_1.obj_patch(instance, update);
        return utils_1.cb_toPromise(Driver_1.db_patchSingle, coll, id, update).then(_ => instance);
    }
    EntityMethods.patch = patch;
    function patchMany(coll, arr, opts) {
        if (opts === null || opts === void 0 ? void 0 : opts.deep) {
            for (let i = 0; i < arr.length; i++) {
                arr[i][1] = patchObject_1.obj_partialToUpdateQuery(arr[i][1], false, /* deep */ true, coll);
            }
        }
        return utils_1.cb_toPromise(Driver_1.db_patchMany, coll, arr);
    }
    EntityMethods.patchMany = patchMany;
    function del(coll, entity) {
        if (coll == null) {
            return Promise.reject(new Error(`Delete for ${entity._id} failed as Collection is not set`));
        }
        if (entity._id == null) {
            return Promise.reject(new Error(`Delete in ${coll} failed as ID is undefined`));
        }
        return utils_1.cb_toPromise(Driver_1.db_remove, coll, { _id: entity._id }, true).then(x => {
            return x.result;
        });
    }
    EntityMethods.del = del;
    function delMany(coll, arr) {
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
        return utils_1.cb_toPromise(Driver_1.db_remove, coll, { _id: { $in: ids } }, false).then(x => {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexHandler = void 0;
const utils_1 = _src_mongo_utils;
const Driver_1 = _src_mongo_Driver;
const MongoMeta_1 = _src_MongoMeta;
var IndexHandler;
(function (IndexHandler) {
    const TYPES = [];
    function register(Type) {
        if (TYPES.includes(Type) === false) {
            TYPES.push(Type);
        }
    }
    IndexHandler.register = register;
    function ensure(Type, callback) {
        let meta = MongoMeta_1.MongoMeta.pickModelMeta(Type);
        if (meta == null || meta.indexes == null || meta.indexes.length === 0) {
            callback();
            return;
        }
        Driver_1.db_ensureIndexes(meta, meta.indexes, callback);
    }
    IndexHandler.ensure = ensure;
    function ensureAll(callback) {
        let imax = TYPES.length, listener = utils_1.cb_createListener(imax, callback), i = -1;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoIndexes = void 0;
const IndexHandler_1 = _src_mongo_IndexHandler;
const utils_1 = _src_mongo_utils;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUtils = void 0;
const DriverUtils_1 = _src_mongo_DriverUtils;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoProfiler = void 0;
const Driver_1 = _src_mongo_Driver;
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
var _src_types_Types;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = void 0;
const MongoLib = require("mongodb");
var Types;
(function (Types) {
    function Decimal128(val) {
        switch (typeof val) {
            case 'undefined':
                return null;
            case 'number':
            case 'bigint':
                return MongoLib.Decimal128.fromString(val.toString());
            case 'string':
                if (val.startsWith('0x')) {
                    return MongoLib.Decimal128.fromString(String(BigInt(val)));
                }
                return MongoLib.Decimal128.fromString(val);
        }
        throw new Error(`Invalid decimal type for ${val}`);
    }
    Types.Decimal128 = Decimal128;
    Types.Mapping = {
        decimal: Decimal128,
    };
})(Types = exports.Types || (exports.Types = {}));
//# sourceMappingURL=Types.js.map
//# sourceMappingURL=Types.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_types_Types) && isObject(module.exports)) {
		Object.assign(_src_types_Types, module.exports);
		return;
	}
	_src_types_Types = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_decos;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbType = exports.index = exports.table = void 0;
const MongoMeta_1 = _src_MongoMeta;
const atma_utils_1 = require("atma-utils");
const IndexHandler_1 = _src_mongo_IndexHandler;
const Types_1 = _src_types_Types;
function table(name, options) {
    return function (target) {
        if (typeof target !== 'function') {
            throw new Error(`Decorator for table ${name} must be called on class Ctor`);
        }
        let meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        meta.collection = name;
        meta.server = options === null || options === void 0 ? void 0 : options.server;
        return target;
    };
}
exports.table = table;
function index(arg1, arg2, arg3) {
    return function (target, propertyKey, descriptor) {
        let meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        if (meta.indexes == null) {
            meta.indexes = [];
        }
        let indexes = meta.indexes;
        let forProp = typeof propertyKey === 'string';
        if (forProp) {
            let name;
            let type;
            let opts;
            let t1 = arg1 == null ? 'null' : typeof arg1;
            let t2 = arg2 == null ? 'null' : typeof arg2;
            let t3 = arg3 == null ? 'null' : typeof arg3;
            if (t1 === 'object') {
                opts = arg1;
            }
            if (t1 === 'string') {
                name = arg1;
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
            name = name !== null && name !== void 0 ? name : propertyKey;
            type = type !== null && type !== void 0 ? type : 1;
            let idx = name ? indexes.find(x => x.name === name) : null;
            if (idx == null) {
                idx = {
                    name,
                    key: {}
                };
                indexes.push(idx);
            }
            idx.key = atma_utils_1.obj_extend(idx.key, { [propertyKey]: type });
            atma_utils_1.obj_extend(idx, opts);
            IndexHandler_1.IndexHandler.register(typeof target === 'function' ? target : target.constructor);
            return;
        }
        let raw = arg1;
        indexes.push(raw);
        IndexHandler_1.IndexHandler.register(typeof target === 'function' ? target : target.constructor);
    };
}
exports.index = index;
/**
 * @param Ctor
 * @param propertyOverriden Supports also nesting path like `foo.bar.qux`;
 * @returns
 */
function dbType(CtorMix, opts) {
    return function (target, propertyKey, descriptor) {
        var _a;
        let meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        if (meta.types == null) {
            meta.types = [];
        }
        let Ctor = typeof CtorMix === 'string'
            ? Types_1.Types.Mapping[CtorMix]
            : CtorMix;
        meta.types.push({
            property: (_a = opts === null || opts === void 0 ? void 0 : opts.property) !== null && _a !== void 0 ? _a : propertyKey,
            TypeMongo: Ctor,
            TypeJS: opts === null || opts === void 0 ? void 0 : opts.Type,
        });
    };
}
exports.dbType = dbType;
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
Object.defineProperty(exports, "__esModule", { value: true });
var MongoEntity_1 = _src_MongoEntity;
Object.defineProperty(exports, "MongoEntity", { enumerable: true, get: function () { return MongoEntity_1.MongoEntity; } });
var MongoIndexes_1 = _src_MongoIndexes;
Object.defineProperty(exports, "MongoIndexes", { enumerable: true, get: function () { return MongoIndexes_1.MongoIndexes; } });
var Settings_1 = _src_mongo_Settings;
Object.defineProperty(exports, "MongoSettings", { enumerable: true, get: function () { return Settings_1.MongoSettings; } });
var MongoUtils_1 = _src_MongoUtils;
Object.defineProperty(exports, "MongoUtils", { enumerable: true, get: function () { return MongoUtils_1.MongoUtils; } });
var MongoMeta_1 = _src_MongoMeta;
Object.defineProperty(exports, "MongoMeta", { enumerable: true, get: function () { return MongoMeta_1.MongoMeta; } });
var MongoProfiler_1 = _src_MongoProfiler;
Object.defineProperty(exports, "MongoProfiler", { enumerable: true, get: function () { return MongoProfiler_1.MongoProfiler; } });
var decos_1 = _src_decos;
Object.defineProperty(exports, "table", { enumerable: true, get: function () { return decos_1.table; } });
Object.defineProperty(exports, "index", { enumerable: true, get: function () { return decos_1.index; } });
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map
}));
// end:source ./UMD.js
