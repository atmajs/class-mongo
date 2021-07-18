import { MongoSettings } from '../src/mongo/Settings';
import { MongoEntity } from '../src/MongoEntity';
import { table, index, dbType } from '../src/decos';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json } from 'class-json';
import { Decimal128 } from 'mongodb';
import { Types } from '../src/types/Types';


@table('patch-test')
class User extends MongoEntity<User> {

    @index({ unique: true })
    email: string

    @Json.type(String)
    name: string

    some: number

    address: {
        street: string
        nr: number
    }
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
    },

    async 'patch many' () {
        @table('user-types')
        class User extends MongoEntity {

            _id

            key: string

            @dbType('decimal', { Type: BigInt })
            amount: bigint
        }

        let key = `foo${Date.now()}`;
        let amount = 2n**112n;
        let user = new User({ key , amount });

        await user.upsert();

        let coll = await User.getCollection();
        let r = coll.aggregate(
            [
                { "$project": { "fieldType": {  "$type": "$amount"  } } }
            ]
        );
        let x = await r.next();
        eq_(x.fieldType, 'decimal');

        let loaded = await User.fetch({ key });
        eq_(typeof loaded.amount, 'bigint');
        eq_(loaded.amount, amount);

    },

})
