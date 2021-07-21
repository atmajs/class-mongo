import { MongoSettings } from '../src/mongo/Settings';
import { MongoEntity } from '../src/MongoEntity';
import { table, index, dbType } from '../src/decos';
import { Json } from 'class-json';
import { MongoBson } from '../src/MongoBson';
import { Decimal128 } from 'mongodb';



UTest({
    async $before() {
        MongoSettings.define({ db: 'test-class' });

        const db = await MongoEntity.getDb();
        await db.dropDatabase();
    },
    async $after() {

        let db = await MongoEntity.getDb();
        await db.dropDatabase();
    },

    async 'bigint' () {
        @table('user-bson')
        class User extends MongoEntity {

            _id

            key: string

            @Json.type(BigInt)
            amount: bigint
        }

        return UTest({
            'serialize to Decimal128 when > as Number SAFE INTERGER' () {
                let user = new User({ key: 'foo', amount: 2n** 100n });
                let bson = MongoBson.fromObject(user);
                eq_(bson.amount instanceof Decimal128, true);
                let userBack = MongoBson.toObject (bson, User);
                eq_(userBack instanceof User, true);
                eq_(typeof userBack.amount, 'bigint');
            },
            'serialize to Number when < as Number SAFE INTERGER' () {
                let user = new User({ key: 'foo', amount: 2n });
                let bson = MongoBson.fromObject(user);
                eq_(typeof bson.amount, 'number');

                let userBack = MongoBson.toObject (bson, User);
                eq_(userBack instanceof User, true);
                eq_(typeof userBack.amount, 'bigint');
            },
            'serialize to String when > as Decimal128 SAFE INTERGER' () {
                let x = 2n ** 200n;
                let user = new User({ key: 'foo', amount: x });
                let bson = MongoBson.fromObject(user);
                eq_(typeof bson.amount, 'string');
                eq_(bson.amount, x.toString());

                let userBack = MongoBson.toObject (bson, User);
                eq_(userBack instanceof User, true);
                eq_(typeof userBack.amount, 'bigint');
                eq_(userBack.amount, x);
            },
            // 'serialize simple object' () {
            //     let bson = MongoBson.fromObject({ foo: 2n ** 50n});
            //     eq_(bson.foo instanceof Decimal128, true);
            // }
        });



    },

})
