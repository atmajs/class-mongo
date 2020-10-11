import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoIndexes, MongoSettings } from '../src/export';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json } from 'class-json';
import { ProjectionUtil } from '../src/utils/projection';

@table('users')
class User extends MongoEntity<User> {

    @index({ unique: true })
    email: string

    @Json.type(String)
    name: string
}

UTest({
    // async $before() {
    //     MongoSettings.define({ db: 'test-class' });

    //     const db = await MongoEntity.getDb();
    //     await db.dropDatabase();
    // },
    // async $after() {

    //     let db = await MongoEntity.getDb();
    //     await db.dropDatabase();

    //     MongoProfiler.toggle(false);
    // },
    async 'projection'() {

        let res = ProjectionUtil.flattern({
            foo: 1,
            customer: {
                name: 1,
                email: 1
            }
        });

        deepEq_(res, {
            'foo': 1,
            'customer.name': 1,
            'customer.email': 1,
        })
    },
})
