
export interface IMongoSettings {
    name?: string

    db: string
    ip?: string
    port?: number
    connection?: string
    params?: any
}



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
} as IMongoSettings;

const Servers = {} as { [name: string]: IMongoSettings }

export namespace MongoSettings {
    export function define (setts: IMongoSettings) {
        setts_define(setts);
    }
}

export function setts_define (setts: IMongoSettings) {
    let name = setts.name ?? 'default';
    let target = name === 'default' ? DefaultServer : Servers[name];
    if (target == null) {
        target = Servers[name] = { ...DefaultServer, name: setts?.name };
    }

    target.ip = setts.ip ?? target.ip;
    target.port = setts.port ?? target.port;
    target.db = setts.db ?? target.db;
    target.params = setts.params ?? target.params;
    target.connection = setts.connection ?? target.connection;
};


export function setts_getConnectionString(server: string = 'default') {
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
    let { ip, port, db} = setts;
    return `mongodb://${ip}:${port}/${db}`;
}

export function setts_getParams (server: string = 'default') {
    let setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    return setts.params;
}
export function setts_getDbName (server: string = 'default') {
    let setts = server == null || server === 'default' ? DefaultServer : Servers[server];
    return setts.db;
}
