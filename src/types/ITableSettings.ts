import type { CreateCollectionOptions } from 'mongodb';

export interface ITableSettings {
    /** Server name, when not set, `default` is used */
    server?: string

    collection?: CreateCollectionOptions
}
