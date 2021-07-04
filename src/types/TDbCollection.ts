import { IMongoMeta } from '../MongoMeta';

export type TDbCollection = Pick<IMongoMeta, 'collection' | 'server'>;
