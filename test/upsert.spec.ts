import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoIndexes, MongoSettings } from '../src/export';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json } from 'class-json';

@table('users')
class User extends MongoEntity<User> {

    @index({ unique: true })
    email: string

    @Json.type(String)
    name: string
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
    async 'ensure email indexes'() {

        new User();
        await MongoIndexes.ensureAll();
        let coll = await User.getCollection();
        let info = await coll.indexInformation();
        has_(info,
            {
                _id_: [ [ '_id', 1 ] ],
                email: [ [ 'email', 1 ] ]
            }
        );
    },
    async 'upsert multiple' () {



        class Foo extends MongoEntity<User> {

            email: string
            letters: { name: string, date: Date }[]
            age: number
        }


        let users = [
            new User({ name: 'Foo', email: 'foo@foo.fake' }),
            new User({ name: 'Bar', email: 'bar@bar.fake' }),
        ];

        let result = await User.upsertManyBy('email', users);
        eq_(result.length, 2);
        notEq_(result[0]._id, null);

        let foo = await User.fetch({ email: 'foo@foo.fake'});
        deepEq_(foo, result[0]);

        let update = [
            new User({ name: 'Foo1', email: 'foo@foo.fake' }),
            new User({ name: 'Bar1', email: 'bar@bar.fake' }),
        ];
        await User.upsertManyBy('email', update);
        let foo1 = await User.fetch({ email: 'foo@foo.fake'});
        deepEq_(foo1.name, 'Foo1');
        notEq_(foo1._id, null);
    },
    async 'update multiple' () {
        let users = await User.fetchMany();
        eq_(users.length, 2);
        users[0].name = 'Foo2';
        users[1].name = 'Bar2';

        await User.upsertMany(users);

        users = await User.fetchMany();
        eq_(users.length, 2);
        eq_(users[0].name, 'Foo2');
        eq_(users[1].name, 'Bar2');


        let update = [
            new User({ name: 'Foo3', email: 'foo@foo.fake' }),
            new User({ name: 'Bar3', email: 'bar@bar.fake' }),
            new User({ name: 'Qux3', email: 'qux@qux.fake' }),
        ];
        await User.upsertManyBy('email', update);
        let foo1 = await User.fetch({ email: 'foo@foo.fake'});
        deepEq_(foo1.name, 'Foo3');
        notEq_(foo1._id, null);

        let qux1 = await User.fetch({ email: 'qux@qux.fake'});
        deepEq_(qux1.name, 'Qux3');
        notEq_(qux1._id, null);


        let qux2 = await User.upsertBy('email', new User({ email: 'qux@qux.fake', name: 'Qux4' }));

        let qux4 = await User.fetch({ email: 'qux@qux.fake'});
        deepEq_(qux4.name, 'Qux4');
        eq_(String(qux1._id), String(qux4._id));


        await User.upsertBy('email', new User({ email: 'dux@dux.fake', name: 'Dux1' }));

    }
})
