import MongoLib = require('mongodb');

export type TFindQuery<T = any> = (keyof T) | Partial<T> | ((x: Partial<T>) => MongoLib.QuerySelector<T>);