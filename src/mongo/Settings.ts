
let __ip = '127.0.0.1';
let __port = 27017;
let __db: string = null;
let __connection: string = null;
let __params = {
    auto_reconnect: true,
    native_parser: true,
    useUnifiedTopology: true,
    writeConcern: {
        w: 1
    },
};

export interface IMongoSettings {
    db: string
    ip?: string
    port?: number
    connection?: string
    params?: any
}

export namespace MongoSettings {
    export function define (setts: IMongoSettings) {
        setts_define(setts);
    }
}

export function setts_define (setts: IMongoSettings) {
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
};


export function setts_getConnectionString() {
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
        + __db
        ;
}

export function setts_getParams () {
    return __params;
}
export function setts_getDbName () {
    return __db;
}
