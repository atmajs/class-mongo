<p align='center'>
    <img src='assets/logo.png'/>
</p>

<h2 align="center"> <code>class-mongo</code> / MongoDB persistence layer</h2>

<p align="center">
    <a href='https://dl.circleci.com/status-badge/redirect/gh/atmajs/class-mongo/tree/master' target='_blank'>
        <img src='https://dl.circleci.com/status-badge/img/gh/atmajs/class-mongo/tree/master.svg?style=svg' />
    </a>
    <a href='http://badge.fury.io/js/class-mongo' target='_blank'>
        <img src='https://badge.fury.io/js/class-mongo.svg' />
    </a>
</p>


Lightweight but powerful MongoDB ORM on top of class entities. Backed by [`mongodb`](https://www.npmjs.com/package/mongodb) native driver.

> with TypeScript support


* [class-json](https://github.com/tenbits/class-json) is used as a `Serialization` and `Validation` library.
> _this is loosely coupled and can be replaced with any other_

* Can be decoupled from base classes:
> _you may want to share same models in nodejs and browser environments_


### Short example to get the feeling.

```ts
import { Serializable, Json, Rule } from 'class-json'

export class User extends Serializable<User> {
    _id: string

    @Rule.required()
    name: string

    @Rule.pattern(/@/)
    email: string

    @Json.type(Date)
    createdAt = new Date()

    @Json.type(BigInt)
    amount: bigint
}
```

```ts
import { User } from './User'
import { MongoEntityFor, table, index, dbType } from 'class-mongo'


@table('users')
export class UserDb extends MongoEntityFor(User) {

    @index({ unique: true })
    email: string

    /*(MongoType, JsType)*/
    @dbType('decimal', BigInt)
    amount: bigint
}


// e.g
let user = new UserDb({
    name: 'Smith',
    email: 'foo@bar.fake'
});
await user.upsert();
console.log(user._id);
```

Same as a single class:

```ts
import { Serializable, Json, Rule } from 'class-json'
import { MongoEntity, table, index } from 'class-mongo'

@table('users')
export class User extends MongoEntity<User> {
    _id: string

    @index({ unique: true })
    @Rule.required()
    name: string

    @Rule.pattern(/@/)
    email: string

    @Json.type(Date)
    createdAt: Date
}
```

# &#9776; API


- `1` [class MongoEntity](#1-mongoentity)
	- `1.01` [static fetch](#101-static-fetch)
    - `1.02` [static fetchPartial](#101-static-fetch-partial)
	- `1.03` [static fetchMany](#102-static-fetchmany)
    - `1.04` [static fetchManyPartial](#102-static-fetchmany-partial)
    - `1.05` [static fetchManyPaged](#102-static-fetchmany-paged)
    - `1.06` [static fetchManyPagedPartial](#102-static-fetchmany-paged-partial)
    - `1.07` [static count](#103-static-count)
    - `1.08` [static upsert](#104-static-upsert)
    - `1.09` [static upsertBy](#104-static-upsert)
    - `1.10` [static upsertMany](#105-static-upsertmany)
    - `1.11` [static upsertManyBy](#105-static-upsertmanyby)
    - `1.12` [static patch](#106-static-patch)
    - `1.13` [static del](#107-static-del)
    - `1.14` [static delMany](#108-static-delmany)

    - `1.15` [static getCollection](#109-getcollection)
    - `1.16` [static getDb](#110-static-getdb)

    - `1.17` [.upsert](#111-upsert)
    - `1.18` [.patch](#112-patch)
    - `1.19` [.del](#113-del)


- `2` [namespace MongoSettings](#2-namespace-mongosettings)
    - `2.1` [define](#21-define)
    - `2.2` [interface IMongoSettings](#22-interface-imongosettings)
        - `2.2.1` [connection](#221-connection)
        - `2.2.2` [db](#222-db)
        - `2.2.3` [ip](#223-ip)
        - `2.2.4` [port](#224-port)
        - `2.2.5` [name](#225-name)

- `3` [namespace MongoIndexes](#3-namespace-mongoindexes)
    - `3.1` [ensureAll](#31-ensureall)

- `4` [decorators](#4-decorators)
    - `4.1` [table](#41-table)
    - `4.2` [index](#42-index)
    - `4.3` [dbType](#43-dbtype)

----

## 1 `MongoEntity`

#### `1.01` `static fetch`

- Parameters: [#findOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#findOne)
- Returns: `class instance`

```typescript
let user = await UserEntity.fetch({ username: 'foo' });
```

#### `1.02` `static fetchPartial`

Similar to `fetch` but has strongly typed **Input** projection and strongly typed **Output** partial entity model.

- Parameters: [#findOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#findOne)
- Returns: class instance with omitted fields not included in `projection`

```typescript
let user = await UserEntity.fetchPartial({ username: 'foo' }, {
    projection: {
        email: 1
    }
});

// User is of type Pick<UserEntity, 'email'>
console.log(user.email); // OK
console.log(user.username); // TypeScript Error
```

#### `1.03` `static fetchMany`
- Parameters: [#find](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#find)
- Returns: `array of class instances`

```typescript
let users = await UserEntity.fetchMany({ visits: { $gte: 100 }});
```

#### `1.03` `static fetchManyPartial`
- Parameters: [#find](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#find)
- Returns: array of class instances with omitted fields not included in `projection`

```typescript
let users = await UserEntity.fetchMany({
    visits: { $gte: 100 }
}, {
    projection: {  username: 1 }
});
```


#### `1.03` `static fetchManyPaged`

Similar to `fetchMany` but requires `limit` and `skip`, returns also `total` amount of documents.

- Parameters: [#find](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#find)
- Returns: ` { collection: InstanceType<T>[], total: number } `

```typescript
let users = await UserEntity.fetchMany({
    visits: { $gte: 100 }
}, {
    sort: { username: 1 },
    limit: 50,
    skip: 0
});
```

#### `1.03` `static fetchManyPagedPartial`

Similar to `fetchManyPaged` but also requires `projection` field and returns strongly types models.

- Parameters: [#find](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#find)
- Returns: ` { collection: InstanceType<Partial<T>>[], total: number } `

```typescript
let users = await UserEntity.fetchMany({
    visits: { $gte: 100 }
}, {
    sort: { username: 1 },
    limit: 50,
    skip: 0
});
```

#### `1.03` `static count`

- Parameters: [#countDocuments](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#countDocuments)
- Returns: `number`

#### `1.05` `static upsert`

- Parameters: [#updateOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#updateOne) / [#insertOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#insertOne)
- Returns: class entity (with `_id` field set in case of `insert` action)

If `_id` is not present the model will be inserted, otherwise updated.

```typescript
let user = await UserEntity.upsert({ username: 'foo', email: 'foo@bar.foo' });
```

#### `1.05` `static upsertBy`

- Parameters: [#updateOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#updateOne) / [#insertOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#insertOne)
- Returns: class entity (with `_id` field set in case of `insert` action)

Inserts or updates the document based on the field value

```typescript
let user = await UserEntity.upsertBy('username', { username: 'foo', email: 'foo@bar.foo' }, {});
```


#### `1.05` `static upsertMany`

- Parameters: [#updateOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#updateOne) / [#insertOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#insertOne)
- Returns: array of class entities

#### `1.05` `static upsertManyBy`

- Parameters: [#updateOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#updateOne) / [#insertOne](https://mongodb.github.io/node-mongodb-native/5.1/classes/Collection.html#insertOne)
- Returns: array of class entities



## 2 `MongoSettings`

#### `2.1` `define`

Configurate mongo connection before making any mongodb requests

```typescript
import { MongoSettings } from 'class-mongo';

MongoSettings.define({
    db: 'fooTables'
    connection: 'connection_string';
    params: {
        // additional parameters if needed
    }
});

```

----
:copyright: MIT - Atma.js

