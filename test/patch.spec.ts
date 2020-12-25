import { MongoSettings } from '../src/mongo/Settings';
import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json } from 'class-json';


@table('patch-test')
class User extends MongoEntity<User> {

    @index({ unique: true })
    email: string

    @Json.type(String)
    name: string

    some: number
}

console.log('FOO', User);

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

    async 'patch many' () {
        let users = [
            new User({ name: 'Foo', email: 'foo@foo.fake' }),
            new User({ name: 'Bar', email: 'bar@bar.fake' }),
        ];

        let result = await User.upsertMany(users);
        eq_(result.length, 2);

        let [foo, bar ] = result;
        notEq_(foo._id, null);
        eq_(foo.email, users[0].email);

        await User.patch(foo, { email: 'foo1@foo.fake' });
        let got = await User.fetch({ _id: foo._id });
        eq_(got.email, 'foo1@foo.fake');

        let res = await User.patchBy({ email: 'foo1@foo.fake' }, { some: 1 });
        //console.log(res);

        let got2 = await User.fetch({ _id: foo._id });
        eq_(got2.email, 'foo1@foo.fake');
        eq_(got2.some, 1);

        '> bar unchaged'
        let bar2 = await User.fetch({ _id: bar._id });
        eq_(bar2.email, bar.email);

        '> patch many'
        await User.patchMany([
            [ {_id: foo._id}, { name: 'FooMany' } ],
            [ {_id: bar._id}, { name: 'BarMany' } ],
        ]);

        let _foo3 = await User.fetch({ _id: foo._id });
        let _bar3 = await User.fetch({ _id: bar._id });
        eq_(_foo3.name, 'FooMany');
        eq_(_bar3.name, 'BarMany');
    },

    async 'patch multiple' () {
        let users = [
            new User({ name: 'Foo', email: 'foo@multiple.fake' }),
            new User({ name: 'Bar', email: 'foo@multiple.fake' }),
            new User({ name: 'Qux', email: 'foo@multiple1.fake' }),
        ];

        let result = await User.upsertMany(users);
        eq_(result.length, 3);

        let [foo, bar ] = result;
        notEq_(foo._id, null);
        eq_(foo.email, users[0].email);

        await User.patchMultipleBy({ email: 'foo@multiple.fake' }, { name: 'Dux' });

        let usersDb = await User.fetchMany({ email: 'foo@multiple.fake'});
        eq_(usersDb[0].name, 'Dux');
        eq_(usersDb[1].name, 'Dux');

        let userDb = await User.fetch({ email: 'foo@multiple1.fake'});
        eq_(userDb.name, 'Qux');
    }
})
