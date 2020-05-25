import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoIndexes, MongoSettings } from '../src/export';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json, JsonUtils } from 'class-json';

class User extends MongoEntity<User> {

    @Json.type(String)
    name: string
}

@table('users-extends')
class UserEx extends User {

}

UTest({
    async $before() {
        MongoSettings.define({ db: 'test-class' });

        const db = await MongoEntity.getDb();
        await db.dropDatabase();
    },
    async $after() {

        let db = await MongoEntity.getDb();
        await db.dropDatabase();

        MongoProfiler.toggle(false);
    },
    async 'has table name' () {
        let meta = JsonUtils.resolveModelMeta<any>(UserEx);
        eq_(meta.Type, UserEx);
        eq_(meta.collection, 'users-extends');
    },

    async 'upsert multiple' () {
        let users = [
            new UserEx({ name: 'Foo' }),
            new UserEx({ name: 'Bar' }),
        ];

        let result = await UserEx.upsertMany(users);
        eq_(result.length, 2);
        notEq_(result[0]._id, null);

        let foo = await UserEx.fetch({ name: 'Foo'});
        deepEq_(foo, result[0]);

        foo.name = 'Foo1';
        await foo.upsert();

        let foo1 = await UserEx.fetch({ name: 'Foo1'});
        notEq_(foo1._id, null);
    }
})
