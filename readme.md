<p align='center'>
    <img src='assets/logo.png'/>
</p>

<h2 align="center"> <code>class-mongo</code> / MongoDB persistence layer</h2>

<p align="center">
    <a href='https://travis-ci.com/atmajs/class-mongo' target='_blank'>
        <img src='https://travis-ci.com/atmajs/class-mongo.png?branch=master' />
    </a>
    <a href='http://badge.fury.io/js/class-mongo' target='_blank'>
        <img src='https://badge.fury.io/js/class-mongo.svg' />
    </a>
</p>

Lightweight but powerful MongoDB ORM on top of class entities.

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
	- `1.02` [static fetchMany](#102-static-fetchmany)
    - `1.03` [static count](#103-static-count)
    - `1.04` [static upsert](#104-static-upsert)
    - `1.05` [static upsertMany](#105-static-upsertmany)
    - `1.06` [static upsertManyBy](#105-static-upsertmanyby)
    - `1.07` [static patch](#106-static-patch)
    - `1.08` [static del](#107-static-del)
    - `1.09` [static delMany](#108-static-delmany)

    - `1.10` [static getCollection](#109-getcollection)
    - `1.11` [static getDb](#110-static-getdb)

    - `1.12` [.upsert](#111-upsert)
    - `1.13` [.patch](#112-patch)
    - `1.14` [.del](#113-del)


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

:copyright: MIT - Atma.js

