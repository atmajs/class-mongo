Lightweight but powerful MongoDB persistance on top of class entities.

> with TypeScript support


1. Decoupled from base classes: _you may want to share same models in nodejs and browser environments_

```ts
export class User {
    _id: string
    name: string
    email: string
    createdAt: Date
}
```

```ts
import { User } from './User'
import { MongoEntityFor, table } from 'class-mongo'


@table('users')
export class UserDb extends MongoEntityFor(User) {

}

```

