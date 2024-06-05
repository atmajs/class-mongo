
// source ./UMD.js
(function (factory) {

    var _name = 'class-mongo',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _node_modules_alot_lib_alot = {};
var _src_MongoBson = {};
var _src_MongoEntity = {};
var _src_MongoIndexes = {};
var _src_MongoMeta = {};
var _src_MongoProfiler = {};
var _src_MongoUtils = {};
var _src_decos = {};
var _src_mongo_CollectionHandler = {};
var _src_mongo_Driver = {};
var _src_mongo_DriverCore = {};
var _src_mongo_DriverProfiler = {};
var _src_mongo_DriverUtils = {};
var _src_mongo_IndexHandler = {};
var _src_mongo_Settings = {};
var _src_mongo_utils = {};
var _src_types_Types = {};
var _src_utils_array = {};
var _src_utils_bigint = {};
var _src_utils_bson = {};
var _src_utils_deprecated = {};
var _src_utils_patchObject = {};
var _src_utils_projection = {};
var _src_utils_promise = {};

// source ./ModuleSimplified.js
var _src_mongo_Settings;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_Settings != null ? _src_mongo_Settings : {};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setts_getDbName = exports.setts_getParams = exports.setts_getConnectionString = exports.setts_define = exports.MongoSettings = void 0;
var DefaultServer = {
    name: 'default',
    ip: '127.0.0.1',
    port: 27017,
    db: null,
    connection: null,
    // https://docs.mongodb.com/drivers/node/current/fundamentals/connection/
    params: {
        //auto_reconnect: true,
        //native_parser: true,
        useUnifiedTopology: true,
        writeConcern: {
            w: 1
        },
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
    var _a, _b, _c, _d, _e, _f, _g;
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
    if (name !== 'default' && setts.default) {
        setts_define(__assign(__assign({}, setts), { name: null }));
    }
    if (setts.ip == null && target.connection == null && typeof process !== 'undefined' && ((_g = process.env) === null || _g === void 0 ? void 0 : _g.MONGO_CONNECTION)) {
        target.connection = process.env.MONGO_CONNECTION;
    }
}
exports.setts_define = setts_define;
;
function setts_getConnectionString(server) {
    var _a;
    if (server === void 0) { server = 'default'; }
    var setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    if (setts == null) {
        throw new Error("Server ".concat(server, " options are not set"));
    }
    var ip = setts.ip, port = setts.port, db = setts.db;
    var uri = (_a = setts.connection) !== null && _a !== void 0 ? _a : "mongodb://".concat(ip, ":").concat(port);
    if (db != null && uri.includes(db)) {
        uri = uri.replace(/((:\d+))\/?([^\/\?]+|$)/, "/".concat(db));
    }
    return uri;
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_Settings === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_Settings) && __isObj(module.exports)) {
        Object.assign(_src_mongo_Settings, module.exports);
    } else {
        _src_mongo_Settings = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_array;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_array != null ? _src_utils_array : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_array === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_array) && __isObj(module.exports)) {
        Object.assign(_src_utils_array, module.exports);
    } else {
        _src_utils_array = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoMeta;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_MongoMeta != null ? _src_MongoMeta : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            throw new Error("Collection not defined for the entity: ".concat(meta.Type.name));
        }
        return meta;
    }
    MongoMeta.getCollection = getCollection;
})(MongoMeta = exports.MongoMeta || (exports.MongoMeta = {}));
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_MongoMeta === module.exports) {
        // do nothing if
    } else if (__isObj(_src_MongoMeta) && __isObj(module.exports)) {
        Object.assign(_src_MongoMeta, module.exports);
    } else {
        _src_MongoMeta = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_bigint;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_bigint != null ? _src_utils_bigint : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigint_fromBson = exports.bigint_toBson = void 0;
var MongoLib = require("mongodb");
function bigint_toBson(value) {
    if (value < BigInt(Number.MAX_SAFE_INTEGER)) {
        return Number(value);
    }
    if (MAX_DECIMAL == null) {
        MAX_DECIMAL = Math.pow(BigInt(10), BigInt(34)) - BigInt(1);
    }
    var str = value.toString();
    if (value < MAX_DECIMAL) {
        return MongoLib.Decimal128.fromString(str);
    }
    return str;
}
exports.bigint_toBson = bigint_toBson;
function bigint_fromBson(value) {
    var str = value.toString();
    var number = Number(str);
    if (number < Number.MAX_SAFE_INTEGER) {
        return number;
    }
    if (str.includes('.')) {
        return str;
    }
    return BigInt(str);
}
exports.bigint_fromBson = bigint_fromBson;
var MAX_DECIMAL;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_bigint === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_bigint) && __isObj(module.exports)) {
        Object.assign(_src_utils_bigint, module.exports);
    } else {
        _src_utils_bigint = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_bson;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_bson != null ? _src_utils_bson : {};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bson_normalizeQuery = exports.bson_prepairPartial = exports.bson_toValue = exports.bson_toEntity = exports.bson_toObject = exports.bson_fromObject = void 0;
var atma_utils_1 = require("atma-utils");
var class_json_1 = require("class-json");
var mongodb_1 = require("mongodb");
var MongoMeta_1 = _src_MongoMeta;
var bigint_1 = _src_utils_bigint;
var JsonSettings = {
    types: {
        bigint: {
            toJSON: function (instanceValue) {
                return (0, bigint_1.bigint_toBson)(instanceValue);
            },
            fromJSON: function (jsonValue) {
                return jsonValue == null
                    ? null
                    : BigInt(jsonValue.toString());
            }
        }
    }
};
function bson_fromObject(entity, Type) {
    Type = Type !== null && Type !== void 0 ? Type : entity.constructor;
    if (Type === Object) {
        Type = null;
    }
    var bson = class_json_1.JsonConvert.toJSON(entity, __assign(__assign({}, JsonSettings), { Type: Type }));
    var meta = MongoMeta_1.MongoMeta.pickModelMeta(entity);
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToMongoTypes(bson, meta.types);
    }
    return bson;
}
exports.bson_fromObject = bson_fromObject;
function bson_toObject(dbJson, Type) {
    var json = class_json_1.JsonConvert.fromJSON(dbJson, __assign(__assign({}, JsonSettings), { Type: Type }));
    var meta = MongoMeta_1.MongoMeta.pickModelMeta(Type);
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToJsTypes(json, meta.types);
    }
    return json;
}
exports.bson_toObject = bson_toObject;
function bson_toEntity(dbJson, Type) {
    var json = class_json_1.JsonConvert.fromJSON(dbJson, { Type: Type });
    var meta = MongoMeta_1.MongoMeta.pickModelMeta(Type);
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToJsTypes(json, meta.types);
    }
    return json;
}
exports.bson_toEntity = bson_toEntity;
function bson_toValue(value) {
    var t = typeof value;
    if (t === 'object' && value instanceof mongodb_1.Decimal128) {
        return (0, bigint_1.bigint_fromBson)(value);
    }
    return value;
}
exports.bson_toValue = bson_toValue;
function bson_prepairPartial(json, meta) {
    if ((meta === null || meta === void 0 ? void 0 : meta.types) != null) {
        mapToMongoTypes(json, meta.types);
    }
}
exports.bson_prepairPartial = bson_prepairPartial;
function bson_normalizeQuery(query) {
    if (query == null) {
        return;
    }
    Query.normalizeTypes(query);
}
exports.bson_normalizeQuery = bson_normalizeQuery;
function mapToMongoTypes(json, types) {
    for (var i = 0; i < types.length; i++) {
        var propInfo = types[i];
        var current = (0, atma_utils_1.obj_getProperty)(json, propInfo.property);
        if (current != null) {
            var val = propInfo.TypeMongo(current);
            (0, atma_utils_1.obj_setProperty)(json, propInfo.property, val);
        }
    }
}
function mapToJsTypes(dbJson, types) {
    for (var i = 0; i < types.length; i++) {
        var propInfo = types[i];
        if (propInfo.TypeJS == null) {
            continue;
        }
        var current = (0, atma_utils_1.obj_getProperty)(dbJson, propInfo.property);
        if (current != null) {
            var val = propInfo.TypeJS(current.toString());
            (0, atma_utils_1.obj_setProperty)(dbJson, propInfo.property, val);
        }
    }
}
var Query;
(function (Query) {
    function normalizeTypes(mix) {
        if (mix == null) {
            return mix;
        }
        if (typeof mix !== 'object') {
            return;
        }
        if (Array.isArray(mix)) {
            for (var i = 0; i < mix.length; i++) {
                var overriden = normalize(mix[i]);
                if (overriden != null) {
                    mix[i] = overriden;
                }
            }
            return;
        }
        for (var key in mix) {
            var overriden = normalize(mix[key]);
            if (overriden != null) {
                mix[key] = overriden;
            }
        }
    }
    Query.normalizeTypes = normalizeTypes;
    function normalize(value) {
        var t = typeof value;
        if (t === 'bigint') {
            return (0, bigint_1.bigint_toBson)(value);
        }
        if (t !== 'object') {
            return null;
        }
        // go deep
        normalizeTypes(value);
        return null;
    }
})(Query || (Query = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_bson === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_bson) && __isObj(module.exports)) {
        Object.assign(_src_utils_bson, module.exports);
    } else {
        _src_utils_bson = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_patchObject;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_patchObject != null ? _src_utils_patchObject : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_isPatch = exports.obj_patchValidate = exports.obj_flattern = exports.obj_partialToUpdateFilter = exports.obj_patch = void 0;
var atma_utils_1 = require("atma-utils");
var array_1 = _src_utils_array;
var bson_1 = _src_utils_bson;
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
function obj_partialToUpdateFilter(data, isOptional, isDeep, meta) {
    if (obj_isPatch(data)) {
        return data;
    }
    if (meta === null || meta === void 0 ? void 0 : meta.types) {
        (0, bson_1.bson_prepairPartial)(data, meta);
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
        if (isDeep === true && (0, atma_utils_1.is_rawObject)(val)) {
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
exports.obj_partialToUpdateFilter = obj_partialToUpdateFilter;
function obj_flattern(target, value, path) {
    if (path === void 0) { path = null; }
    if (!(0, atma_utils_1.is_rawObject)(value)) {
        target[path] = value;
        return;
    }
    for (var key in value) {
        var p = path != null ? "".concat(path, ".").concat(key) : key;
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
        mutatorFn((0, atma_utils_1.obj_getProperty)(obj, key), data[key], key, obj);
    }
}
function walk_modifier(obj, data, fn) {
    for (var key in data) {
        var value = (0, bson_1.bson_toValue)((0, atma_utils_1.obj_getProperty)(obj, key));
        (0, atma_utils_1.obj_setProperty)(obj, key, fn(value, data[key], key));
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
    if ((0, atma_utils_1.is_Array)(val) === false) {
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
    (0, array_1.arr_remove)(val, function (item) {
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_patchObject === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_patchObject) && __isObj(module.exports)) {
        Object.assign(_src_utils_patchObject, module.exports);
    } else {
        _src_utils_patchObject = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_promise;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_promise != null ? _src_utils_promise : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = void 0;
var atma_utils_1 = require("atma-utils");
var promise;
(function (promise_1) {
    function toCallback(promise, cb) {
        var dfr = new atma_utils_1.class_Dfr();
        promise
            .then(function (result) {
            dfr.resolve([null, result]);
            cb === null || cb === void 0 ? void 0 : cb(null, result);
        }, function (error) {
            dfr.reject(error);
            cb === null || cb === void 0 ? void 0 : cb(error);
        });
        return dfr;
    }
    promise_1.toCallback = toCallback;
    function wait(ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    }
    promise_1.wait = wait;
})(promise = exports.promise || (exports.promise = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_promise === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_promise) && __isObj(module.exports)) {
        Object.assign(_src_utils_promise, module.exports);
    } else {
        _src_utils_promise = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_DriverCore;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_DriverCore != null ? _src_mongo_DriverCore : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
var memd_1 = require("memd");
var Settings_1 = _src_mongo_Settings;
var patchObject_1 = _src_utils_patchObject;
var promise_1 = _src_utils_promise;
var core;
(function (core) {
    var mongoLib = null;
    function getDb(server) {
        return Connections.getDb(server);
    }
    core.getDb = getDb;
    ;
    function connect(server) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Connections.connect(server)];
            });
        });
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
            return promise_1.promise.toCallback(c.findOne(query), callback);
        }
        promise_1.promise.toCallback(c.findOne(query, options), callback);
    }
    core.findSingle = findSingle;
    ;
    function findSingleAsync(db, coll, query, options) {
        return db.collection(coll).findOne(query, options !== null && options !== void 0 ? options : {});
    }
    core.findSingleAsync = findSingleAsync;
    ;
    function findMany(db, coll, query, options, callback /*<error, array>*/) {
        var c = db.collection(coll);
        var cursor = c.find(query, options);
        promise_1.promise.toCallback(cursor.toArray());
    }
    core.findMany = findMany;
    ;
    function findManyAsync(db, coll, query, options) {
        return __awaiter(this, void 0, Promise, function () {
            var c, cursor, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        c = db.collection(coll);
                        cursor = c.find(query, options);
                        return [4 /*yield*/, cursor.toArray()];
                    case 1:
                        arr = _a.sent();
                        return [2 /*return*/, arr];
                }
            });
        });
    }
    core.findManyAsync = findManyAsync;
    ;
    function findManyPaged(db, coll, query, options, callback) {
        var c = db.collection(coll);
        var cursor = c.find(query, options);
        promise_1.promise.toCallback(cursor.count(), function (error, total) {
            if (error) {
                callback(error, null);
                return;
            }
            promise_1.promise.toCallback(cursor.toArray(), function (error, arr) {
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
    function findManyPagedAsync(db, coll, query, options) {
        return __awaiter(this, void 0, Promise, function () {
            var c, cursor, _a, total, arr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        c = db.collection(coll);
                        cursor = c.find(query, options);
                        return [4 /*yield*/, Promise.all([
                                cursor.count({
                                    limit: null,
                                    skip: null,
                                }),
                                cursor.toArray(),
                            ])];
                    case 1:
                        _a = _b.sent(), total = _a[0], arr = _a[1];
                        return [2 /*return*/, {
                                collection: arr,
                                total: total
                            }];
                }
            });
        });
    }
    core.findManyPagedAsync = findManyPagedAsync;
    ;
    function aggregate(db, coll, pipeline, options, callback /*<error, array>*/) {
        var c = db.collection(coll);
        var cursor = c.aggregate(pipeline, options);
        promise_1.promise.toCallback(cursor.toArray(), callback);
    }
    core.aggregate = aggregate;
    ;
    function aggregateAsync(db, coll, pipeline, options) {
        return db
            .collection(coll)
            .aggregate(pipeline, options)
            .toArray();
    }
    core.aggregateAsync = aggregateAsync;
    ;
    function upsertSingle(db, coll, query, data, callback) {
        var update = (0, patchObject_1.obj_partialToUpdateFilter)(data);
        promise_1.promise.toCallback(db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle), callback);
    }
    core.upsertSingle = upsertSingle;
    ;
    function upsertSingleAsync(db, coll, query, data) {
        var update = (0, patchObject_1.obj_partialToUpdateFilter)(data);
        return db
            .collection(coll)
            .updateOne(query, update, opt_upsertSingle);
    }
    core.upsertSingleAsync = upsertSingleAsync;
    ;
    function upsertMany(db, meta, array /*[[query, data]]*/, callback) {
        var ops = array.map(function (op) {
            return {
                updateOne: {
                    filter: op[0],
                    update: (0, patchObject_1.obj_partialToUpdateFilter)(op[1], null, null, meta),
                    upsert: true
                }
            };
        });
        bulkWrite(db, meta.collection, ops, function (err, result) {
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
                    callback(new Error("Unexpected missmatch: ".concat(x._id, " != ").concat(upserted[i])), null);
                    return;
                }
            }
            callback(err, result);
        });
    }
    core.upsertMany = upsertMany;
    ;
    function upsertManyAsync(db, meta, array) {
        return __awaiter(this, void 0, Promise, function () {
            var ops, result, upserted, i, _a, index, _id, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ops = array.map(function (op) {
                            return {
                                updateOne: {
                                    filter: op[0],
                                    update: (0, patchObject_1.obj_partialToUpdateFilter)(op[1], null, null, meta),
                                    upsert: true
                                }
                            };
                        });
                        return [4 /*yield*/, bulkWriteAsync(db, meta.collection, ops)
                            /** when updates of existed documents occures there will be no _id field */
                        ];
                    case 1:
                        result = _b.sent();
                        upserted = result.getUpsertedIds();
                        for (i = 0; i < upserted.length; i++) {
                            _a = upserted[i], index = _a.index, _id = _a._id;
                            x = array[index][1];
                            if (x._id == null) {
                                x._id = _id;
                            }
                            else if (String(x._id) !== String(upserted[i])) {
                                throw new Error("Unexpected missmatch: ".concat(x._id, " != ").concat(upserted[i]));
                            }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    }
    core.upsertManyAsync = upsertManyAsync;
    ;
    function patchMany(db, meta, array /*[[query, data]]*/, callback) {
        var ops = array
            .map(function (op) {
            var filter = op[0], data = op[1];
            var patch = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
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
                nUpserted: 0,
            });
            return;
        }
        bulkWrite(db, meta.collection, ops, function (err, result) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }
    core.patchMany = patchMany;
    ;
    function patchManyAsync(db, meta, array /*[[query, data]]*/) {
        return __awaiter(this, void 0, Promise, function () {
            var ops, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ops = array
                            .map(function (op) {
                            var filter = op[0], data = op[1];
                            var patch = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
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
                            return [2 /*return*/, {
                                    ok: true,
                                    nInserted: 0,
                                    nModified: 0,
                                    nMatched: 0,
                                    nRemoved: 0,
                                    nUpserted: 0,
                                }];
                        }
                        return [4 /*yield*/, bulkWriteAsync(db, meta.collection, ops)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }
    core.patchManyAsync = patchManyAsync;
    ;
    function updateSingle(db, meta, query, data, callback /*<error, stats>*/) {
        var update = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
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
        promise_1.promise.toCallback(db
            .collection(meta.collection)
            .updateOne(query, update, opt_updateSingle), callback);
    }
    core.updateSingle = updateSingle;
    ;
    function updateSingleAsync(db, meta, query, data) {
        return __awaiter(this, void 0, Promise, function () {
            var update;
            return __generator(this, function (_a) {
                update = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
                if (update == null) {
                    return [2 /*return*/, {
                            result: {
                                ok: true,
                                n: 0,
                                nModified: 0,
                            },
                        }];
                }
                return [2 /*return*/, db
                        .collection(meta.collection)
                        .updateOne(query, update, opt_updateSingle)];
            });
        });
    }
    core.updateSingleAsync = updateSingleAsync;
    ;
    function updateMultiple(db, meta, query, data, callback /*<error, stats>*/) {
        var update = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
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
        promise_1.promise.toCallback(db
            .collection(meta.collection)
            .updateMany(query, update, opt_updateMultiple), callback);
    }
    core.updateMultiple = updateMultiple;
    ;
    function updateMultipleAsync(db, meta, query, data) {
        return __awaiter(this, void 0, Promise, function () {
            var update;
            return __generator(this, function (_a) {
                update = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
                if (update == null) {
                    return [2 /*return*/, {
                            result: {
                                ok: true,
                                n: 0,
                                nModified: 0,
                            },
                        }];
                }
                return [2 /*return*/, db
                        .collection(meta.collection)
                        .updateMany(query, update, opt_updateMultiple)];
            });
        });
    }
    core.updateMultipleAsync = updateMultipleAsync;
    ;
    function updateMany(db, meta, array /*[[query, data]]*/, callback) {
        var ops = array
            .map(function (op) {
            var filter = op[0], data = op[1];
            var patch = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
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
                    nModified: 0,
                },
            });
            return;
        }
        bulkWrite(db, meta.collection, ops, callback);
    }
    core.updateMany = updateMany;
    ;
    function updateManyAsync(db, meta, array) {
        return __awaiter(this, void 0, Promise, function () {
            var ops;
            return __generator(this, function (_a) {
                ops = array
                    .map(function (op) {
                    var filter = op[0], data = op[1];
                    var patch = (0, patchObject_1.obj_partialToUpdateFilter)(data, true, null, meta);
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
                    return [2 /*return*/, {
                            result: {
                                ok: true,
                                n: 0,
                                nModified: 0,
                            },
                        }];
                }
                return [2 /*return*/, bulkWriteAsync(db, meta.collection, ops)];
            });
        });
    }
    core.updateManyAsync = updateManyAsync;
    ;
    function removeSingle(db, coll, query, callback /*<error, count>*/) {
        promise_1.promise.toCallback(db
            .collection(coll)
            .deleteOne(query), callback);
    }
    core.removeSingle = removeSingle;
    ;
    function removeSingleAsync(db, coll, query) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, db
                        .collection(coll)
                        .deleteOne(query)];
            });
        });
    }
    core.removeSingleAsync = removeSingleAsync;
    ;
    function removeMany(db, coll, query, callback /*<error, count>*/) {
        promise_1.promise.toCallback(db
            .collection(coll)
            .deleteMany(query), callback);
    }
    core.removeMany = removeMany;
    ;
    function removeManyAsync(db, coll, query) {
        return db
            .collection(coll)
            .deleteMany(query);
    }
    core.removeManyAsync = removeManyAsync;
    ;
    function count(db, coll, query, options, callback /*<error, count>*/) {
        promise_1.promise.toCallback(db
            .collection(coll)
            .countDocuments(query, options), callback);
    }
    core.count = count;
    function countAsync(db, coll, query, options) {
        return db
            .collection(coll)
            .countDocuments(query, options);
    }
    core.countAsync = countAsync;
    function bulkWrite(db, coll, operations, callback) {
        promise_1.promise.toCallback(db.collection(coll).bulkWrite(operations), callback);
    }
    core.bulkWrite = bulkWrite;
    ;
    function bulkWriteAsync(db, coll, operations) {
        return db.collection(coll).bulkWrite(operations);
    }
    core.bulkWriteAsync = bulkWriteAsync;
    ;
})(core = exports.core || (exports.core = {}));
// ==== private
var opt_upsertSingle = {
    upsert: true,
    multi: false,
};
var opt_updateSingle = {
    upsert: false,
    multi: false,
};
var opt_updateMultiple = {
    upsert: false,
    multi: true,
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
            if (url == null) {
                this.url = (0, Settings_1.setts_getConnectionString)();
            }
            if (params == null) {
                this.params = (0, Settings_1.setts_getParams)();
            }
        }
        Connection.prototype.connect = function () {
            return __awaiter(this, void 0, Promise, function () {
                var _a, error, client;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.error != null) {
                                throw this.error;
                            }
                            if (this.db != null) {
                                return [2 /*return*/, this.db];
                            }
                            return [4 /*yield*/, promise_1.promise.toCallback(core
                                    .getMongoLib()
                                    .MongoClient
                                    .connect(this.url, this.params))];
                        case 1:
                            _a = _b.sent(), error = _a[0], client = _a[1];
                            if (error) {
                                throw error;
                            }
                            this.error = error;
                            this.client = client;
                            this.db = client === null || client === void 0 ? void 0 : client.db((0, Settings_1.setts_getDbName)());
                            return [2 /*return*/, this.db];
                    }
                });
            });
        };
        __decorate([
            memd_1.default.deco.memoize({ perInstance: true })
        ], Connection.prototype, "connect", null);
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
    function connect(server, params) {
        if (server === void 0) { server = null; }
        if (params === void 0) { params = null; }
        return __awaiter(this, void 0, void 0, function () {
            var connection, _url, _params;
            return __generator(this, function (_a) {
                connection = server == null ? _connection : _connections[server];
                if (connection) {
                    return [2 /*return*/, connection.connect()];
                }
                _url = (0, Settings_1.setts_getConnectionString)(server);
                _params = params !== null && params !== void 0 ? params : (0, Settings_1.setts_getParams)(server);
                connection = new Connection(_url, _params);
                _connections[server] = connection;
                _connection = _connection !== null && _connection !== void 0 ? _connection : connection;
                return [2 /*return*/, connection.connect()];
            });
        });
    }
    Connections.connect = connect;
    ;
})(Connections || (Connections = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_DriverCore === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_DriverCore) && __isObj(module.exports)) {
        Object.assign(_src_mongo_DriverCore, module.exports);
    } else {
        _src_mongo_DriverCore = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_DriverUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_DriverUtils != null ? _src_mongo_DriverUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var ObjectId = DriverCore_1.core.getMongoLib().ObjectId;
        if (typeof value === 'string' && value.length === 24) {
            return new ObjectId(value);
        }
        if (value instanceof ObjectId) {
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_DriverUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_DriverUtils) && __isObj(module.exports)) {
        Object.assign(_src_mongo_DriverUtils, module.exports);
    } else {
        _src_mongo_DriverUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_deprecated;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_deprecated != null ? _src_utils_deprecated : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecated_log = void 0;
function deprecated_log(message) {
    if (message in notified) {
        return;
    }
    console.warn("[Deprecated API] ".concat(message));
}
exports.deprecated_log = deprecated_log;
var notified = {};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_deprecated === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_deprecated) && __isObj(module.exports)) {
        Object.assign(_src_utils_deprecated, module.exports);
    } else {
        _src_utils_deprecated = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_alot_lib_alot;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_alot_lib_alot != null ? _node_modules_alot_lib_alot : {};
    var module = { exports: exports };

    
// source ./UMD.js
(function (factory) {

    var _name = 'alot',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _node_modules_atma_utils_lib_utils = {};
var _src_AlotProto = {};
var _src_alot = {};
var _src_async_Deferred = {};
var _src_async_Pool = {};
var _src_streams_DistinctStream = {};
var _src_streams_FilterStream = {};
var _src_streams_ForEachStream = {};
var _src_streams_ForkStream = {};
var _src_streams_GroupStream = {};
var _src_streams_IAlotStream = {};
var _src_streams_JoinStream = {};
var _src_streams_MapStream = {};
var _src_streams_SkipStream = {};
var _src_streams_SortedStream = {};
var _src_streams_TakeStream = {};
var _src_streams_exports = {};
var _src_utils_Aggregation = {};
var _src_utils_arr = {};
var _src_utils_classify = {};
var _src_utils_deco = {};
var _src_utils_is = {};
var _src_utils_obj = {};
var _src_utils_r = {};

// source ./ModuleSimplified.js
var _src_streams_IAlotStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_IAlotStream != null ? _src_streams_IAlotStream : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=IAlotStream.js.map
//# sourceMappingURL=IAlotStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_IAlotStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_IAlotStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_IAlotStream, module.exports);
    } else {
        _src_streams_IAlotStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_atma_utils_lib_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_atma_utils_lib_utils != null ? _node_modules_atma_utils_lib_utils : {};
    var module = { exports: exports };

    (function(factory){

	var owner, property;
	if (typeof module !== 'undefined' && module.exports) {
		owner = module;
		property = 'exports';
	}
	else {
		owner = window;
		property = 'Utils';
	}

	factory(owner, property);

}(function(owner, property){

    	var _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty,
	    _Array_slice,
	    _Object_getOwnProp,
	    _Object_defineProperty;
	var obj_getProperty,
	    obj_setProperty,
	    obj_hasProperty,
	    obj_defineProperty,
	    obj_extend,
	    obj_extendDefaults,
	    obj_extendProperties,
	    obj_extendPropertiesDefaults,
	    obj_extendMany,
	    obj_create;
	(function(){
		(function(){
			_Array_slice = Array.prototype.slice;
			var _Array_splice = Array.prototype.splice;
			var _Array_indexOf = Array.prototype.indexOf;
			var _Object_hasOwnProp = Object.hasOwnProperty;
			_Object_getOwnProp = Object.getOwnPropertyDescriptor;
			_Object_defineProperty = Object.defineProperty;
			var _global = typeof global !== 'undefined'
			    ? global
			    : window;
			var _document = typeof window !== 'undefined' && window.document != null
			    ? window.document
			    : null;
			
		}());
		obj_getProperty = function (obj_, path) {
		    if (path.indexOf('.') === -1) {
		        return obj_[path];
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length, i = -1;
		    while (obj != null && ++i < imax) {
		        var key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        obj = obj[key];
		    }
		    return obj;
		}
		;
		obj_setProperty = function (obj_, path, val) {
		    if (path.indexOf('.') === -1) {
		        obj_[path] = val;
		        return;
		    }
		    var obj = obj_, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (key.charCodeAt(key.length - 1) === 63 /*?*/) {
		            key = key.slice(0, -1);
		        }
		        var x = obj[key];
		        if (x == null) {
		            x = obj[key] = {};
		        }
		        obj = x;
		    }
		    obj[chain[i]] = val;
		}
		;
		obj_hasProperty = function (obj, path) {
		    var x = obj_getProperty(obj, path);
		    return x !== void 0;
		}
		;
		obj_defineProperty = function (obj, path, dscr) {
		    var x = obj, chain = path.split('.'), imax = chain.length - 1, i = -1, key;
		    while (++i < imax) {
		        key = chain[i];
		        if (x[key] == null)
		            x[key] = {};
		        x = x[key];
		    }
		    key = chain[imax];
		    if (_Object_defineProperty) {
		        if (dscr.writable === void 0)
		            dscr.writable = true;
		        if (dscr.configurable === void 0)
		            dscr.configurable = true;
		        if (dscr.enumerable === void 0)
		            dscr.enumerable = true;
		        _Object_defineProperty(x, key, dscr);
		        return;
		    }
		    x[key] = dscr.value === void 0
		        ? dscr.value
		        : (dscr.get && dscr.get());
		}
		;
		obj_extend = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        a[key] = b[key];
		    }
		    return a;
		}
		;
		obj_extendDefaults = function (a, b) {
		    if (b == null)
		        return a || {};
		    if (a == null)
		        return obj_create(b);
		    for (var key in b) {
		        if (a[key] == null) {
		            a[key] = b[key];
		            continue;
		        }
		        if (key === 'toString' && a[key] === Object.prototype.toString) {
		            a[key] = b[key];
		        }
		    }
		    return a;
		}
		var extendPropertiesFactory = function (overwriteProps) {
		    if (_Object_getOwnProp == null)
		        return overwriteProps ? obj_extend : obj_extendDefaults;
		    return function (a, b) {
		        if (b == null)
		            return a || {};
		        if (a == null)
		            return obj_create(b);
		        var key, descr, ownDescr;
		        for (key in b) {
		            descr = _Object_getOwnProp(b, key);
		            if (descr == null)
		                continue;
		            if (overwriteProps !== true) {
		                ownDescr = _Object_getOwnProp(a, key);
		                if (ownDescr != null) {
		                    continue;
		                }
		            }
		            if (descr.hasOwnProperty('value')) {
		                a[key] = descr.value;
		                continue;
		            }
		            _Object_defineProperty(a, key, descr);
		        }
		        return a;
		    };
		};
		obj_extendProperties = extendPropertiesFactory(true);
		obj_extendPropertiesDefaults = extendPropertiesFactory(false);
		obj_extendMany = function (a, arg1, arg2, arg3, arg4, arg5, arg6) {
		    var imax = arguments.length, i = 1;
		    for (; i < imax; i++) {
		        a = obj_extend(a, arguments[i]);
		    }
		    return a;
		}
		;
		function obj_toFastProps(obj) {
		    /*jshint -W027*/
		    function F() { }
		    F.prototype = obj;
		    new F();
		    return;
		    eval(obj);
		}
		;
		var _Object_create = Object.create || function (x) {
		    var Ctor = function () { };
		    Ctor.prototype = x;
		    return new Ctor;
		};
		obj_create = _Object_create;
		
	}());
	var class_create,
	    class_createEx;
	(function(){
		;
		/**
		 * create([...Base], Proto)
		 * Base: Function | Object
		 * Proto: Object {
		 *    constructor: ?Function
		 *    ...
		 */
		class_create = createClassFactory(obj_extendDefaults);
		// with property accessor functions support
		class_createEx = createClassFactory(obj_extendPropertiesDefaults);
		function createClassFactory(extendDefaultsFn) {
		    return function (a, b, c, d, e, f, g, h) {
		        var args = _Array_slice.call(arguments), Proto = args.pop();
		        if (Proto == null)
		            Proto = {};
		        var Ctor;
		        if (Proto.hasOwnProperty('constructor')) {
		            Ctor = Proto.constructor;
		            if (Ctor.prototype === void 0) {
		                var es6Method = Ctor;
		                Ctor = function ClassCtor() {
		                    var imax = arguments.length, i = -1, args = new Array(imax);
		                    while (++i < imax)
		                        args[i] = arguments[i];
		                    return es6Method.apply(this, args);
		                };
		            }
		        }
		        else {
		            Ctor = function ClassCtor() { };
		        }
		        var i = args.length, BaseCtor, x;
		        while (--i > -1) {
		            x = args[i];
		            if (typeof x === 'function') {
		                BaseCtor = wrapFn(x, BaseCtor);
		                x = x.prototype;
		            }
		            extendDefaultsFn(Proto, x);
		        }
		        return createClass(wrapFn(BaseCtor, Ctor), Proto);
		    };
		}
		function createClass(Ctor, Proto) {
		    Proto.constructor = Ctor;
		    Ctor.prototype = Proto;
		    return Ctor;
		}
		function wrapFn(fnA, fnB) {
		    if (fnA == null) {
		        return fnB;
		    }
		    if (fnB == null) {
		        return fnA;
		    }
		    return function () {
		        var args = _Array_slice.call(arguments);
		        var x = fnA.apply(this, args);
		        if (x !== void 0)
		            return x;
		        return fnB.apply(this, args);
		    };
		}
		
	}());
	var arr_remove,
	    arr_each,
	    arr_indexOf,
	    arr_contains,
	    arr_pushMany;
	(function(){
		arr_remove = function (array, x) {
		    var i = array.indexOf(x);
		    if (i === -1)
		        return false;
		    array.splice(i, 1);
		    return true;
		}
		;
		arr_each = function (arr, fn, ctx) {
		    arr.forEach(fn, ctx);
		}
		;
		arr_indexOf = function (arr, x) {
		    return arr.indexOf(x);
		}
		;
		arr_contains = function (arr, x) {
		    return arr.indexOf(x) !== -1;
		}
		;
		arr_pushMany = function (arr, arrSource) {
		    if (arrSource == null || arr == null || arr === arrSource)
		        return;
		    var il = arr.length, jl = arrSource.length, j = -1;
		    while (++j < jl) {
		        arr[il + j] = arrSource[j];
		    }
		}
		;
		function arr_distinct(arr, compareFn) {
		    var out = [];
		    var hash = compareFn == null ? obj_create(null) : null;
		    outer: for (var i = 0; i < arr.length; i++) {
		        var x = arr[i];
		        if (compareFn == null) {
		            if (hash[x] === 1) {
		                continue;
		            }
		            hash[x] = 1;
		        }
		        else {
		            for (var j = i - 1; j > -1; j--) {
		                var prev = arr[j];
		                if (compareFn(x, prev)) {
		                    continue outer;
		                }
		            }
		        }
		        out.push(x);
		    }
		    return out;
		}
		
	}());
	var is_Function,
	    is_Object,
	    is_Array,
	    is_ArrayLike,
	    is_String,
	    is_notEmptyString,
	    is_rawObject,
	    is_Date,
	    is_DOM,
	    is_NODE;
	(function(){
		is_Function = function (x) {
		    return typeof x === 'function';
		}
		is_Object = function (x) {
		    return x != null && typeof x === 'object';
		}
		is_Array = function (arr) {
		    return (arr != null &&
		        typeof arr === 'object' &&
		        typeof arr.length === 'number' &&
		        typeof arr.slice === 'function');
		}
		is_ArrayLike = is_Array;
		is_String = function (x) {
		    return typeof x === 'string';
		}
		is_notEmptyString = function (x) {
		    return typeof x === 'string' && x !== '';
		}
		is_rawObject = function (x) {
		    return x != null && typeof x === 'object' && x.constructor === Object;
		}
		is_Date = function (x) {
		    if (x == null || typeof x !== 'object') {
		        return false;
		    }
		    if (x.getFullYear != null && isNaN(x) === false) {
		        return true;
		    }
		    return false;
		}
		function is_PromiseLike(x) {
		    return x != null && typeof x === 'object' && typeof x.then === 'function';
		}
		function is_Observable(x) {
		    return x != null && typeof x === 'object' && typeof x.subscribe === 'function';
		}
		is_DOM = typeof window !== 'undefined' && window.navigator != null;
		is_NODE = !is_DOM;
		
	}());
	var str_format,
	    str_dedent;
	(function(){
		str_format = function (str_, a, b, c, d) {
		    var str = str_, imax = arguments.length, i = 0, x;
		    while (++i < imax) {
		        x = arguments[i];
		        if (is_Object(x) && x.toJSON) {
		            x = x.toJSON();
		        }
		        str_ = str_.replace(rgxNum(i - 1), String(x));
		    }
		    return str_;
		}
		;
		str_dedent = function (str) {
		    var rgx = /^[\t ]*\S/gm, match = rgx.exec(str), count = -1;
		    while (match != null) {
		        var x = match[0].length;
		        if (count === -1 || x < count)
		            count = x;
		        match = rgx.exec(str);
		    }
		    if (--count < 1)
		        return str;
		    var replacer = new RegExp('^[\\t ]{1,' + count + '}', 'gm');
		    return str
		        .replace(replacer, '')
		        .replace(/^[\t ]*\r?\n/, '')
		        .replace(/\r?\n[\t ]*$/, '');
		}
		;
		var rgxNum;
		(function () {
		    rgxNum = function (num) {
		        return cache_[num] || (cache_[num] = new RegExp('\\{' + num + '\\}', 'g'));
		    };
		    var cache_ = {};
		}());
		
	}());
	var error_createClass;
	(function(){
		error_createClass = function (name, Proto, stackSliceFrom) {
		    var Ctor = _createCtor(Proto, stackSliceFrom);
		    Ctor.prototype = new Error;
		    Proto.constructor = Error;
		    Proto.name = name;
		    obj_extend(Ctor.prototype, Proto);
		    return Ctor;
		}
		;
		function error_formatSource(source, index, filename) {
		    var cursor = error_cursor(source, index), lines = cursor[0], lineNum = cursor[1], rowNum = cursor[2], str = '';
		    if (filename != null) {
		        str += str_format(' at {0}:{1}:{2}\n', filename, lineNum, rowNum);
		    }
		    return str + error_formatCursor(lines, lineNum, rowNum);
		}
		;
		/**
		 * @returns [ lines, lineNum, rowNum ]
		 */
		function error_cursor(str, index) {
		    var lines = str.substring(0, index).split('\n'), line = lines.length, row = index + 1 - lines.slice(0, line - 1).join('\n').length;
		    if (line > 1) {
		        // remove trailing newline
		        row -= 1;
		    }
		    return [str.split('\n'), line, row];
		}
		;
		function error_formatCursor(lines, lineNum, rowNum) {
		    var BEFORE = 3, AFTER = 2, i = lineNum - BEFORE, imax = i + BEFORE + AFTER, str = '';
		    if (i < 0)
		        i = 0;
		    if (imax > lines.length)
		        imax = lines.length;
		    var lineNumberLength = String(imax).length, lineNumber;
		    for (; i < imax; i++) {
		        if (str)
		            str += '\n';
		        lineNumber = ensureLength(i + 1, lineNumberLength);
		        str += lineNumber + '|' + lines[i];
		        if (i + 1 === lineNum) {
		            str += '\n' + repeat(' ', lineNumberLength + 1);
		            str += lines[i].substring(0, rowNum - 1).replace(/[^\s]/g, ' ');
		            str += '^';
		        }
		    }
		    return str;
		}
		;
		function ensureLength(num, count) {
		    var str = String(num);
		    while (str.length < count) {
		        str += ' ';
		    }
		    return str;
		}
		function repeat(char_, count) {
		    var str = '';
		    while (--count > -1) {
		        str += char_;
		    }
		    return str;
		}
		function _createCtor(Proto, stackFrom) {
		    var Ctor = Proto.hasOwnProperty('constructor')
		        ? Proto.constructor
		        : null;
		    return function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        obj_defineProperty(this, 'stack', {
		            value: _prepairStack(stackFrom || 3)
		        });
		        obj_defineProperty(this, 'message', {
		            value: str_format.apply(this, arguments)
		        });
		        if (Ctor != null) {
		            Ctor.apply(this, arguments);
		        }
		    };
		}
		function _prepairStack(sliceFrom) {
		    var stack = new Error().stack;
		    return stack == null ? null : stack
		        .split('\n')
		        .slice(sliceFrom)
		        .join('\n');
		}
		
	}());
	var fn_proxy,
	    fn_apply,
	    fn_doNothing,
	    fn_createByPattern;
	(function(){
		fn_proxy = function (fn, ctx) {
		    return function () {
		        var imax = arguments.length, args = new Array(imax), i = 0;
		        for (; i < imax; i++)
		            args[i] = arguments[i];
		        return fn_apply(fn, ctx, args);
		    };
		}
		;
		fn_apply = function (fn, ctx, args) {
		    var l = args.length;
		    if (0 === l)
		        return fn.call(ctx);
		    if (1 === l)
		        return fn.call(ctx, args[0]);
		    if (2 === l)
		        return fn.call(ctx, args[0], args[1]);
		    if (3 === l)
		        return fn.call(ctx, args[0], args[1], args[2]);
		    if (4 === l)
		        return fn.call(ctx, args[0], args[1], args[2], args[3]);
		    return fn.apply(ctx, args);
		}
		;
		fn_doNothing = function () {
		    return false;
		}
		;
		fn_createByPattern = function (definitions, ctx) {
		    var imax = definitions.length;
		    return function () {
		        var l = arguments.length, i = -1, def;
		        outer: while (++i < imax) {
		            def = definitions[i];
		            if (def.pattern.length !== l) {
		                continue;
		            }
		            var j = -1;
		            while (++j < l) {
		                var fn = def.pattern[j];
		                var val = arguments[j];
		                if (fn(val) === false) {
		                    continue outer;
		                }
		            }
		            return def.handler.apply(ctx, arguments);
		        }
		        console.error('InvalidArgumentException for a function', definitions, arguments);
		        return null;
		    };
		}
		;
		
	}());
	var class_Dfr;
	(function(){
		//@TODO remove constructr run
		class_Dfr = function (mix) {
		    if (typeof mix === 'function') {
		        return class_Dfr.run(mix);
		    }
		};
		class_Dfr.prototype = {
		    _isAsync: true,
		    _done: null,
		    _fail: null,
		    _always: null,
		    _resolved: null,
		    _rejected: null,
		    defer: function () {
		        this._rejected = null;
		        this._resolved = null;
		        return this;
		    },
		    isResolved: function () {
		        return this._resolved != null;
		    },
		    isRejected: function () {
		        return this._rejected != null;
		    },
		    isBusy: function () {
		        return this._resolved == null && this._rejected == null;
		    },
		    resolve: function () {
		        var done = this._done, always = this._always;
		        this._resolved = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(done, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    },
		    reject: function () {
		        var fail = this._fail, always = this._always;
		        this._rejected = arguments;
		        dfr_clearListeners(this);
		        arr_callOnce(fail, this, arguments);
		        arr_callOnce(always, this, [this]);
		        return this;
		    },
		    then: function (filterSuccess, filterError) {
		        return this.pipe(filterSuccess, filterError);
		    },
		    done: function (callback) {
		        if (this._rejected != null)
		            return this;
		        return dfr_bind(this, this._resolved, this._done || (this._done = []), callback);
		    },
		    fail: function (callback) {
		        if (this._resolved != null)
		            return this;
		        return dfr_bind(this, this._rejected, this._fail || (this._fail = []), callback);
		    },
		    always: function (callback) {
		        return dfr_bind(this, this._rejected || this._resolved, this._always || (this._always = []), callback);
		    },
		    pipe: function (mix /* ..methods */) {
		        var dfr;
		        if (typeof mix === 'function') {
		            dfr = new class_Dfr();
		            var done_ = mix, fail_ = arguments.length > 1
		                ? arguments[1]
		                : null;
		            this
		                .done(delegate(dfr, 'resolve', done_))
		                .fail(delegate(dfr, 'reject', fail_));
		            return dfr;
		        }
		        dfr = mix;
		        var imax = arguments.length, done = imax === 1, fail = imax === 1, i = 0, x;
		        while (++i < imax) {
		            x = arguments[i];
		            switch (x) {
		                case 'done':
		                    done = true;
		                    break;
		                case 'fail':
		                    fail = true;
		                    break;
		                default:
		                    console.error('Unsupported pipe channel', arguments[i]);
		                    break;
		            }
		        }
		        done && this.done(delegate(dfr, 'resolve'));
		        fail && this.fail(delegate(dfr, 'reject'));
		        function pipe(dfr, method) {
		            return function () {
		                dfr[method].apply(dfr, arguments);
		            };
		        }
		        function delegate(dfr, name, fn) {
		            return function () {
		                if (fn != null) {
		                    var override = fn.apply(this, arguments);
		                    if (override != null && override !== dfr) {
		                        if (isDeferred(override)) {
		                            override.then(delegate(dfr, 'resolve'), delegate(dfr, 'reject'));
		                            return;
		                        }
		                        dfr[name](override);
		                        return;
		                    }
		                }
		                dfr[name].apply(dfr, arguments);
		            };
		        }
		        return this;
		    },
		    pipeCallback: function () {
		        var self = this;
		        return function (error) {
		            if (error != null) {
		                self.reject(error);
		                return;
		            }
		            var args = _Array_slice.call(arguments, 1);
		            fn_apply(self.resolve, self, args);
		        };
		    },
		    resolveDelegate: function () {
		        return fn_proxy(this.resolve, this);
		    },
		    rejectDelegate: function () {
		        return fn_proxy(this.reject, this);
		    }
		};
		class_Dfr.resolve = function (a, b, c) {
		    var dfr = new class_Dfr();
		    return dfr.resolve.apply(dfr, _Array_slice.call(arguments));
		};
		class_Dfr.reject = function (error) {
		    var dfr = new class_Dfr();
		    return dfr.reject(error);
		};
		class_Dfr.run = function (fn, ctx) {
		    var dfr = new class_Dfr();
		    if (ctx == null)
		        ctx = dfr;
		    fn.call(ctx, fn_proxy(dfr.resolve, ctx), fn_proxy(dfr.reject, dfr), dfr);
		    return dfr;
		};
		class_Dfr.all = function (promises) {
		    var dfr = new class_Dfr, arr = new Array(promises.length), wait = promises.length, error = null;
		    if (wait === 0) {
		        return dfr.resolve(arr);
		    }
		    function tick(index) {
		        if (error != null) {
		            return;
		        }
		        var args = _Array_slice.call(arguments, 1);
		        arr.splice.apply(arr, [index, 0].concat(args));
		        if (--wait === 0) {
		            dfr.resolve(arr);
		        }
		    }
		    function onReject(err) {
		        dfr.reject(error = err);
		    }
		    var imax = promises.length, i = -1;
		    while (++i < imax) {
		        var x = promises[i];
		        if (x == null || x.then == null) {
		            tick(i);
		            continue;
		        }
		        x.then(tick.bind(null, i), onReject);
		    }
		    return dfr;
		};
		// PRIVATE
		function dfr_bind(dfr, arguments_, listeners, callback) {
		    if (callback == null)
		        return dfr;
		    if (arguments_ != null)
		        fn_apply(callback, dfr, arguments_);
		    else
		        listeners.push(callback);
		    return dfr;
		}
		function dfr_clearListeners(dfr) {
		    dfr._done = null;
		    dfr._fail = null;
		    dfr._always = null;
		}
		function arr_callOnce(arr, ctx, args) {
		    if (arr == null)
		        return;
		    var imax = arr.length, i = -1, fn;
		    while (++i < imax) {
		        fn = arr[i];
		        if (fn)
		            fn_apply(fn, ctx, args);
		    }
		    arr.length = 0;
		}
		function isDeferred(x) {
		    return x != null
		        && typeof x === 'object'
		        && is_Function(x.then);
		}
		
	}());
	var class_Uri;
	(function(){
		class_Uri = class_create({
		    protocol: null,
		    value: null,
		    path: null,
		    file: null,
		    extension: null,
		    constructor: function (uri) {
		        if (uri == null)
		            return this;
		        if (util_isUri(uri))
		            return uri.combine('');
		        uri = normalize_uri(uri);
		        this.value = uri;
		        parse_protocol(this);
		        parse_host(this);
		        parse_search(this);
		        parse_file(this);
		        // normilize path - "/some/path"
		        this.path = normalize_pathsSlashes(this.value);
		        if (/^[\w]+:\//.test(this.path)) {
		            this.path = '/' + this.path;
		        }
		        return this;
		    },
		    cdUp: function () {
		        var path = this.path;
		        if (path == null || path === '' || path === '/') {
		            return this;
		        }
		        // win32 - is base drive
		        if (/^\/?[a-zA-Z]+:\/?$/.test(path)) {
		            return this;
		        }
		        this.path = path.replace(/\/?[^\/]+\/?$/i, '');
		        return this;
		    },
		    /**
		     * '/path' - relative to host
		     * '../path', 'path','./path' - relative to current path
		     */
		    combine: function (path) {
		        if (util_isUri(path)) {
		            path = path.toString();
		        }
		        if (!path) {
		            return util_clone(this);
		        }
		        if (rgx_win32Drive.test(path)) {
		            return new class_Uri(path);
		        }
		        var uri = util_clone(this);
		        uri.value = path;
		        parse_search(uri);
		        parse_file(uri);
		        if (!uri.value) {
		            return uri;
		        }
		        path = uri.value.replace(/^\.\//i, '');
		        if (path[0] === '/') {
		            uri.path = path;
		            return uri;
		        }
		        while (/^(\.\.\/?)/ig.test(path)) {
		            uri.cdUp();
		            path = path.substring(3);
		        }
		        uri.path = normalize_pathsSlashes(util_combinePathes(uri.path, path));
		        return uri;
		    },
		    toString: function () {
		        var protocol = this.protocol ? this.protocol + '://' : '';
		        var path = util_combinePathes(this.host, this.path, this.file) + (this.search || '');
		        var str = protocol + path;
		        if (!(this.file || this.search) && this.path) {
		            str += '/';
		        }
		        return str;
		    },
		    toPathAndQuery: function () {
		        return util_combinePathes(this.path, this.file) + (this.search || '');
		    },
		    /**
		     * @return Current Uri Path{String} that is relative to @arg1 Uri
		     */
		    toRelativeString: function (uri) {
		        if (typeof uri === 'string')
		            uri = new class_Uri(uri);
		        if (this.path.indexOf(uri.path) === 0) {
		            // host folder
		            var p = this.path ? this.path.replace(uri.path, '') : '';
		            if (p[0] === '/')
		                p = p.substring(1);
		            return util_combinePathes(p, this.file) + (this.search || '');
		        }
		        // sub folder
		        var current = this.path.split('/'), relative = uri.path.split('/'), commonpath = '', i = 0, length = Math.min(current.length, relative.length);
		        for (; i < length; i++) {
		            if (current[i] === relative[i])
		                continue;
		            break;
		        }
		        if (i > 0)
		            commonpath = current.splice(0, i).join('/');
		        if (commonpath) {
		            var sub = '', path = uri.path, forward;
		            while (path) {
		                if (this.path.indexOf(path) === 0) {
		                    forward = this.path.replace(path, '');
		                    break;
		                }
		                path = path.replace(/\/?[^\/]+\/?$/i, '');
		                sub += '../';
		            }
		            return util_combinePathes(sub, forward, this.file);
		        }
		        return this.toString();
		    },
		    toLocalFile: function () {
		        var path = util_combinePathes(this.host, this.path, this.file);
		        return util_win32Path(path);
		    },
		    toLocalDir: function () {
		        var path = util_combinePathes(this.host, this.path, '/');
		        return util_win32Path(path);
		    },
		    toDir: function () {
		        var str = this.protocol ? this.protocol + '://' : '';
		        return str + util_combinePathes(this.host, this.path, '/');
		    },
		    isRelative: function () {
		        return !(this.protocol || this.host);
		    },
		    getName: function () {
		        return this.file.replace('.' + this.extension, '');
		    }
		});
		var rgx_protocol = /^([\w\d]+):\/\//, rgx_extension = /\.([\w\d]+)$/i, rgx_win32Drive = /(^\/?\w{1}:)(\/|$)/, rgx_fileWithExt = /([^\/]+(\.[\w\d]+)?)$/i;
		function util_isUri(object) {
		    return object && typeof object === 'object' && typeof object.combine === 'function';
		}
		function util_combinePathes(a, b, c, d) {
		    var args = arguments, str = '';
		    for (var i = 0, x, imax = arguments.length; i < imax; i++) {
		        x = arguments[i];
		        if (!x)
		            continue;
		        if (!str) {
		            str = x;
		            continue;
		        }
		        if (str[str.length - 1] !== '/')
		            str += '/';
		        str += x[0] === '/' ? x.substring(1) : x;
		    }
		    return str;
		}
		function normalize_pathsSlashes(str) {
		    if (str[str.length - 1] === '/') {
		        return str.substring(0, str.length - 1);
		    }
		    return str;
		}
		function util_clone(source) {
		    var uri = new class_Uri(), key;
		    for (key in source) {
		        if (typeof source[key] === 'string') {
		            uri[key] = source[key];
		        }
		    }
		    return uri;
		}
		function normalize_uri(str) {
		    return str
		        .replace(/\\/g, '/')
		        .replace(/^\.\//, '')
		        // win32 drive path
		        .replace(/^(\w+):\/([^\/])/, '/$1:/$2');
		}
		function util_win32Path(path) {
		    if (rgx_win32Drive.test(path) && path[0] === '/') {
		        return path.substring(1);
		    }
		    return path;
		}
		function parse_protocol(obj) {
		    var match = rgx_protocol.exec(obj.value);
		    if (match == null && obj.value[0] === '/') {
		        obj.protocol = 'file';
		    }
		    if (match == null)
		        return;
		    obj.protocol = match[1];
		    obj.value = obj.value.substring(match[0].length);
		}
		function parse_host(obj) {
		    if (obj.protocol == null)
		        return;
		    if (obj.protocol === 'file') {
		        var match = rgx_win32Drive.exec(obj.value);
		        if (match) {
		            obj.host = match[1];
		            obj.value = obj.value.substring(obj.host.length);
		        }
		        return;
		    }
		    var pathStart = obj.value.indexOf('/', 2);
		    obj.host = ~pathStart
		        ? obj.value.substring(0, pathStart)
		        : obj.value;
		    obj.value = obj.value.replace(obj.host, '');
		}
		function parse_search(obj) {
		    var question = obj.value.indexOf('?');
		    if (question === -1)
		        return;
		    obj.search = obj.value.substring(question);
		    obj.value = obj.value.substring(0, question);
		}
		function parse_file(obj) {
		    var match = rgx_fileWithExt.exec(obj.value), file = match == null ? null : match[1];
		    if (file == null) {
		        return;
		    }
		    obj.file = file;
		    obj.value = obj.value.substring(0, obj.value.length - file.length);
		    obj.value = normalize_pathsSlashes(obj.value);
		    match = rgx_extension.exec(file);
		    obj.extension = match == null ? null : match[1];
		}
		class_Uri.combinePathes = util_combinePathes;
		class_Uri.combine = util_combinePathes;
		
	}());
	var class_EventEmitter;
	(function(){
		class_EventEmitter = function () {
		    this._listeners = {};
		};
		class_EventEmitter.prototype = {
		    on: function (event, fn) {
		        if (fn != null) {
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    },
		    once: function (event, fn) {
		        if (fn != null) {
		            fn._once = true;
		            (this._listeners[event] || (this._listeners[event] = [])).push(fn);
		        }
		        return this;
		    },
		    pipe: function (event) {
		        var that = this, args;
		        return function () {
		            args = _Array_slice.call(arguments);
		            args.unshift(event);
		            fn_apply(that.trigger, that, args);
		        };
		    },
		    emit: event_trigger,
		    trigger: event_trigger,
		    off: function (event, fn) {
		        var listeners = this._listeners[event];
		        if (listeners == null)
		            return this;
		        if (arguments.length === 1) {
		            listeners.length = 0;
		            return this;
		        }
		        var imax = listeners.length, i = -1;
		        while (++i < imax) {
		            if (listeners[i] === fn) {
		                listeners.splice(i, 1);
		                i--;
		                imax--;
		            }
		        }
		        return this;
		    }
		};
		function event_trigger() {
		    var args = _Array_slice.call(arguments), event = args.shift(), fns = this._listeners[event], fn, imax, i = 0;
		    if (fns == null)
		        return this;
		    for (imax = fns.length; i < imax; i++) {
		        fn = fns[i];
		        fn_apply(fn, this, args);
		        if (fn._once === true) {
		            fns.splice(i, 1);
		            i--;
		            imax--;
		        }
		    }
		    return this;
		}
		
	}());
	var Lib = {
	    class_Dfr: class_Dfr,
	    class_EventEmitter: class_EventEmitter,
	    class_Uri: class_Uri,
	    class_create: class_create,
	    class_createEx: class_createEx,
	    arr_remove: arr_remove,
	    arr_each: arr_each,
	    arr_indexOf: arr_indexOf,
	    arr_contains: arr_contains,
	    arr_pushMany: arr_pushMany,
	    error_createClass: error_createClass,
	    fn_createByPattern: fn_createByPattern,
	    fn_doNothing: fn_doNothing,
	    obj_getProperty: obj_getProperty,
	    obj_setProperty: obj_setProperty,
	    obj_hasProperty: obj_hasProperty,
	    obj_extend: obj_extend,
	    obj_extendDefaults: obj_extendDefaults,
	    obj_extendMany: obj_extendMany,
	    obj_extendProperties: obj_extendProperties,
	    obj_extendPropertiesDefaults: obj_extendPropertiesDefaults,
	    obj_create: obj_create,
	    obj_defineProperty: obj_defineProperty,
	    is_Function: is_Function,
	    is_Array: is_Array,
	    is_ArrayLike: is_ArrayLike,
	    is_String: is_String,
	    is_Object: is_Object,
	    is_notEmptyString: is_notEmptyString,
	    is_rawObject: is_rawObject,
	    is_Date: is_Date,
	    is_NODE: is_NODE,
	    is_DOM: is_DOM,
	    str_format: str_format,
	    str_dedent: str_dedent
	};
	
    
    for (var key in Lib) {
        owner[property][key] = Lib[key];
    }
}));;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_atma_utils_lib_utils === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_atma_utils_lib_utils) && __isObj(module.exports)) {
        Object.assign(_node_modules_atma_utils_lib_utils, module.exports);
    } else {
        _node_modules_atma_utils_lib_utils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_async_Pool;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_async_Pool != null ? _src_async_Pool : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncPool = void 0;
const atma_utils_1 = _node_modules_atma_utils_lib_utils;
const $$setImmediate = typeof setImmediate === 'undefined'
    ? function (fn) {
        new Promise(() => fn());
    }
    : setImmediate;
class AsyncPool {
    constructor(stream, threads = 2, errors = 'reject') {
        this.stream = stream;
        this.threads = threads;
        this.errors = errors;
        this.index = -1;
        this.resolved = false;
        this.rejected = false;
        this.done = false;
        this.time = Date.now();
        this.results = [];
        this.queue = [];
        this.promise = new atma_utils_1.class_Dfr;
    }
    start() {
        $$setImmediate(() => this.tick());
        return this.promise;
    }
    tick() {
        while (this.done !== true && this.queue.length < this.threads) {
            let index = ++this.index;
            let promise = this.stream.nextAsync();
            this.waitFor(promise, index);
        }
        if (this.queue.length === 0 && this.resolved !== true) {
            this.resolved = true;
            this.promise.resolve(this.results);
        }
    }
    waitFor(promise, index) {
        this.queue.push(promise);
        promise.then(result => {
            $$setImmediate(() => this.continueFor(promise, index, null, result));
        }, error => {
            $$setImmediate(() => this.continueFor(promise, index, error, null));
        });
    }
    continueFor(promise, index, error, result) {
        if (this.rejected === true) {
            return;
        }
        if (error != null) {
            if (this.errors === 'reject') {
                this.rejected = true;
                this.promise.reject(error);
                return;
            }
            if (this.errors === 'include') {
                result = { value: error, index };
            }
        }
        if (result != null) {
            if (result.done === true) {
                this.done = true;
            }
            else {
                let i = result.index;
                if (i == null) {
                    i = index;
                }
                this.results[index] = result.value;
            }
        }
        let i = this.queue.indexOf(promise);
        this.queue.splice(i, 1);
        this.tick();
    }
}
exports.AsyncPool = AsyncPool;
//# sourceMappingURL=Pool.js.map
//# sourceMappingURL=Pool.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_async_Pool === module.exports) {
        // do nothing if
    } else if (__isObj(_src_async_Pool) && __isObj(module.exports)) {
        Object.assign(_src_async_Pool, module.exports);
    } else {
        _src_async_Pool = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_Aggregation;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_Aggregation != null ? _src_utils_Aggregation : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregation = void 0;
var Aggregation;
(function (Aggregation) {
    function getMinMaxByEntryInner(stream, getFn, compare) {
        let outVal = null;
        let outEntry = null;
        stream.reset();
        if (stream.isAsync) {
            return getMinMaxByEntryInnerAsync(stream, getFn, compare);
        }
        let i = 0;
        while (true) {
            let entry = stream.next();
            if (entry == null || entry.done === true) {
                break;
            }
            let val = getFn(entry.value, i++);
            if (val == null) {
                continue;
            }
            if (outVal == null) {
                outVal = val;
                outEntry = entry.value;
                continue;
            }
            if (compare === 'max' && outVal < val) {
                outVal = val;
                outEntry = entry.value;
            }
            if (compare === 'min' && outVal > val) {
                outVal = val;
                outEntry = entry.value;
            }
        }
        return { value: outVal, entry: outEntry };
    }
    function getMinMaxByEntryInnerAsync(stream, getFn, compare) {
        return __awaiter(this, void 0, void 0, function* () {
            let outVal = null;
            let outEntry = null;
            stream.reset();
            let i = 0;
            while (true) {
                let entry = yield stream.nextAsync();
                if (entry == null || entry.done === true) {
                    break;
                }
                let val = yield getFn(entry.value, i++);
                if (val == null) {
                    continue;
                }
                if (outVal == null) {
                    outVal = val;
                    outEntry = entry.value;
                    continue;
                }
                if (compare === 'max' && outVal < val) {
                    outVal = val;
                    outEntry = entry.value;
                }
                if (compare === 'min' && outVal > val) {
                    outVal = val;
                    outEntry = entry.value;
                }
            }
            return { value: outVal, entry: outEntry };
        });
    }
    function getMinMaxValueBy(stream, getFn, compare) {
        if (stream.isAsync) {
            return getMinMaxByEntryInnerAsync(stream, getFn, compare);
        }
        let x = getMinMaxByEntryInner(stream, getFn, compare);
        return x.value;
    }
    Aggregation.getMinMaxValueBy = getMinMaxValueBy;
    function getMinMaxValueByAsync(stream, getFn, compare) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = yield getMinMaxByEntryInner(stream, getFn, compare);
            return x.value;
        });
    }
    Aggregation.getMinMaxValueByAsync = getMinMaxValueByAsync;
    function getMinMaxItemBy(stream, getFn, compare) {
        if (stream.isAsync) {
            return getMinMaxByEntryInnerAsync(stream, getFn, compare);
        }
        let x = getMinMaxByEntryInner(stream, getFn, compare);
        return x.entry;
    }
    Aggregation.getMinMaxItemBy = getMinMaxItemBy;
    function getMinMaxItemByAsync(stream, getFn, compare) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = yield getMinMaxByEntryInner(stream, getFn, compare);
            return x.entry;
        });
    }
    Aggregation.getMinMaxItemByAsync = getMinMaxItemByAsync;
    function sum(stream, fn, startVal) {
        stream.reset();
        if (stream.isAsync) {
            return sumAsync(stream, fn, startVal);
        }
        let sum = startVal;
        let i = 0;
        while (true) {
            let entry = stream.next();
            if (entry == null || entry.done === true) {
                break;
            }
            let value = fn(entry.value, i++);
            if (value == null) {
                continue;
            }
            sum += value;
        }
        return sum;
    }
    Aggregation.sum = sum;
    function sumAsync(stream, fn, startVal) {
        return __awaiter(this, void 0, void 0, function* () {
            stream.reset();
            let sum = startVal;
            let i = 0;
            while (true) {
                let entry = yield stream.nextAsync();
                if (entry == null || entry.done === true) {
                    break;
                }
                let value = yield fn(entry.value, i++);
                if (value == null) {
                    continue;
                }
                sum += value;
            }
            return sum;
        });
    }
    Aggregation.sumAsync = sumAsync;
})(Aggregation = exports.Aggregation || (exports.Aggregation = {}));
//# sourceMappingURL=Aggregation.js.map
//# sourceMappingURL=Aggregation.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_Aggregation === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_Aggregation) && __isObj(module.exports)) {
        Object.assign(_src_utils_Aggregation, module.exports);
    } else {
        _src_utils_Aggregation = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_is != null ? _src_utils_is : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_Promise = void 0;
function is_Promise(val) {
    return val != null
        && typeof val === 'object'
        && typeof val.then === 'function';
}
exports.is_Promise = is_Promise;
//# sourceMappingURL=is.js.map
//# sourceMappingURL=is.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_is === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_is) && __isObj(module.exports)) {
        Object.assign(_src_utils_is, module.exports);
    } else {
        _src_utils_is = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_AlotProto;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_AlotProto != null ? _src_AlotProto : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlotProto = void 0;
const Pool_1 = _src_async_Pool;
const Aggregation_1 = _src_utils_Aggregation;
/** Loading all stream from extra exports file to fix circular dependencies */
const exports_1 = _src_streams_exports;
const is_1 = _src_utils_is;
class AlotProto {
    constructor(stream, opts) {
        var _a;
        this.stream = stream;
        this.isAsync = false;
        this.isAsync = stream.isAsync || ((_a = opts === null || opts === void 0 ? void 0 : opts.async) !== null && _a !== void 0 ? _a : false);
    }
    next() {
        let x = this.stream.next();
        return x;
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.next();
        });
    }
    [Symbol.iterator]() {
        return this;
    }
    /**
     * Resets current stream to the beginning.
     */
    reset() {
        this.stream.reset();
        return this;
    }
    /**
     * Creates filtered stream. Is Lazy.
     * ```
     * alot(users).filter(x => x.age > 20).take(3).toArray();
     * ```
     * Filter is evaluated only N times, to match only 3 items.
     */
    filter(fn) {
        return new exports_1.FilterStream(this, fn);
    }
    /**
     * Creates async filted stream. Same as filter, but accepts async methods, and returns awaitable stream.
     */
    filterAsync(fn) {
        return new exports_1.FilterStreamAsync(this, fn);
    }
    map(fn) {
        return new exports_1.MapStream(this, fn);
    }
    mapAsync(fn, meta) {
        return new exports_1.MapStream(this, fn, { async: true });
    }
    mapMany(fn) {
        return new exports_1.MapManyStream(this, fn);
    }
    mapManyAsync(fn) {
        return new exports_1.MapManyStream(this, fn, { async: true });
    }
    forEach(fn) {
        return new exports_1.ForEachStream(this, fn);
    }
    forEachAsync(fn) {
        return new exports_1.ForEachStream(this, fn, { async: true });
    }
    take(count) {
        return new exports_1.TakeStream(this, count);
    }
    takeWhile(fn, opts) {
        return new exports_1.TakeWhileStream(this, fn, opts);
    }
    takeWhileAsync(fn, opts) {
        return new exports_1.TakeWhileStreamAsync(this, fn, opts);
    }
    skip(count) {
        return new exports_1.SkipStream(this, count);
    }
    skipWhile(fn, opts) {
        return new exports_1.SkipWhileStream(this, fn, opts);
    }
    skipWhileAsync(fn, opts) {
        return new exports_1.SkipWhileStreamAsync(this, fn, opts);
    }
    groupBy(fn) {
        return new exports_1.GroupByStream(this, fn);
    }
    /** Join Left Inner  */
    join(inner, getKey, getForeignKey, joinFn) {
        return new exports_1.JoinStream(this, inner, getKey, getForeignKey, joinFn, 'inner');
    }
    /** Join Full Outer  */
    joinOuter(inner, getKey, getForeignKey, joinFn) {
        return new exports_1.JoinStream(this, inner, getKey, getForeignKey, joinFn, 'outer');
    }
    distinctBy(fn) {
        return new exports_1.DistinctByStream(this, fn);
    }
    distinct() {
        return new exports_1.DistinctByStream(this);
    }
    sortBy(mix, direction = 'asc') {
        return new exports_1.SortByStream(this, mix, direction);
    }
    sortByAsync(mix, direction = 'asc') {
        return new exports_1.SortByStream(this, mix, direction, /*isAsync*/ true);
    }
    sortByLocalCompare(getValFn, direction, ...params) {
        return new exports_1.SortByLocalCompareStream(this, getValFn, direction, params);
    }
    fork(fn) {
        let inner = new exports_1.ForkStreamInner(this, fn);
        let outer = new exports_1.ForkStreamOuter(this, inner);
        return outer;
    }
    toDictionary(keyFn, valFn) {
        this.reset();
        let hash = Object.create(null);
        while (true) {
            let x = this.next();
            if (x.done) {
                return hash;
            }
            let key = keyFn(x.value);
            hash[key] = valFn ? valFn(x.value) : x.value;
        }
    }
    toDictionaryAsync(keyFn, valFn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            let hash = Object.create(null);
            while (true) {
                let x = yield this.nextAsync();
                if (x.done) {
                    return hash;
                }
                let key = yield keyFn(x.value);
                hash[key] = valFn ? yield valFn(x.value) : x.value;
            }
            return hash;
        });
    }
    toMap(keyFn, valFn) {
        this.reset();
        let map = new Map();
        while (true) {
            let x = this.next();
            if (x.done) {
                return map;
            }
            let key = keyFn(x.value);
            let value = valFn != null ? valFn(x.value) : x.value;
            map.set(key, value);
        }
    }
    toMapAsync(keyFn, valFn) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            let map = new Map();
            while (true) {
                let x = yield this.nextAsync();
                if (x.done) {
                    return map;
                }
                let key = yield keyFn(x.value);
                let value = valFn != null ? yield valFn(x.value) : x.value;
                map.set(key, value);
            }
            return map;
        });
    }
    toArray() {
        this.reset();
        let out = [];
        while (true) {
            let result = this.next();
            if (result.done === true) {
                break;
            }
            out.push(result.value);
        }
        return out;
    }
    toArrayAsync(meta = { threads: 4, errors: 'reject' }) {
        this.reset();
        let pool = new Pool_1.AsyncPool(this, meta.threads, meta.errors);
        return pool.start();
    }
    first(matcher) {
        this.reset();
        let i = 0;
        while (true) {
            let entry = this.next();
            if (entry == null || entry.done === true) {
                break;
            }
            if (matcher == null || matcher(entry.value, i++)) {
                return entry.value;
            }
        }
        return null;
    }
    firstAsync(matcher) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            let i = 0;
            while (true) {
                let entry = yield this.nextAsync();
                if (entry == null || entry.done === true) {
                    break;
                }
                if (matcher == null) {
                    return entry.value;
                }
                let mix = matcher(entry.value, i++);
                let result = (0, is_1.is_Promise)(mix) ? yield mix : mix;
                if (result) {
                    return entry.value;
                }
            }
            return null;
        });
    }
    find(matcher) {
        return this.first(matcher);
    }
    findAsync(matcher) {
        return this.firstAsync(matcher);
    }
    sum(getVal, initialValue) {
        return Aggregation_1.Aggregation.sum(this, getVal, initialValue !== null && initialValue !== void 0 ? initialValue : 0);
    }
    sumAsync(getVal, initialValue) {
        return Aggregation_1.Aggregation.sumAsync(this, getVal, initialValue !== null && initialValue !== void 0 ? initialValue : 0);
    }
    sumBigInt(getVal) {
        return Aggregation_1.Aggregation.sum(this, getVal, BigInt(0));
    }
    sumBigIntAsync(getVal, initialValue) {
        return Aggregation_1.Aggregation.sumAsync(this, getVal, initialValue !== null && initialValue !== void 0 ? initialValue : BigInt(0));
    }
    max(fn) {
        return Aggregation_1.Aggregation.getMinMaxValueBy(this, fn, 'max');
    }
    maxAsync(fn) {
        return Aggregation_1.Aggregation.getMinMaxValueByAsync(this, fn, 'max');
    }
    maxItem(fn) {
        return Aggregation_1.Aggregation.getMinMaxItemBy(this, fn, 'max');
    }
    maxItemAsync(fn) {
        return Aggregation_1.Aggregation.getMinMaxItemByAsync(this, fn, 'max');
    }
    min(fn) {
        return Aggregation_1.Aggregation.getMinMaxValueBy(this, fn, 'min');
    }
    minAsync(fn) {
        return Aggregation_1.Aggregation.getMinMaxValueByAsync(this, fn, 'min');
    }
    minItem(fn) {
        return Aggregation_1.Aggregation.getMinMaxItemBy(this, fn, 'min');
    }
    minItemAsync(fn) {
        return Aggregation_1.Aggregation.getMinMaxItemByAsync(this, fn, 'min');
    }
}
exports.AlotProto = AlotProto;
//# sourceMappingURL=AlotProto.js.map
//# sourceMappingURL=AlotProto.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_AlotProto === module.exports) {
        // do nothing if
    } else if (__isObj(_src_AlotProto) && __isObj(module.exports)) {
        Object.assign(_src_AlotProto, module.exports);
    } else {
        _src_AlotProto = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_async_Deferred;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_async_Deferred != null ? _src_async_Deferred : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
class Deferred {
    constructor() {
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
            if (this.isResolved === true) {
                resolve(this.resolvedArg);
            }
            if (this.isRejected === true) {
                reject(this.rejectedArg);
            }
        });
    }
    resolve(arg) {
        if (this.resolveFn) {
            this.resolveFn(arg);
            return;
        }
        this.isResolved = true;
        this.resolvedArg = arg;
    }
    reject(arg) {
        if (this.rejectFn) {
            this.rejectFn(arg);
            return;
        }
        this.isRejected = true;
        this.rejectedArg = arg;
    }
    then(fnA, fnB) {
        this.promise.then(fnA, fnB);
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=Deferred.js.map
//# sourceMappingURL=Deferred.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_async_Deferred === module.exports) {
        // do nothing if
    } else if (__isObj(_src_async_Deferred) && __isObj(module.exports)) {
        Object.assign(_src_async_Deferred, module.exports);
    } else {
        _src_async_Deferred = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_deco;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_deco != null ? _src_utils_deco : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deco = void 0;
const Deferred_1 = _src_async_Deferred;
exports.Deco = {
    queued(opts = null) {
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            var fn = viaProperty ? target[propertyKey] : descriptor.value;
            var queue = [];
            var busy = false;
            var resultFn = function () {
                let wrapped = Queued.prepair(fn, this);
                if (opts != null && opts.trimQueue && queue.length > 0) {
                    queue.splice(0);
                }
                queue.push(wrapped);
                if (busy === false) {
                    busy = true;
                    tick();
                }
                return wrapped.promise;
            };
            var tick = function () {
                let x = queue.shift();
                if (x == null) {
                    busy = false;
                    return;
                }
                x.always(tick);
                x.run.apply(this, arguments);
            };
            if (viaProperty) {
                target[propertyKey] = resultFn;
                return;
            }
            descriptor.value = resultFn;
            return descriptor;
        };
    }
};
const Queued = {
    prepair(fn, ctx) {
        let dfr = new Deferred_1.Deferred;
        return {
            promise: dfr,
            run() {
                let result = fn.apply(ctx, arguments);
                if ('then' in result === false) {
                    dfr.resolve(result);
                }
                else {
                    result.then(_result => {
                        dfr.resolve(_result);
                    }, _error => {
                        dfr.reject(_error);
                    });
                }
                return result;
            },
            always(fn) {
                dfr.then(fn, fn);
            }
        };
    }
};
//# sourceMappingURL=deco.js.map
//# sourceMappingURL=deco.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_deco === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_deco) && __isObj(module.exports)) {
        Object.assign(_src_utils_deco, module.exports);
    } else {
        _src_utils_deco = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_FilterStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_FilterStream != null ? _src_streams_FilterStream : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterStreamAsync = exports.FilterStream = void 0;
const AlotProto_1 = _src_AlotProto;
const deco_1 = _src_utils_deco;
class FilterStream extends AlotProto_1.AlotProto {
    constructor(stream, fn) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
    }
    next() {
        while (true) {
            let result = this.stream.next();
            if (result.done === true) {
                return result;
            }
            let b = this.fn(result.value, result.index);
            if (Boolean(b) === false) {
                continue;
            }
            return result;
        }
    }
}
exports.FilterStream = FilterStream;
class FilterStreamAsync extends AlotProto_1.AlotProto {
    constructor(stream, fn) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.isAsync = true;
        this._index = -1;
        this.next = this.nextAsync;
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let i = ++this._index;
            while (true) {
                let result = yield this.stream.next();
                if (result.done === true) {
                    return result;
                }
                let b = yield this.fn(result.value, result.index);
                if (Boolean(b) === false) {
                    continue;
                }
                result.index = i;
                return result;
            }
        });
    }
    reset() {
        this._index = -1;
        return super.reset();
    }
    toArrayAsync(meta = { threads: 4 }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            let arr = yield this.mapAsync((item, i) => __awaiter(this, void 0, void 0, function* () {
                let flag = yield this.fn(item, i);
                return {
                    value: item,
                    flag
                };
            }), meta).toArrayAsync();
            return arr.filter(x => x.flag).map(x => x.value);
        });
    }
}
__decorate([
    deco_1.Deco.queued()
], FilterStreamAsync.prototype, "nextAsync", null);
exports.FilterStreamAsync = FilterStreamAsync;
//# sourceMappingURL=FilterStream.js.map
//# sourceMappingURL=FilterStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_FilterStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_FilterStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_FilterStream, module.exports);
    } else {
        _src_streams_FilterStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_r;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_r != null ? _src_utils_r : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.r_DONE = void 0;
exports.r_DONE = { done: true, value: null };
//# sourceMappingURL=r.js.map
//# sourceMappingURL=r.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_r === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_r) && __isObj(module.exports)) {
        Object.assign(_src_utils_r, module.exports);
    } else {
        _src_utils_r = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_MapStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_MapStream != null ? _src_streams_MapStream : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapManyStream = exports.MapStream = void 0;
const AlotProto_1 = _src_AlotProto;
const r_1 = _src_utils_r;
class MapStream extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream, opts);
        this.stream = stream;
        this.fn = fn;
        this._index = 0;
    }
    next() {
        if (this.isAsync) {
            return this.nextAsync();
        }
        let result = this.stream.next();
        if (result.done) {
            return { value: null, done: true };
        }
        return {
            value: this.fn(result.value, this._index++),
            done: false
        };
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.stream.nextAsync();
            if (result.done) {
                //* skipped extra-object
                result.value = null;
                return result;
            }
            return {
                value: yield this.fn(result.value, this._index++),
                done: false
            };
        });
    }
    reset() {
        this._index = 0;
        return super.reset();
    }
}
exports.MapStream = MapStream;
class MapManyStream extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.opts = opts;
        this._index = -1;
        this._many = null;
        this._mapDfr = null;
        this._done = false;
        this.isAsync = stream.isAsync || opts && opts.async;
    }
    next() {
        if (this.opts != null && this.opts.async) {
            return this.nextAsync();
        }
        if (this._many != null && this._index < this._many.length - 1) {
            let x = this._many[++this._index];
            return { done: false, value: x };
        }
        let result = this.stream.next();
        if (result.done) {
            return result;
        }
        this._many = this.fn(result.value, result.index);
        this._index = -1;
        return this.next();
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._done === true) {
                return r_1.r_DONE;
            }
            if (this._many != null && this._index < this._many.length - 1) {
                let x = this._many[++this._index];
                return { done: false, value: x };
            }
            if (this._mapDfr == null) {
                this._doMapAsync();
            }
            yield this._mapDfr;
            return this.nextAsync();
        });
    }
    reset() {
        this._many = null;
        this._done = false;
        this._mapDfr = null;
        this._index = -1;
        return super.reset();
    }
    _doMapAsync() {
        return this._mapDfr = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.stream.next();
            if (result.done) {
                this._done = true;
                this._mapDfr = null;
                resolve(null);
                return;
            }
            this._many = yield this.fn(result.value, result.index);
            this._index = -1;
            this._mapDfr = null;
            resolve(null);
        }));
    }
}
exports.MapManyStream = MapManyStream;
//# sourceMappingURL=MapStream.js.map
//# sourceMappingURL=MapStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_MapStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_MapStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_MapStream, module.exports);
    } else {
        _src_streams_MapStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_TakeStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_TakeStream != null ? _src_streams_TakeStream : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeWhileStreamAsync = exports.TakeWhileStream = exports.TakeStream = void 0;
const AlotProto_1 = _src_AlotProto;
const deco_1 = _src_utils_deco;
const r_1 = _src_utils_r;
class TakeStream extends AlotProto_1.AlotProto {
    constructor(stream, _count) {
        super(stream);
        this.stream = stream;
        this._count = _count;
        this._took = 0;
    }
    next() {
        if (++this._took > this._count) {
            return { value: null, done: true };
        }
        return this.stream.next();
    }
    reset() {
        this._took = 0;
        return super.reset();
    }
}
exports.TakeStream = TakeStream;
class TakeWhileStream extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.opts = opts;
        this._took = false;
    }
    next() {
        var _a;
        if (this._took === true) {
            return r_1.r_DONE;
        }
        let result = this.stream.next();
        if (result.done) {
            return result;
        }
        let b = this.fn(result.value, result.index);
        if (Boolean(b) === false) {
            this._took = true;
            if (((_a = this.opts) === null || _a === void 0 ? void 0 : _a.includeLast) !== true) {
                return r_1.r_DONE;
            }
            // otherwise will return current, and all other will be skipped
        }
        return result;
    }
    reset() {
        this._took = false;
        return super.reset();
    }
}
exports.TakeWhileStream = TakeWhileStream;
class TakeWhileStreamAsync extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.opts = opts;
        this.isAsync = true;
        this._took = false;
        this.next = this.nextAsync;
    }
    nextAsync() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._took === true) {
                return r_1.r_DONE;
            }
            let result = yield this.stream.next();
            if (result.done === true) {
                return result;
            }
            let b = yield this.fn(result.value, result.index);
            if (Boolean(b) === false) {
                this._took = true;
                if (((_a = this.opts) === null || _a === void 0 ? void 0 : _a.includeLast) !== true) {
                    return r_1.r_DONE;
                }
                // otherwise will return current, and all other will be skipped
            }
            return result;
        });
    }
    reset() {
        this._took = false;
        return super.reset();
    }
}
__decorate([
    deco_1.Deco.queued()
], TakeWhileStreamAsync.prototype, "nextAsync", null);
exports.TakeWhileStreamAsync = TakeWhileStreamAsync;
//# sourceMappingURL=TakeStream.js.map
//# sourceMappingURL=TakeStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_TakeStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_TakeStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_TakeStream, module.exports);
    } else {
        _src_streams_TakeStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_SkipStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_SkipStream != null ? _src_streams_SkipStream : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipWhileStreamAsync = exports.SkipWhileStream = exports.SkipStream = void 0;
const AlotProto_1 = _src_AlotProto;
const deco_1 = _src_utils_deco;
class SkipStream extends AlotProto_1.AlotProto {
    constructor(stream, _count) {
        super(stream);
        this.stream = stream;
        this._count = _count;
        this._skipped = 0;
    }
    next() {
        while (++this._skipped <= this._count) {
            let skip = this.stream.next();
            if (skip.done) {
                return skip;
            }
            continue;
        }
        return this.stream.next();
    }
    reset() {
        this._skipped = 0;
        return super.reset();
    }
}
exports.SkipStream = SkipStream;
class SkipWhileStream extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.opts = opts;
        this._skipped = false;
    }
    next() {
        while (this._skipped === false) {
            let result = this.stream.next();
            if (result.done) {
                return result;
            }
            let b = this.fn(result.value, result.index);
            if (Boolean(b) === true) {
                continue;
            }
            this._skipped = true;
            return result;
        }
        return this.stream.next();
    }
    reset() {
        this._skipped = false;
        return super.reset();
    }
}
exports.SkipWhileStream = SkipWhileStream;
class SkipWhileStreamAsync extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.opts = opts;
        this.isAsync = true;
        this._skipped = false;
        this.next = this.nextAsync;
    }
    // No matter how many streams do we have, ensure we call this not simultanously
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this._skipped === false) {
                let result = yield this.stream.next();
                if (result.done === true) {
                    return result;
                }
                let b = yield this.fn(result.value, result.index);
                if (Boolean(b) === true) {
                    continue;
                }
                this._skipped = true;
                return result;
            }
            return this.stream.next();
        });
    }
    reset() {
        this._skipped = false;
        return super.reset();
    }
}
__decorate([
    deco_1.Deco.queued()
], SkipWhileStreamAsync.prototype, "nextAsync", null);
exports.SkipWhileStreamAsync = SkipWhileStreamAsync;
//# sourceMappingURL=SkipStream.js.map
//# sourceMappingURL=SkipStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_SkipStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_SkipStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_SkipStream, module.exports);
    } else {
        _src_streams_SkipStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_GroupStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_GroupStream != null ? _src_streams_GroupStream : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupByStream = void 0;
const AlotProto_1 = _src_AlotProto;
class GroupByStream extends AlotProto_1.AlotProto {
    constructor(stream, fn) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.isAsync = false;
        this.groups = null;
        this.hash = null;
        this.index = -1;
    }
    next() {
        if (this.groups) {
            if (++this.index >= this.groups.length) {
                return { done: true, value: null };
            }
            return {
                done: false,
                index: this.index,
                value: this.groups[this.index]
            };
        }
        this.groups = [];
        this.hash = Object.create(null);
        while (true) {
            let result = this.stream.next();
            if (result.done === true) {
                break;
            }
            let keyVal = this.fn(result.value, result.index);
            let key = String(keyVal);
            let arr = this.hash[key];
            if (arr == null) {
                arr = this.hash[key] = [];
                this.groups.push({
                    key: keyVal,
                    values: arr
                });
            }
            arr.push(result.value);
        }
        return this.next();
    }
    reset() {
        this.index = -1;
        return super.reset();
    }
}
exports.GroupByStream = GroupByStream;
//# sourceMappingURL=GroupStream.js.map
//# sourceMappingURL=GroupStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_GroupStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_GroupStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_GroupStream, module.exports);
    } else {
        _src_streams_GroupStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_DistinctStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_DistinctStream != null ? _src_streams_DistinctStream : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistinctByStream = void 0;
const AlotProto_1 = _src_AlotProto;
class DistinctByStream extends AlotProto_1.AlotProto {
    constructor(stream, fn = null) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this._track = new Track;
        this._index = -1;
    }
    next() {
        while (true) {
            let result = this.stream.next();
            if (result.done === true) {
                return result;
            }
            let key = this.fn != null
                ? this.fn(result.value, result.index)
                : result.value;
            if (this._track.isUnique(key) === false) {
                continue;
            }
            return result;
        }
    }
    reset() {
        this._index = -1;
        this._track = new Track;
        return super.reset();
    }
}
exports.DistinctByStream = DistinctByStream;
class Track {
    constructor() {
        this._hash = Object.create(null);
    }
    isUnique(mix) {
        if (mix == null || typeof mix !== 'object') {
            if (mix in this._hash) {
                return false;
            }
            this._hash[mix] = 1;
            return true;
        }
        if (this._map == null) {
            this._map = new Map();
        }
        if (this._map.has(mix)) {
            return false;
        }
        this._map.set(mix, 1);
        return true;
    }
}
//# sourceMappingURL=DistinctStream.js.map
//# sourceMappingURL=DistinctStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_DistinctStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_DistinctStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_DistinctStream, module.exports);
    } else {
        _src_streams_DistinctStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_ForEachStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_ForEachStream != null ? _src_streams_ForEachStream : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForEachStream = void 0;
const AlotProto_1 = _src_AlotProto;
class ForEachStream extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream, opts);
        this.stream = stream;
        this.fn = fn;
        this._index = 0;
    }
    next() {
        if (this.isAsync === true) {
            return this.nextAsync();
        }
        let result = this.stream.next();
        if (result.done) {
            return result;
        }
        this.fn(result.value, this._index++);
        return result;
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this.stream.nextAsync();
            if (item.done) {
                //* skipped extra-object
                item.value = null;
                return item;
            }
            yield this.fn(item.value, this._index++);
            return {
                value: item.value,
                done: false
            };
        });
    }
    reset() {
        this._index = 0;
        return super.reset();
    }
}
exports.ForEachStream = ForEachStream;
//# sourceMappingURL=ForEachStream.js.map
//# sourceMappingURL=ForEachStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_ForEachStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_ForEachStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_ForEachStream, module.exports);
    } else {
        _src_streams_ForEachStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_arr;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_arr != null ? _src_utils_arr : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr_last = void 0;
function arr_last(arr) {
    if (arr == null || arr.length === 0) {
        return null;
    }
    return arr[arr.length - 1];
}
exports.arr_last = arr_last;
//# sourceMappingURL=arr.js.map
//# sourceMappingURL=arr.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_arr === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_arr) && __isObj(module.exports)) {
        Object.assign(_src_utils_arr, module.exports);
    } else {
        _src_utils_arr = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_ForkStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_ForkStream != null ? _src_streams_ForkStream : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForkStreamOuter = exports.ForkStreamInner = void 0;
const AlotProto_1 = _src_AlotProto;
const arr_1 = _src_utils_arr;
class ForkStreamInner extends AlotProto_1.AlotProto {
    constructor(stream, fn) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this._cached = [];
    }
    next() {
        if (this.isAsync) {
            return this.nextAsync();
        }
        let last = (0, arr_1.arr_last)(this._cached);
        if (last === null || last === void 0 ? void 0 : last.done) {
            return last;
        }
        let result = this.stream.next();
        this._cached.push(result);
        return result;
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let last = (0, arr_1.arr_last)(this._cached);
            if (last === null || last === void 0 ? void 0 : last.done) {
                return last;
            }
            let result = yield this.stream.nextAsync();
            this._cached.push(result);
            return result;
        });
    }
    reset() {
        this._cached = [];
        return super.reset();
    }
    pluck() {
        return this.fn(this);
    }
    has(i) {
        return i < this._cached.length;
    }
    get(i) {
        return this._cached[i];
    }
}
exports.ForkStreamInner = ForkStreamInner;
class ForkStreamOuter extends AlotProto_1.AlotProto {
    constructor(stream, inner) {
        super(stream);
        this.stream = stream;
        this.inner = inner;
        this._index = 0;
        this._plucked = false;
    }
    next() {
        if (this.isAsync) {
            return this.nextAsync();
        }
        if (this._plucked === false) {
            this._plucked = true;
            this.inner.pluck();
        }
        if (this.inner.has(this._index)) {
            let result = this.inner.get(this._index);
            if (result.done !== true) {
                this._index++;
            }
            return result;
        }
        return this.stream.next();
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._plucked === false) {
                this._plucked = true;
                yield this.inner.pluck();
            }
            if (this.inner.has(this._index)) {
                let result = this.inner.get(this._index);
                if (result.done !== true) {
                    this._index++;
                }
                return result;
            }
            return this.stream.nextAsync();
        });
    }
    reset() {
        this._index = 0;
        return super.reset();
    }
}
exports.ForkStreamOuter = ForkStreamOuter;
//# sourceMappingURL=ForkStream.js.map
//# sourceMappingURL=ForkStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_ForkStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_ForkStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_ForkStream, module.exports);
    } else {
        _src_streams_ForkStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_obj != null ? _src_utils_obj : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_getProperty = void 0;
function obj_getProperty(obj_, path) {
    if (obj_ == null) {
        return null;
    }
    if (path.indexOf('.') === -1) {
        return obj_[path];
    }
    let obj = obj_;
    let chain = path.split('.');
    let imax = chain.length;
    let i = -1;
    while (obj != null && ++i < imax) {
        let key = chain[i];
        obj = obj[key];
    }
    return obj;
}
exports.obj_getProperty = obj_getProperty;
//# sourceMappingURL=obj.js.map
//# sourceMappingURL=obj.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_obj === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_obj) && __isObj(module.exports)) {
        Object.assign(_src_utils_obj, module.exports);
    } else {
        _src_utils_obj = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_SortedStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_SortedStream != null ? _src_streams_SortedStream : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortByLocalCompareStream = exports.SortByStream = void 0;
const AlotProto_1 = _src_AlotProto;
const obj_1 = _src_utils_obj;
const r_1 = _src_utils_r;
const deco_1 = _src_utils_deco;
class SortByStream extends AlotProto_1.AlotProto {
    // constructor(stream: IAlotStream<T>, sortByFn: SortMethod<T>, direction?: 'asc' | 'desc')
    // constructor(stream: IAlotStream<T>, sortByKey: string, direction?: 'asc' | 'desc')
    constructor(stream, mix, direction = 'asc', isAsync) {
        super(stream);
        this.stream = stream;
        this.direction = direction;
        this.isAsync = false;
        this.arr = null;
        this.index = -1;
        if (typeof mix === 'string') {
            let path = mix;
            this.sortByFn = x => (0, obj_1.obj_getProperty)(x, path);
        }
        else {
            this.sortByFn = mix;
        }
        this.isAsync = isAsync !== null && isAsync !== void 0 ? isAsync : this.stream.isAsync;
    }
    next() {
        if (this.arr != null) {
            return Utils.next(++this.index, this.arr);
        }
        const arr = Utils.bufferSync(this.stream);
        this.arr = Utils.sort(arr, this.sortByFn, this.direction);
        return this.next();
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.arr != null) {
                return Utils.next(++this.index, this.arr);
            }
            const arr = yield Utils.bufferAsync(this.stream);
            this.arr = Utils.sort(arr, this.sortByFn, this.direction);
            return this.next();
        });
    }
    reset() {
        this.index = -1;
        this.arr = null;
        return super.reset();
    }
}
__decorate([
    deco_1.Deco.queued()
], SortByStream.prototype, "nextAsync", null);
exports.SortByStream = SortByStream;
class SortByLocalCompareStream extends AlotProto_1.AlotProto {
    // constructor(stream: IAlotStream<T>, sortByFn: SortMethod<T>, direction?: 'asc' | 'desc')
    // constructor(stream: IAlotStream<T>, sortByKey: string, direction?: 'asc' | 'desc')
    constructor(stream, getValue, direction = 'asc', params) {
        super(stream);
        this.stream = stream;
        this.getValue = getValue;
        this.direction = direction;
        this.params = params;
        this.isAsync = false;
        this.arr = null;
        this.index = -1;
    }
    next() {
        if (this.arr) {
            if (++this.index >= this.arr.length) {
                return { done: true, value: null };
            }
            return {
                done: false,
                index: this.index,
                value: this.arr[this.index]
            };
        }
        this.arr = [];
        while (true) {
            let result = this.stream.next();
            if (result.done === true) {
                break;
            }
            this.arr.push(result.value);
        }
        let mapped = [];
        for (let i = 0; i < this.arr.length; i++) {
            mapped[i] = {
                i,
                key: this.getValue(this.arr[i], i),
                val: this.arr[i]
            };
        }
        ;
        mapped.sort((a, b) => {
            let x = a.key.localeCompare(b.key, ...this.params);
            if (this.direction === 'asc') {
                return x;
            }
            return x * -1;
        });
        let result = [];
        for (let i = 0; i < mapped.length; i++) {
            result[i] = mapped[i].val;
        }
        this.arr = result;
        return this.next();
    }
    reset() {
        this.index = -1;
        this.arr = null;
        return super.reset();
    }
}
exports.SortByLocalCompareStream = SortByLocalCompareStream;
var Utils;
(function (Utils) {
    function next(index, arr) {
        if (index >= arr.length) {
            return r_1.r_DONE;
        }
        return {
            done: false,
            index: index,
            value: arr[index]
        };
    }
    Utils.next = next;
    function bufferAsync(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            while (true) {
                let result = yield stream.nextAsync();
                if (result.done === true) {
                    break;
                }
                arr.push(result.value);
            }
            return arr;
        });
    }
    Utils.bufferAsync = bufferAsync;
    function bufferSync(stream) {
        const arr = [];
        while (true) {
            let result = stream.next();
            if (result.done === true) {
                break;
            }
            arr.push(result.value);
        }
        return arr;
    }
    Utils.bufferSync = bufferSync;
    function sort(arr, getValueFn, direction) {
        let mapped = [];
        for (let i = 0; i < arr.length; i++) {
            mapped[i] = {
                i,
                key: getValueFn(arr[i], i),
                val: arr[i]
            };
        }
        ;
        mapped.sort((a, b) => {
            if (a.key === b.key) {
                return 0;
            }
            if (a.key < b.key) {
                return direction === 'asc' ? -1 : 1;
            }
            return direction === 'asc' ? 1 : -1;
        });
        let result = [];
        for (let i = 0; i < mapped.length; i++) {
            result[i] = mapped[i].val;
        }
        return result;
    }
    Utils.sort = sort;
})(Utils || (Utils = {}));
//# sourceMappingURL=SortedStream.js.map
//# sourceMappingURL=SortedStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_SortedStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_SortedStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_SortedStream, module.exports);
    } else {
        _src_streams_SortedStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_JoinStream;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_JoinStream != null ? _src_streams_JoinStream : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapManyStream = exports.JoinStream = void 0;
const AlotProto_1 = _src_AlotProto;
const r_1 = _src_utils_r;
class JoinStream extends AlotProto_1.AlotProto {
    constructor(stream, inner, fnKeyOuter, fnKeyInner, joinFn, joinType, opts) {
        super(stream, opts);
        this.stream = stream;
        this.inner = inner;
        this.fnKeyOuter = fnKeyOuter;
        this.fnKeyInner = fnKeyInner;
        this.joinFn = joinFn;
        this.joinType = joinType;
        this._index = 0;
        this._innerExtra = null;
        this._innerExtraIndex = 0;
        this._innerHash = null;
        this._innerHashTook = Object.create(null);
    }
    next() {
        if (this.isAsync) {
            return this.nextAsync();
        }
        if (this._innerExtra != null) {
            if (this._innerExtraIndex >= this._innerExtra.length) {
                return r_1.r_DONE;
            }
            let x = this._innerExtra[this._innerExtraIndex++];
            let result = this.joinFn(null, x);
            return { done: false, value: result, index: this._index++ };
        }
        ;
        let result = this.stream.next();
        if (result.done) {
            if (this.joinType === 'inner') {
                return r_1.r_DONE;
            }
            this._innerExtra = this.inner.filter(x => this.fnKeyInner(x) in this._innerHashTook === false);
            return this.next();
        }
        if (this._innerHash == null) {
            this._ensureInnerHash();
        }
        let outerKey = this.fnKeyOuter(result.value);
        let innerVal = this._innerHash[outerKey];
        if (innerVal == null) {
            if (this.joinType === 'inner') {
                return this.next();
            }
        }
        else {
            this._innerHashTook[outerKey] = 1;
        }
        let val = this.joinFn(result.value, innerVal);
        return {
            value: val,
            done: false,
            index: ++this._index
        };
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Joins on async stream are not supported yet');
            return null;
        });
    }
    reset() {
        this._index = 0;
        this._innerExtra = null;
        this._innerExtraIndex = 0;
        this._innerHash = null;
        this._innerHashTook = Object.create(null);
        return super.reset();
    }
    _ensureInnerHash() {
        let hash = Object.create(null);
        for (let i = 0; i < this.inner.length; i++) {
            let x = this.inner[i];
            let key = this.fnKeyInner(x);
            // @TOOD if should check if key already exists
            hash[key] = x;
        }
        this._innerHash = hash;
    }
}
exports.JoinStream = JoinStream;
class MapManyStream extends AlotProto_1.AlotProto {
    constructor(stream, fn, opts) {
        super(stream);
        this.stream = stream;
        this.fn = fn;
        this.opts = opts;
        this._index = -1;
        this._many = null;
        this._mapDfr = null;
        this._done = false;
        this.isAsync = stream.isAsync || opts && opts.async;
    }
    next() {
        if (this.opts != null && this.opts.async) {
            return this.nextAsync();
        }
        if (this._many != null && this._index < this._many.length - 1) {
            let x = this._many[++this._index];
            return { done: false, value: x };
        }
        let result = this.stream.next();
        if (result.done) {
            return result;
        }
        this._many = this.fn(result.value, result.index);
        this._index = -1;
        return this.next();
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._done === true) {
                return r_1.r_DONE;
            }
            if (this._many != null && this._index < this._many.length - 1) {
                let x = this._many[++this._index];
                return { done: false, value: x };
            }
            if (this._mapDfr == null) {
                this._doMapAsync();
            }
            yield this._mapDfr;
            return this.nextAsync();
        });
    }
    reset() {
        this._many = null;
        this._done = false;
        this._mapDfr = null;
        this._index = -1;
        return super.reset();
    }
    _doMapAsync() {
        return this._mapDfr = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.stream.next();
            if (result.done) {
                this._done = true;
                resolve(null);
            }
            this._many = yield this.fn(result.value, result.index);
            this._index = -1;
            this._mapDfr = null;
            resolve(null);
        }));
    }
}
exports.MapManyStream = MapManyStream;
//# sourceMappingURL=JoinStream.js.map
//# sourceMappingURL=JoinStream.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_JoinStream === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_JoinStream) && __isObj(module.exports)) {
        Object.assign(_src_streams_JoinStream, module.exports);
    } else {
        _src_streams_JoinStream = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_streams_exports;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_streams_exports != null ? _src_streams_exports : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinStream = exports.SortByLocalCompareStream = exports.SortMethod = exports.SortByStream = exports.ForkStreamOuter = exports.ForkStreamInner = exports.ForEachMethod = exports.ForEachStream = exports.DistinctByStream = exports.DistinctByKeyFn = exports.GroupByStream = exports.GroupByKeyFn = exports.SkipWhileStreamAsync = exports.SkipWhileStream = exports.SkipWhileMethodAsync = exports.SkipWhileMethod = exports.SkipStream = exports.TakeWhileMethodAsync = exports.TakeWhileMethod = exports.TakeWhileStreamAsync = exports.TakeWhileStream = exports.TakeStream = exports.MethodMapMany = exports.MethodMap = exports.MapManyStream = exports.MapStream = exports.FilterStreamAsync = exports.FilterStream = exports.AlotStreamIterationResult = exports.IAlotStream = void 0;
var IAlotStream_1 = _src_streams_IAlotStream;
Object.defineProperty(exports, "IAlotStream", { enumerable: true, get: function () { return IAlotStream_1.IAlotStream; } });
Object.defineProperty(exports, "AlotStreamIterationResult", { enumerable: true, get: function () { return IAlotStream_1.AlotStreamIterationResult; } });
var FilterStream_1 = _src_streams_FilterStream;
Object.defineProperty(exports, "FilterStream", { enumerable: true, get: function () { return FilterStream_1.FilterStream; } });
Object.defineProperty(exports, "FilterStreamAsync", { enumerable: true, get: function () { return FilterStream_1.FilterStreamAsync; } });
var MapStream_1 = _src_streams_MapStream;
Object.defineProperty(exports, "MapStream", { enumerable: true, get: function () { return MapStream_1.MapStream; } });
Object.defineProperty(exports, "MapManyStream", { enumerable: true, get: function () { return MapStream_1.MapManyStream; } });
Object.defineProperty(exports, "MethodMap", { enumerable: true, get: function () { return MapStream_1.MethodMap; } });
Object.defineProperty(exports, "MethodMapMany", { enumerable: true, get: function () { return MapStream_1.MethodMapMany; } });
var TakeStream_1 = _src_streams_TakeStream;
Object.defineProperty(exports, "TakeStream", { enumerable: true, get: function () { return TakeStream_1.TakeStream; } });
Object.defineProperty(exports, "TakeWhileStream", { enumerable: true, get: function () { return TakeStream_1.TakeWhileStream; } });
Object.defineProperty(exports, "TakeWhileStreamAsync", { enumerable: true, get: function () { return TakeStream_1.TakeWhileStreamAsync; } });
Object.defineProperty(exports, "TakeWhileMethod", { enumerable: true, get: function () { return TakeStream_1.TakeWhileMethod; } });
Object.defineProperty(exports, "TakeWhileMethodAsync", { enumerable: true, get: function () { return TakeStream_1.TakeWhileMethodAsync; } });
var SkipStream_1 = _src_streams_SkipStream;
Object.defineProperty(exports, "SkipStream", { enumerable: true, get: function () { return SkipStream_1.SkipStream; } });
Object.defineProperty(exports, "SkipWhileMethod", { enumerable: true, get: function () { return SkipStream_1.SkipWhileMethod; } });
Object.defineProperty(exports, "SkipWhileMethodAsync", { enumerable: true, get: function () { return SkipStream_1.SkipWhileMethodAsync; } });
Object.defineProperty(exports, "SkipWhileStream", { enumerable: true, get: function () { return SkipStream_1.SkipWhileStream; } });
Object.defineProperty(exports, "SkipWhileStreamAsync", { enumerable: true, get: function () { return SkipStream_1.SkipWhileStreamAsync; } });
var GroupStream_1 = _src_streams_GroupStream;
Object.defineProperty(exports, "GroupByKeyFn", { enumerable: true, get: function () { return GroupStream_1.GroupByKeyFn; } });
Object.defineProperty(exports, "GroupByStream", { enumerable: true, get: function () { return GroupStream_1.GroupByStream; } });
var DistinctStream_1 = _src_streams_DistinctStream;
Object.defineProperty(exports, "DistinctByKeyFn", { enumerable: true, get: function () { return DistinctStream_1.DistinctByKeyFn; } });
Object.defineProperty(exports, "DistinctByStream", { enumerable: true, get: function () { return DistinctStream_1.DistinctByStream; } });
var ForEachStream_1 = _src_streams_ForEachStream;
Object.defineProperty(exports, "ForEachStream", { enumerable: true, get: function () { return ForEachStream_1.ForEachStream; } });
Object.defineProperty(exports, "ForEachMethod", { enumerable: true, get: function () { return ForEachStream_1.ForEachMethod; } });
var ForkStream_1 = _src_streams_ForkStream;
Object.defineProperty(exports, "ForkStreamInner", { enumerable: true, get: function () { return ForkStream_1.ForkStreamInner; } });
Object.defineProperty(exports, "ForkStreamOuter", { enumerable: true, get: function () { return ForkStream_1.ForkStreamOuter; } });
var SortedStream_1 = _src_streams_SortedStream;
Object.defineProperty(exports, "SortByStream", { enumerable: true, get: function () { return SortedStream_1.SortByStream; } });
Object.defineProperty(exports, "SortMethod", { enumerable: true, get: function () { return SortedStream_1.SortMethod; } });
Object.defineProperty(exports, "SortByLocalCompareStream", { enumerable: true, get: function () { return SortedStream_1.SortByLocalCompareStream; } });
var JoinStream_1 = _src_streams_JoinStream;
Object.defineProperty(exports, "JoinStream", { enumerable: true, get: function () { return JoinStream_1.JoinStream; } });
//# sourceMappingURL=exports.js.map
//# sourceMappingURL=exports.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_streams_exports === module.exports) {
        // do nothing if
    } else if (__isObj(_src_streams_exports) && __isObj(module.exports)) {
        Object.assign(_src_streams_exports, module.exports);
    } else {
        _src_streams_exports = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_classify;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_classify != null ? _src_utils_classify : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnPrototypeAlias = exports.Classify = void 0;
function Classify(Ctor) {
    const Class = function (...args) {
        return new Ctor(...args);
    };
    Class.prototype = Ctor.prototype;
    forIn(Ctor, key => {
        if (key in Class === false) {
            Class[key] = Ctor[key];
        }
    });
    return Class;
}
exports.Classify = Classify;
function FnPrototypeAlias(Ctor) {
    Ctor.fn = Ctor.prototype;
    return Ctor;
}
exports.FnPrototypeAlias = FnPrototypeAlias;
function forIn(obj, cb) {
    let hash = Object.create(null);
    let cursor = obj;
    do {
        let props = Object.getOwnPropertyNames(cursor);
        for (let i = 0; i < props.length; i++) {
            let key = props[i];
            if (key in hash === false) {
                cb(key);
            }
            hash[key] = null;
        }
    } while (cursor = Object.getPrototypeOf(cursor));
}
//# sourceMappingURL=classify.js.map
//# sourceMappingURL=classify.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_classify === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_classify) && __isObj(module.exports)) {
        Object.assign(_src_utils_classify, module.exports);
    } else {
        _src_utils_classify = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_alot;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_alot != null ? _src_alot : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayStream = exports.Alot = void 0;
_src_streams_exports;
const AlotProto_1 = _src_AlotProto;
class Alot extends AlotProto_1.AlotProto {
    constructor(array, meta) {
        super(new ArrayStream(array));
        this.array = array;
        this.meta = meta;
    }
    static fromObject(obj) {
        let arr = Object.keys(obj).map(key => {
            return { key, value: obj[key] };
        });
        return new Alot(arr);
    }
    static fromRange(start, endExcluded) {
        let size = Math.abs(endExcluded - start);
        let arr = new Array(size);
        if (start <= endExcluded) {
            let min = start;
            let max = endExcluded;
            for (let i = min; i < max; i++) {
                arr[i - min] = i;
            }
        }
        else {
            let min = endExcluded;
            let max = start;
            for (let i = max; i > min; i--) {
                arr[max - i] = i;
            }
        }
        return new Alot(arr);
    }
}
exports.Alot = Alot;
class ArrayStream {
    constructor(array) {
        this.array = array;
        this.isAsync = false;
        this.index = -1;
    }
    next() {
        while (++this.index < this.array.length) {
            let x = this.array[this.index];
            return { value: x, done: false, index: this.index };
        }
        return { value: null, done: true, index: this.index };
    }
    nextAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.next();
        });
    }
    reset() {
        this.index = -1;
        return this;
    }
}
exports.ArrayStream = ArrayStream;
//# sourceMappingURL=alot.js.map
//# sourceMappingURL=alot.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_alot === module.exports) {
        // do nothing if
    } else if (__isObj(_src_alot) && __isObj(module.exports)) {
        Object.assign(_src_alot, module.exports);
    } else {
        _src_alot = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
_src_streams_exports;
const classify_1 = _src_utils_classify;
const alot_1 = _src_alot;
let Alot = class Alot extends alot_1.Alot {
};
Alot.Alot = alot_1.Alot;
Alot.default = alot_1.Alot;
Alot = __decorate([
    classify_1.Classify
], Alot);
// Reapply already decorated Alot to default.
Alot.default = Alot;
Alot.Alot = Alot;
const alot = Alot;
module.exports = alot;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map

}));

