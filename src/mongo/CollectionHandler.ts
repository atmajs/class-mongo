import { db_ensureIndexes, db_getDbAsync } from './Driver';
import { MongoMeta } from '../MongoMeta';
import { Constructor } from '../MongoEntity';
import { ITableSettings } from '../types/ITableSettings';
import alot from 'alot'

export namespace CollectionHandler {

    const Collections = [] as {
        name: string
        Ctor: Constructor
        options?: ITableSettings
    }[]

    export function register(Ctor: Constructor, name: string, options?: ITableSettings) {
        let meta = MongoMeta.resolveModelMeta(Ctor);
        meta.collection = name;
        meta.server = options?.server;
        Collections.push({ name, options, Ctor });
        return meta;
    }

    export async function ensureCollections () {

        await alot(Collections)
            .filter(x => x.options?.collection != null)
            .groupBy(x => x.options.server)
            .forEachAsync(async group => {

                let db = await db_getDbAsync(group.key);
                await alot(group.values).forEachAsync(table => {
                    return db.createCollection(table.name, table.options.collection);
                }).toArrayAsync();
            })
            .toArrayAsync();
    }


};

