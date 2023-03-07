import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoIndexes, MongoSettings } from '../src/export';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json, Serializable } from 'class-json';

@table('test-aggr-users')
class User extends MongoEntity<User> {

    @index({ unique: true })
    email: string

    @Json.array(String)
    tags: string[]
}

UTest({
    $config: {
        timeout: 30_000
    },
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

    async '$addFields with $size' () {
        let users = [
            new User({ tags: ['Foo', 'Bar', 'Qux'], email: 'foo@foo.fake' }),
            new User({ tags: ['Foo', 'Bar'], email: 'bar@bar.fake' }),
        ];

        let result = await User.upsertManyBy('email', users);
        eq_(result.length, 2);
        notEq_(result[0]._id, null);

       let arr = await User.aggregateMany([
            {
                $addFields: {
                    tags_count: { $size: "$tags" }
                }
            }
       ]);
       eq_(arr.length, 2);
       eq_(arr[0].tags_count, 3);
       eq_(arr[1].tags_count, 2);
    },


    async '$match' () {
        let docs = [
            { "author" : "dave", "score" : 80, "views" : 100 },
            { "author" : "dave", "score" : 85, "views" : 521 },
            { "author" : "ahn", "score" : 60, "views" : 1000 },
            { "author" : "li", "score" : 55, "views" : 5000 },
            { "author" : "annT", "score" : 60, "views" : 50 },
            { "author" : "li", "score" : 94, "views" : 999 },
            { "author" : "ty", "score" : 95, "views" : 1000 },
        ];

        @table(`match_${Date.now()}`)
        class Doc extends MongoEntity<Doc> {

        }

        let arr = docs.map(x => new Doc(<any> x));
        let result = await Doc.upsertMany(arr);
        eq_(result.length, 7);
        notEq_(result[0]._id, null);

        let out = await Doc.aggregateMany<{_id: any, count: number}>( [
            { $match: { $or: [ { score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } } ] } },
            { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        deepEq_(out, [{ "_id" : null, "count" : 5 }]);

        let paged = await Doc.aggregateManyPaged([
            { $match: { score: { $gte: 60 } }},
            { $sort: { score: 1 }},
            { $skip: 3},
            { $limit: 2 }
        ]);
        eq_(paged.total, docs.filter(x => x.score >= 60).length);
        eq_(paged.collection.length, 2);
        has_(paged.collection[0], { views: 521, score: 85 });
    }
})