// end:source ./UMD.js
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_alot_lib_alot === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_alot_lib_alot) && __isObj(module.exports)) {
        Object.assign(_node_modules_alot_lib_alot, module.exports);
    } else {
        _node_modules_alot_lib_alot = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_DriverProfiler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_DriverProfiler != null ? _src_mongo_DriverProfiler : {};
    var module = { exports: exports };

    "use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.core_profiler_toggle = exports.core_profiler_getData = void 0;
var alot = _node_modules_alot_lib_alot;
var DriverCore_1 = _src_mongo_DriverCore;
var state = false;
// settins
var setts_slowLimit = 50;
var setts_onDetect = null;
var setts_detector = null;
var box = {
    count: 0,
    slow: [],
    errors: []
};
var OriginalKeys = alot.fromObject(DriverCore_1.core).toArray();
var _core_findSingle = DriverCore_1.core.findSingle, _core_findMany = DriverCore_1.core.findMany, _core_upsertSingle = DriverCore_1.core.upsertSingle, _core_upsertMany = DriverCore_1.core.upsertMany, _core_updateSingle = DriverCore_1.core.updateSingle, _core_updateMany = DriverCore_1.core.updateMany, _core_removeSingle = DriverCore_1.core.removeSingle, _core_removeMany = DriverCore_1.core.removeMany, _core_count = DriverCore_1.core.count;
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
        OriginalKeys.forEach(function (tuple) { return DriverCore_1.core[tuple.key] = tuple.value; });
        return;
    }
    function wrapSync(fnSync) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                function callback(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                }
                ;
                fnSync.apply(void 0, __spreadArray(__spreadArray([], args, false), [callback], false));
            });
        };
    }
    DriverCore_1.core.findSingle = function (db, coll, query, options, callback) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_findSingle.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, _core_findSingle(db, coll, query, wrapOptions(options), analizator(coll, query))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.findSingleAsync = wrapSync(DriverCore_1.core.findSingle);
    DriverCore_1.core.findMany = function (db, coll, query, options, callback /*<error, array>*/) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_findMany.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, _core_findMany(db, coll, wrapQuery(query), options, analizator(coll, query))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.findManyAsync = wrapSync(DriverCore_1.core.findMany);
    DriverCore_1.core.upsertSingle = function (db, coll, query, data, callback /*<error, stats>*/) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_upsertSingle.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, _core_upsertSingle(db, coll, wrapQuery(query), data, analizator(coll, query))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.upsertSingleAsync = wrapSync(DriverCore_1.core.upsertSingle);
    DriverCore_1.core.upsertMany = function (db, coll, array /*[[query, data]]*/, callback) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_upsertMany.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, _core_upsertMany(db, coll, wrapMany(array), analizator(coll, array))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.upsertManyAsync = wrapSync(DriverCore_1.core.upsertMany);
    DriverCore_1.core.updateSingle = function (db, meta, query, mod, callback /*<error, stats>*/) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_updateSingle.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, _core_updateSingle(db, meta, wrapQuery(query), mod, analizator(meta, query))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.updateSingleAsync = wrapSync(DriverCore_1.core.updateSingle);
    DriverCore_1.core.updateMany = function (db, coll, array /*[[query, data]]*/, callback) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_updateMany.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, _core_updateMany(db, coll, wrapMany(array), analizator(coll, array))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.updateManyAsync = wrapSync(DriverCore_1.core.updateMany);
    DriverCore_1.core.removeSingle = function (db, coll, query, callback /*<error, count>*/) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_removeSingle.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        _core_removeSingle(db, coll, wrapQuery(query), analizator(coll, query));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.removeSingleAsync = wrapSync(DriverCore_1.core.removeSingle);
    DriverCore_1.core.removeMany = function (db, coll, query, callback /*<error, count>*/) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_removeMany.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        _core_removeMany(db, coll, wrapQuery(query), analizator(coll, query));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.removeManyAsync = wrapSync(DriverCore_1.core.removeMany);
    DriverCore_1.core.count = function (db, coll, query, options, callback /*<error, count>*/) {
        return __awaiter(this, arguments, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _core_count.apply(null, arguments)];
                    case 1:
                        result = _a.sent();
                        _core_count(db, coll, wrapQuery(query), wrapOptions(null), analizator(coll, query));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DriverCore_1.core.countAsync = wrapSync(DriverCore_1.core.count);
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_DriverProfiler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_DriverProfiler) && __isObj(module.exports)) {
        Object.assign(_src_mongo_DriverProfiler, module.exports);
    } else {
        _src_mongo_DriverProfiler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_Driver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_Driver != null ? _src_mongo_Driver : {};
    var module = { exports: exports };

    "use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_getMongo = exports.db_ensureIndexes = exports.db_removeAsync = exports.db_remove = exports.db_patchManyAsync = exports.db_patchMany = exports.db_patchMultipleByAsync = exports.db_patchMultipleBy = exports.db_patchSingleByAsync = exports.db_patchSingleBy = exports.db_patchSingleAsync = exports.db_patchSingle = exports.db_upsertSingleByAsync = exports.db_upsertSingleBy = exports.db_upsertManyByAsync = exports.db_upsertManyBy = exports.db_updateManyBy = exports.db_updateManyAsync = exports.db_updateMany = exports.db_updateSingleAsync = exports.db_updateSingle = exports.db_insertManyAsync = exports.db_insertMany = exports.db_insertSingleAsync = exports.db_insertSingle = exports.db_countAsync = exports.db_count = exports.db_aggregateAsync = exports.db_aggregate = exports.db_findManyPagedAsync = exports.db_findManyPaged = exports.db_findManyAsync = exports.db_findMany = exports.db_findSingleAsync = exports.db_findSingle = exports.db_getDbAsync = exports.db_getDb = exports.db_getCollectionAsync = exports.db_getCollection = exports.db_profiler_toggle = exports.db_profiler_getData = void 0;
var DriverCore_1 = _src_mongo_DriverCore;
var DriverUtils_1 = _src_mongo_DriverUtils;
var deprecated_1 = _src_utils_deprecated;
var bson_1 = _src_utils_bson;
var promise_1 = _src_utils_promise;
// {
//     key: { [property: string]: string | number }
//     name?: string
//     unique?: boolean
//     sparse?: boolean
//     [ key: string]: any
// }
var DriverProfiler_1 = _src_mongo_DriverProfiler;
Object.defineProperty(exports, "db_profiler_getData", { enumerable: true, get: function () { return DriverProfiler_1.core_profiler_getData; } });
var DriverProfiler_2 = _src_mongo_DriverProfiler;
Object.defineProperty(exports, "db_profiler_toggle", { enumerable: true, get: function () { return DriverProfiler_2.core_profiler_toggle; } });
function withDb(onError, server, fn) {
    return __awaiter(this, void 0, void 0, function () {
        var cachedDB, _a, err, db;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cachedDB = DriverCore_1.core.getDb(server);
                    if (!(cachedDB == null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, promise_1.promise.toCallback(DriverCore_1.core.connect(server))];
                case 1:
                    _a = _b.sent(), err = _a[0], db = _a[1];
                    if (err) {
                        onError(err);
                        return [2 /*return*/];
                    }
                    fn(db);
                    return [2 /*return*/];
                case 2:
                    fn(cachedDB);
                    return [2 /*return*/];
            }
        });
    });
}
function withDbAsync(server, fn) {
    var db = DriverCore_1.core.getDb(server);
    if (db == null) {
        return new Promise(function (resolve, reject) {
            promise_1.promise.toCallback(DriverCore_1.core.connect(server), function (err, db) {
                if (err) {
                    reject(err);
                    return;
                }
                fn(db).then(resolve, reject);
            });
            return;
        });
    }
    return fn(db);
}
function db_getCollection(meta, cb) {
    withDb(cb, meta.server, function (db) {
        var coll = db.collection(meta.collection);
        if (coll == null) {
            return cb(new Error("<mongo> Collection Not Found: ".concat(meta)));
        }
        cb(null, coll);
    });
}
exports.db_getCollection = db_getCollection;
;
function db_getCollectionAsync(meta) {
    var _this = this;
    return withDbAsync(meta.server, function (db) { return __awaiter(_this, void 0, void 0, function () {
        var coll;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.collection(meta.collection)];
                case 1:
                    coll = _a.sent();
                    if (coll == null) {
                        throw new Error("<mongo> Collection Not Found: ".concat(meta));
                    }
                    return [2 /*return*/, coll];
            }
        });
    }); });
}
exports.db_getCollectionAsync = db_getCollectionAsync;
;
function db_getDb(server, callback) {
    withDb(callback, server, function (db) {
        callback(null, db);
    });
}
exports.db_getDb = db_getDb;
;
function db_getDbAsync(server) {
    var _this = this;
    return withDbAsync(server, function (db) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db];
        });
    }); });
}
exports.db_getDbAsync = db_getDbAsync;
;
function db_findSingle(meta, query, options, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.findSingle(db, meta.collection, queryToMongo(query), options, callback);
    });
}
exports.db_findSingle = db_findSingle;
;
function db_findSingleAsync(meta, query, options) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.findSingleAsync(db, meta.collection, queryToMongo(query), options);
    });
}
exports.db_findSingleAsync = db_findSingleAsync;
;
function db_findMany(meta, query, options, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.findMany(db, meta.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_findMany = db_findMany;
;
function db_findManyAsync(meta, query, options) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.findManyAsync(db, meta.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {});
    });
}
exports.db_findManyAsync = db_findManyAsync;
;
function db_findManyPaged(meta, query, options, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.findManyPaged(db, meta.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_findManyPaged = db_findManyPaged;
;
function db_findManyPagedAsync(meta, query, options) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, withDbAsync(meta.server, function (db) {
                    return DriverCore_1.core.findManyPagedAsync(db, meta.collection, queryToMongo(query), options !== null && options !== void 0 ? options : {});
                })];
        });
    });
}
exports.db_findManyPagedAsync = db_findManyPagedAsync;
;
function db_aggregate(meta, pipeline, options, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.aggregate(db, meta.collection, pipeline, options !== null && options !== void 0 ? options : {}, callback);
    });
}
exports.db_aggregate = db_aggregate;
;
function db_aggregateAsync(meta, pipeline, options) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.aggregateAsync(db, meta.collection, pipeline, options !== null && options !== void 0 ? options : {});
    });
}
exports.db_aggregateAsync = db_aggregateAsync;
;
function db_count(meta, query, options, callback) {
    if (options === void 0) { options = null; }
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.count(db, meta.collection, query, options, callback);
    });
}
exports.db_count = db_count;
;
function db_countAsync(meta, query, options) {
    if (options === void 0) { options = null; }
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.countAsync(db, meta.collection, query, options);
    });
}
exports.db_countAsync = db_countAsync;
;
// export function db_insert(meta:TDbCollection, data, callback) {
//     withDb(callback, meta.server, db => {
//         promise.toCallback(
//             db
//                 .collection(meta.collection)
//                 .insert(data, {})
//             , callback
//         );
//     });
// };
function db_insertSingle(meta, data, callback) {
    withDb(callback, meta.server, function (db) {
        promise_1.promise.toCallback(db
            .collection(meta.collection)
            .insertOne(data, {}), callback);
    });
}
exports.db_insertSingle = db_insertSingle;
;
function db_insertSingleAsync(meta, data) {
    return withDbAsync(meta.server, function (db) {
        return db
            .collection(meta.collection)
            .insertOne(data);
    });
}
exports.db_insertSingleAsync = db_insertSingleAsync;
;
function db_insertMany(meta, data, callback) {
    withDb(callback, meta.server, function (db) {
        promise_1.promise.toCallback(db
            .collection(meta.collection)
            .insertMany(data, {}), callback);
    });
}
exports.db_insertMany = db_insertMany;
;
function db_insertManyAsync(meta, data) {
    return withDbAsync(meta.server, function (db) {
        return db
            .collection(meta.collection)
            .insertMany(data, {});
    });
}
exports.db_insertManyAsync = db_insertManyAsync;
;
function db_updateSingle(meta, data, callback) {
    withDb(callback, meta.server, function (db) {
        if (data._id == null)
            return callback('<mongo:update> invalid ID');
        var query = {
            _id: DriverUtils_1.DriverUtils.ensureObjectID(data._id)
        };
        DriverCore_1.core.updateSingle(db, meta, query, data, callback);
    });
}
exports.db_updateSingle = db_updateSingle;
;
function db_updateSingleAsync(meta, data) {
    return withDbAsync(meta.server, function (db) {
        if (data._id == null) {
            return Promise.reject('<mongo:update> invalid ID');
        }
        var query = {
            _id: DriverUtils_1.DriverUtils.ensureObjectID(data._id)
        };
        return DriverCore_1.core.updateSingleAsync(db, meta, query, data);
    });
}
exports.db_updateSingleAsync = db_updateSingleAsync;
;
function db_updateMany(meta, array, callback) {
    withDb(callback, meta.server, function (db) {
        var batch = array.map(function (x) {
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
function db_updateManyAsync(meta, array) {
    return withDbAsync(meta.server, function (db) {
        var batch = array.map(function (x) {
            return [
                { _id: DriverUtils_1.DriverUtils.ensureObjectID(x._id) },
                x
            ];
        });
        return DriverCore_1.core.updateManyAsync(db, meta, batch);
    });
}
exports.db_updateManyAsync = db_updateManyAsync;
;
function db_updateManyBy(meta, finder, array, callback) {
    withDb(callback, meta.server, function (db) {
        var batch = array.map(function (x) {
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
    withDb(callback, meta.server, function (db) {
        var batch = array.map(function (entity) {
            return [
                DriverUtils_1.DriverUtils.getFindQuery(finder, entity),
                entity
            ];
        });
        DriverCore_1.core.upsertMany(db, meta, batch, callback);
    });
}
exports.db_upsertManyBy = db_upsertManyBy;
;
function db_upsertManyByAsync(meta, finder, array) {
    var _this = this;
    return withDbAsync(meta.server, function (db) { return __awaiter(_this, void 0, void 0, function () {
        var batch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    batch = array.map(function (entity) {
                        return [
                            DriverUtils_1.DriverUtils.getFindQuery(finder, entity),
                            entity
                        ];
                    });
                    return [4 /*yield*/, DriverCore_1.core.upsertManyAsync(db, meta, batch)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
}
exports.db_upsertManyByAsync = db_upsertManyByAsync;
;
function db_upsertSingleBy(meta, finder, x, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.upsertSingle(db, meta.collection, DriverUtils_1.DriverUtils.getFindQuery(finder, x), x, callback);
    });
}
exports.db_upsertSingleBy = db_upsertSingleBy;
;
function db_upsertSingleByAsync(meta, finder, x) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.upsertSingleAsync(db, meta.collection, DriverUtils_1.DriverUtils.getFindQuery(finder, x), x);
    });
}
exports.db_upsertSingleByAsync = db_upsertSingleByAsync;
;
function db_patchSingle(meta, id, patch, callback) {
    withDb(callback, meta.server, function (db) {
        var query = { _id: DriverUtils_1.DriverUtils.ensureObjectID(id) };
        DriverCore_1.core.updateSingle(db, meta, query, patch, callback);
    });
}
exports.db_patchSingle = db_patchSingle;
;
function db_patchSingleAsync(meta, id, patch) {
    return withDbAsync(meta.server, function (db) {
        var query = { _id: DriverUtils_1.DriverUtils.ensureObjectID(id) };
        return DriverCore_1.core.updateSingleAsync(db, meta, query, patch);
    });
}
exports.db_patchSingleAsync = db_patchSingleAsync;
;
function db_patchSingleBy(meta, query, patch, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.updateSingle(db, meta, query, patch, callback);
    });
}
exports.db_patchSingleBy = db_patchSingleBy;
;
function db_patchSingleByAsync(meta, query, patch) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.updateSingleAsync(db, meta, query, patch);
    });
}
exports.db_patchSingleByAsync = db_patchSingleByAsync;
;
function db_patchMultipleBy(meta, query, patch, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.updateMultiple(db, meta, query, patch, callback);
    });
}
exports.db_patchMultipleBy = db_patchMultipleBy;
;
function db_patchMultipleByAsync(meta, query, patch) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.updateMultipleAsync(db, meta, query, patch);
    });
}
exports.db_patchMultipleByAsync = db_patchMultipleByAsync;
;
function db_patchMany(meta, arr, callback) {
    withDb(callback, meta.server, function (db) {
        DriverCore_1.core.patchMany(db, meta, arr, callback);
    });
}
exports.db_patchMany = db_patchMany;
function db_patchManyAsync(meta, arr) {
    return withDbAsync(meta.server, function (db) {
        return DriverCore_1.core.patchManyAsync(db, meta, arr);
    });
}
exports.db_patchManyAsync = db_patchManyAsync;
function db_remove(meta, query, isSingle, callback) {
    withDb(callback, meta.server, function (db) {
        query = queryToMongo(query);
        var fn = isSingle
            ? DriverCore_1.core.removeSingle
            : DriverCore_1.core.removeMany;
        fn(db, meta.collection, query, callback);
    });
}
exports.db_remove = db_remove;
;
function db_removeAsync(meta, query, isSingle) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, withDbAsync(meta.server, function (db) {
                    query = queryToMongo(query);
                    var fn = isSingle
                        ? DriverCore_1.core.removeSingleAsync
                        : DriverCore_1.core.removeManyAsync;
                    return fn(db, meta.collection, query);
                })];
        });
    });
}
exports.db_removeAsync = db_removeAsync;
;
function db_ensureIndexes(meta, indexes, callback) {
    withDb(callback, meta.server, function (db) {
        var dbCollection = db.collection(meta.collection);
        promise_1.promise.toCallback(dbCollection.createIndexes(indexes), callback);
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
    (0, bson_1.bson_normalizeQuery)(query);
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
                    (0, deprecated_1.deprecated_log)('07.2021 "foo": ">1" will be dropped. Use mongo queries instead');
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_Driver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_Driver) && __isObj(module.exports)) {
        Object.assign(_src_mongo_Driver, module.exports);
    } else {
        _src_mongo_Driver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_utils != null ? _src_mongo_utils : {};
    var module = { exports: exports };

    "use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
function cb_toPromise(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        fn.apply(void 0, __spreadArray(__spreadArray([], args, false), [function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }], false));
    });
}
exports.cb_toPromise = cb_toPromise;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_utils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_utils) && __isObj(module.exports)) {
        Object.assign(_src_mongo_utils, module.exports);
    } else {
        _src_mongo_utils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_projection;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_projection != null ? _src_utils_projection : {};
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
                pathNext = "".concat(path, ".").concat(key);
            }
            if (val == null || typeof val !== 'object') {
                out[pathNext] = val;
                continue;
            }
            flatternByKey(pathNext, val, out);
        }
    }
})(ProjectionUtil = exports.ProjectionUtil || (exports.ProjectionUtil = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_projection === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_projection) && __isObj(module.exports)) {
        Object.assign(_src_utils_projection, module.exports);
    } else {
        _src_utils_projection = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoEntity;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_MongoEntity != null ? _src_MongoEntity : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoEntityFor = exports.MongoEntity = void 0;
var class_json_1 = require("class-json");
var Driver_1 = _src_mongo_Driver;
var MongoMeta_1 = _src_MongoMeta;
var atma_utils_1 = require("atma-utils");
var utils_1 = _src_mongo_utils;
var patchObject_1 = _src_utils_patchObject;
var projection_1 = _src_utils_projection;
var bson_1 = _src_utils_bson;
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
    /**
     * Equivalent to `findOne` method.
     * @param query [MongoDB fetch query](https://mongodb.github.io/node-mongodb-native/4.0/modules.html#filter)
     * @param options @see https://mongodb.github.io/node-mongodb-native/4.0/interfaces/findoptions.html
     * @returns
     */
    MongoEntity.fetch = function (query, options) {
        return __awaiter(this, void 0, Promise, function () {
            var coll, dbJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coll = MongoMeta_1.MongoMeta.getCollection(this);
                        return [4 /*yield*/, (0, Driver_1.db_findSingleAsync)(coll, query, options)];
                    case 1:
                        dbJson = _a.sent();
                        if (dbJson == null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, (0, bson_1.bson_toEntity)(dbJson, this)];
                }
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
            var meta, arr;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        meta = MongoMeta_1.MongoMeta.getCollection(this);
                        return [4 /*yield*/, (0, Driver_1.db_findManyAsync)(meta, query, options)];
                    case 1:
                        arr = _a.sent();
                        if (arr == null) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, arr.map(function (dbJson) { return (0, bson_1.bson_toEntity)(dbJson, _this); })];
                }
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
            var coll, _a, collection, total;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        coll = MongoMeta_1.MongoMeta.getCollection(this);
                        return [4 /*yield*/, (0, Driver_1.db_findManyPagedAsync)(coll, query, options)];
                    case 1:
                        _a = _b.sent(), collection = _a.collection, total = _a.total;
                        if (collection != null) {
                            collection = collection.map(function (dbJson) { return (0, bson_1.bson_toEntity)(dbJson, _this); });
                        }
                        return [2 /*return*/, {
                                collection: collection,
                                total: total
                            }];
                }
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
            var coll, arr;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coll = MongoMeta_1.MongoMeta.getCollection(this);
                        return [4 /*yield*/, (0, Driver_1.db_aggregateAsync)(coll, pipeline, options)];
                    case 1:
                        arr = _a.sent();
                        return [2 /*return*/, arr === null || arr === void 0 ? void 0 : arr.map(function (dbJson) { var _a; return (0, bson_1.bson_toEntity)(dbJson, (_a = options === null || options === void 0 ? void 0 : options.Type) !== null && _a !== void 0 ? _a : _this); })];
                }
            });
        });
    };
    MongoEntity.aggregateManyPaged = function (pipeline, options) {
        var _a, _b;
        return __awaiter(this, void 0, Promise, function () {
            var coll, countPipeline, i, x, $facet, resArr, doc, arr;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
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
                        $facet = [{
                                $facet: {
                                    collection: pipeline,
                                    total: countPipeline
                                }
                            }];
                        return [4 /*yield*/, (0, Driver_1.db_aggregateAsync)(coll, $facet, options)];
                    case 1:
                        resArr = _c.sent();
                        doc = resArr[0];
                        arr = doc.collection;
                        if (arr != null) {
                            arr = arr.map(function (dbJson) { var _a; return (0, bson_1.bson_toEntity)(dbJson, (_a = options === null || options === void 0 ? void 0 : options.Type) !== null && _a !== void 0 ? _a : _this); });
                        }
                        return [2 /*return*/, {
                                collection: arr,
                                total: (_b = (_a = doc.total[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0
                            }];
                }
            });
        });
    };
    MongoEntity.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var coll;
            return __generator(this, function (_a) {
                coll = MongoMeta_1.MongoMeta.getCollection(this);
                return [2 /*return*/, (0, Driver_1.db_countAsync)(coll, query)];
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
                return [2 /*return*/, EntityMethods.saveMany(arr, this)];
            });
        });
    };
    MongoEntity.upsertManyBy = function (finder, arr) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EntityMethods.upsertManyBy(finder, arr, this)];
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
        return __awaiter(this, void 0, void 0, function () {
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
                return [2 /*return*/, (0, Driver_1.db_getCollectionAsync)(coll)];
            });
        });
    };
    MongoEntity.getDb = function (server) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, Driver_1.db_getDbAsync)(server)];
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
    return (0, atma_utils_1.mixin)(Base, MongoEntity);
}
exports.MongoEntityFor = MongoEntityFor;
var EntityMethods;
(function (EntityMethods) {
    function save(x) {
        return __awaiter(this, void 0, Promise, function () {
            var coll, json, inserted, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        coll = MongoMeta_1.MongoMeta.getCollection(x);
                        json = (0, bson_1.bson_fromObject)(x);
                        if (!(json._id == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, Driver_1.db_insertSingleAsync)(coll, json)];
                    case 1:
                        inserted = _a.sent();
                        json._id = x._id = inserted.insertedId;
                        return [2 /*return*/, x];
                    case 2: return [4 /*yield*/, (0, Driver_1.db_updateSingleAsync)(coll, json)];
                    case 3:
                        updated = _a.sent();
                        return [2 /*return*/, x];
                }
            });
        });
    }
    EntityMethods.save = save;
    function saveBy(finder, x, Type) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var coll, json, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Type = Type !== null && Type !== void 0 ? Type : x.constructor;
                        coll = MongoMeta_1.MongoMeta.getCollection(Type);
                        if (coll == null) {
                            return [2 /*return*/, Promise.reject(new Error("<class:patch> 'Collection' is not defined for ".concat(Type.name)))];
                        }
                        json = (0, bson_1.bson_fromObject)(x, Type);
                        return [4 /*yield*/, (0, Driver_1.db_upsertSingleByAsync)(coll, finder, json)];
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
    function saveMany(arr, Type) {
        return __awaiter(this, void 0, Promise, function () {
            var coll, insert, insertIndexes, update, i_1, x, json, _a, insertResult, updateResult, ops, i, index, id, awaitCount, dfr, listener;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (arr == null || arr.length === 0) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        Type = Type !== null && Type !== void 0 ? Type : arr[0].constructor;
                        coll = MongoMeta_1.MongoMeta.getCollection(Type);
                        insert = [];
                        insertIndexes = [];
                        update = [];
                        for (i_1 = 0; i_1 < arr.length; i_1++) {
                            x = arr[i_1];
                            json = (0, bson_1.bson_fromObject)(x, Type);
                            if (x._id == null) {
                                insert.push(json);
                                insertIndexes.push(i_1);
                                continue;
                            }
                            update.push(json);
                        }
                        return [4 /*yield*/, Promise.all([
                                insert.length > 0 ? (0, Driver_1.db_insertManyAsync)(coll, insert) : null,
                                update.length > 0 ? (0, Driver_1.db_updateManyAsync)(coll, update) : null,
                            ])];
                    case 1:
                        _a = _b.sent(), insertResult = _a[0], updateResult = _a[1];
                        if (insertResult != null) {
                            ops = insertResult.insertedIds;
                            if (ops == null) {
                                throw new Error('<mongo:bulk insert> array expected');
                            }
                            /**
                            *   @TODO make sure if mongodb returns an array of inserted documents
                            *   in the same order as it was passed to the insert method
                            */
                            for (i = 0; i < insertIndexes.length; i++) {
                                index = insertIndexes[i];
                                id = ops[i];
                                if (id == null) {
                                    console.log('Invalid key on insert', i, ops);
                                    throw new Error("Invalid key");
                                }
                                arr[index]._id = id;
                            }
                        }
                        return [2 /*return*/, arr];
                }
            });
        });
    }
    EntityMethods.saveMany = saveMany;
    function upsertManyBy(finder, arr, Type) {
        return __awaiter(this, void 0, Promise, function () {
            var coll, jsons, result, upserted, i, _a, index, _id, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (arr == null || arr.length === 0) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        Type = Type !== null && Type !== void 0 ? Type : arr[0].constructor;
                        coll = MongoMeta_1.MongoMeta.getCollection(Type);
                        jsons = arr.map(function (x) { return (0, bson_1.bson_fromObject)(x, Type); });
                        return [4 /*yield*/, (0, Driver_1.db_upsertManyByAsync)(coll, finder, jsons)];
                    case 1:
                        result = _b.sent();
                        upserted = result.getUpsertedIds();
                        for (i = 0; i < upserted.length; i++) {
                            _a = upserted[i], index = _a.index, _id = _a._id;
                            x = arr[index];
                            if (x._id == null) {
                                x._id = _id;
                            }
                            else if (String(x._id) !== String(upserted[i])) {
                                throw new Error("Unexpected missmatch: ".concat(x._id, " != ").concat(upserted[i]));
                            }
                        }
                        return [2 /*return*/, arr];
                }
            });
        });
    }
    EntityMethods.upsertManyBy = upsertManyBy;
    function patchBy(coll, finder, patch, opts) {
        var update = (0, patchObject_1.obj_partialToUpdateFilter)(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep, coll);
        return (0, utils_1.cb_toPromise)(Driver_1.db_patchSingleBy, coll, finder, update);
    }
    EntityMethods.patchBy = patchBy;
    function patchMultipleBy(coll, finder, patch, opts) {
        var update = (0, patchObject_1.obj_partialToUpdateFilter)(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep, coll);
        return (0, Driver_1.db_patchMultipleByAsync)(coll, finder, update);
    }
    EntityMethods.patchMultipleBy = patchMultipleBy;
    function patch(coll, instance, patch, opts) {
        return __awaiter(this, void 0, Promise, function () {
            var id, update, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = instance._id;
                        if (id == null) {
                            return [2 /*return*/, Promise.reject(new Error("<patch> '_id' is not defined for ".concat(coll)))];
                        }
                        update = (0, patchObject_1.obj_partialToUpdateFilter)(patch, false, opts === null || opts === void 0 ? void 0 : opts.deep, coll);
                        (0, patchObject_1.obj_patch)(instance, update);
                        return [4 /*yield*/, (0, Driver_1.db_patchSingleAsync)(coll, id, update)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, instance];
                }
            });
        });
    }
    EntityMethods.patch = patch;
    function patchMany(coll, arr, opts) {
        if (opts === null || opts === void 0 ? void 0 : opts.deep) {
            for (var i = 0; i < arr.length; i++) {
                arr[i][1] = (0, patchObject_1.obj_partialToUpdateFilter)(arr[i][1], false, /* deep */ true, coll);
            }
        }
        return (0, Driver_1.db_patchManyAsync)(coll, arr);
    }
    EntityMethods.patchMany = patchMany;
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
    function del(coll, entity) {
        if (coll == null) {
            return Promise.reject(new Error("Delete for ".concat(entity._id, " failed as Collection is not set")));
        }
        if (entity._id == null) {
            return Promise.reject(new Error("Delete in ".concat(coll, " failed as ID is undefined")));
        }
        return (0, Driver_1.db_removeAsync)(coll, { _id: entity._id }, true);
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
        return (0, Driver_1.db_removeAsync)(coll, { _id: { $in: ids } }, false);
    }
    EntityMethods.delMany = delMany;
})(EntityMethods || (EntityMethods = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_MongoEntity === module.exports) {
        // do nothing if
    } else if (__isObj(_src_MongoEntity) && __isObj(module.exports)) {
        Object.assign(_src_MongoEntity, module.exports);
    } else {
        _src_MongoEntity = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_IndexHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_IndexHandler != null ? _src_mongo_IndexHandler : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        (0, Driver_1.db_ensureIndexes)(meta, meta.indexes, callback);
    }
    IndexHandler.ensure = ensure;
    function ensureAll(callback) {
        var imax = TYPES.length, listener = (0, utils_1.cb_createListener)(imax, callback), i = -1;
        while (++i < imax) {
            ensure(TYPES[i], listener);
        }
    }
    IndexHandler.ensureAll = ensureAll;
})(IndexHandler = exports.IndexHandler || (exports.IndexHandler = {}));
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_IndexHandler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_IndexHandler) && __isObj(module.exports)) {
        Object.assign(_src_mongo_IndexHandler, module.exports);
    } else {
        _src_mongo_IndexHandler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoIndexes;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_MongoIndexes != null ? _src_MongoIndexes : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoIndexes = void 0;
var IndexHandler_1 = _src_mongo_IndexHandler;
var utils_1 = _src_mongo_utils;
var MongoIndexes;
(function (MongoIndexes) {
    function ensureAll() {
        return (0, utils_1.cb_toPromise)(IndexHandler_1.IndexHandler.ensureAll);
    }
    MongoIndexes.ensureAll = ensureAll;
})(MongoIndexes = exports.MongoIndexes || (exports.MongoIndexes = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_MongoIndexes === module.exports) {
        // do nothing if
    } else if (__isObj(_src_MongoIndexes) && __isObj(module.exports)) {
        Object.assign(_src_MongoIndexes, module.exports);
    } else {
        _src_MongoIndexes = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_MongoUtils != null ? _src_MongoUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_MongoUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_MongoUtils) && __isObj(module.exports)) {
        Object.assign(_src_MongoUtils, module.exports);
    } else {
        _src_MongoUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoProfiler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_MongoProfiler != null ? _src_MongoProfiler : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoProfiler = void 0;
var Driver_1 = _src_mongo_Driver;
var MongoProfiler;
(function (MongoProfiler) {
    function toggle(enabled, settings) {
        (0, Driver_1.db_profiler_toggle)(enabled, settings);
    }
    MongoProfiler.toggle = toggle;
    function getData() {
        return (0, Driver_1.db_profiler_getData)();
    }
    MongoProfiler.getData = getData;
})(MongoProfiler = exports.MongoProfiler || (exports.MongoProfiler = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_MongoProfiler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_MongoProfiler) && __isObj(module.exports)) {
        Object.assign(_src_MongoProfiler, module.exports);
    } else {
        _src_MongoProfiler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_MongoBson;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_MongoBson != null ? _src_MongoBson : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBson = void 0;
var bson_1 = _src_utils_bson;
var MongoBson;
(function (MongoBson) {
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
    function fromObject(mix, Type) {
        return (0, bson_1.bson_fromObject)(mix, Type);
    }
    MongoBson.fromObject = fromObject;
    function toObject(bson, Type) {
        return (0, bson_1.bson_toObject)(bson, Type);
    }
    MongoBson.toObject = toObject;
})(MongoBson = exports.MongoBson || (exports.MongoBson = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_MongoBson === module.exports) {
        // do nothing if
    } else if (__isObj(_src_MongoBson) && __isObj(module.exports)) {
        Object.assign(_src_MongoBson, module.exports);
    } else {
        _src_MongoBson = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_types_Types;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_types_Types != null ? _src_types_Types : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = void 0;
var MongoLib = require("mongodb");
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
            case 'object':
                var bsonType = val._bsontype;
                if (bsonType === 'Decimal128') {
                    return val;
                }
                break;
        }
        throw new Error("Invalid decimal type for ".concat(val, " (").concat(typeof val, ")"));
    }
    Types.Decimal128 = Decimal128;
    Types.Mapping = {
        decimal: Decimal128,
    };
})(Types = exports.Types || (exports.Types = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_types_Types === module.exports) {
        // do nothing if
    } else if (__isObj(_src_types_Types) && __isObj(module.exports)) {
        Object.assign(_src_types_Types, module.exports);
    } else {
        _src_types_Types = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_mongo_CollectionHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_mongo_CollectionHandler != null ? _src_mongo_CollectionHandler : {};
    var module = { exports: exports };

    "use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionHandler = void 0;
var Driver_1 = _src_mongo_Driver;
var MongoMeta_1 = _src_MongoMeta;
var alot_1 = _node_modules_alot_lib_alot;
var CollectionHandler;
(function (CollectionHandler) {
    var Collections = [];
    function register(Ctor, name, options) {
        var meta = MongoMeta_1.MongoMeta.resolveModelMeta(Ctor);
        meta.collection = name;
        meta.server = options === null || options === void 0 ? void 0 : options.server;
        Collections.push({ name: name, options: options, Ctor: Ctor });
        return meta;
    }
    CollectionHandler.register = register;
    function ensureCollections() {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, alot_1.default)(Collections)
                            .filter(function (x) { var _a; return ((_a = x.options) === null || _a === void 0 ? void 0 : _a.collection) != null; })
                            .groupBy(function (x) { return x.options.server; })
                            .forEachAsync(function (group) { return __awaiter(_this, void 0, void 0, function () {
                            var db;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, Driver_1.db_getDbAsync)(group.key)];
                                    case 1:
                                        db = _a.sent();
                                        return [4 /*yield*/, (0, alot_1.default)(group.values).forEachAsync(function (table) {
                                                return db.createCollection(table.name, table.options.collection);
                                            }).toArrayAsync()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .toArrayAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    CollectionHandler.ensureCollections = ensureCollections;
})(CollectionHandler = exports.CollectionHandler || (exports.CollectionHandler = {}));
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_mongo_CollectionHandler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_mongo_CollectionHandler) && __isObj(module.exports)) {
        Object.assign(_src_mongo_CollectionHandler, module.exports);
    } else {
        _src_mongo_CollectionHandler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_decos;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_decos != null ? _src_decos : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbType = exports.index = exports.table = void 0;
var MongoMeta_1 = _src_MongoMeta;
var atma_utils_1 = require("atma-utils");
var IndexHandler_1 = _src_mongo_IndexHandler;
var Types_1 = _src_types_Types;
var CollectionHandler_1 = _src_mongo_CollectionHandler;
function table(name, options) {
    return function (target) {
        if (typeof target !== 'function') {
            throw new Error("Decorator for table ".concat(name, " must be called on class Ctor"));
        }
        CollectionHandler_1.CollectionHandler.register(target, name, options);
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
            idx.key = (0, atma_utils_1.obj_extend)(idx.key, (_a = {}, _a[propertyKey] = type, _a));
            (0, atma_utils_1.obj_extend)(idx, opts);
            IndexHandler_1.IndexHandler.register(typeof target === 'function' ? target : target.constructor);
            return;
        }
        var raw = arg1;
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
function dbType(CtorMix, mix) {
    var opts = typeof mix === 'function' ? {
        Type: mix
    } : mix;
    return function (target, propertyKey, descriptor) {
        var _a;
        var meta = MongoMeta_1.MongoMeta.resolveModelMeta(target);
        if (meta.types == null) {
            meta.types = [];
        }
        var Ctor = typeof CtorMix === 'string'
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
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_decos === module.exports) {
        // do nothing if
    } else if (__isObj(_src_decos) && __isObj(module.exports)) {
        Object.assign(_src_decos, module.exports);
    } else {
        _src_decos = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbType = exports.index = exports.table = exports.MongoBson = exports.MongoProfiler = exports.MongoMeta = exports.MongoUtils = exports.MongoSettings = exports.MongoIndexes = exports.MongoEntity = void 0;
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
var MongoBson_1 = _src_MongoBson;
Object.defineProperty(exports, "MongoBson", { enumerable: true, get: function () { return MongoBson_1.MongoBson; } });
var decos_1 = _src_decos;
Object.defineProperty(exports, "table", { enumerable: true, get: function () { return decos_1.table; } });
Object.defineProperty(exports, "index", { enumerable: true, get: function () { return decos_1.index; } });
Object.defineProperty(exports, "dbType", { enumerable: true, get: function () { return decos_1.dbType; } });


}));

// end:source ./UMD.js
