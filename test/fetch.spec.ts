import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoIndexes, MongoSettings } from '../src/export';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json, Serializable } from 'class-json';

@table('test-aggr-users')
class User extends MongoEntity<User> {

    @index({ unique: true })
    email: string

    foo: {
        bar: string
        qux: string
    }
}

UTest({

    async $before() {
        MongoSettings.define({ db: 'test-class' });

        const db = await MongoEntity.getDb();
        await db.dropDatabase();
    },

    async 'fetchPartial'() {
        let users = [
            new User({ foo: { bar: 'b1', qux: 'q1' }, email: 'foo@foo.fake' }),
            new User({ foo: { bar: 'b2', qux: 'q2' }, email: 'bar@bar.fake' }),
        ];

        let result = await User.upsertManyBy('email', users);
        eq_(result.length, 2);
        notEq_(result[0]._id, null);

        let user = await User.fetchPartial({
            email: 'bar@bar.fake'
        }, {
            projection: {
                foo: {
                    bar: 1
                }
            }
        });

        eq_(user.foo.bar, 'b2');

        //user.foo.qux //<TS Error
    },

})
