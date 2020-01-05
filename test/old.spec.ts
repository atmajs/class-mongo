import { MongoEntity } from '../src/MongoEntity';
import { table, index } from '../src/decos';
import { MongoIndexes, MongoSettings } from '../src/export';
import { MongoProfiler } from '../src/MongoProfiler';
import { Json } from 'class-json';

// Copied from classjs

@table('users')
class User extends MongoEntity {
    @Json.value('')
    username: string

    @Json.value(0)
    timestamp: number
}

const timestamp = Date.now();


UTest({
    $before() {
        MongoSettings.define({ db: 'test-class' });
    },
    async $after() {

        let db = await User.getDb();
        await db.dropDatabase();

        MongoProfiler.toggle(false);
    },
    'simple class deserialization'() {
        eq_(new User({ username: 'x' }).username, 'x');
    },
    async 'ensure-no-foo'() {

        let users = await User.fetchMany({ username: 'foo' });

        if (users.length === 0) {
            return;
        }

        await User.delMany(users);
        users = await User.fetchMany({ username: 'foo ' });
        eq_(users.length, 0, 'Not removed');
    },
    async 'write'() {
        let user = new User({
            username: 'foo',
            timestamp: timestamp
        });

        await user.upsert()
        is_(user._id, 'Object');
    },

    async 'read'(done) {

        let x = await User.fetch({ username: 'foo' })

        eq_(x.timestamp, timestamp);

        x = await User.fetch({ $query: { username: 'foo' } });

        eq_(x.timestamp, timestamp);

        x = await User.fetch({ timestamp: timestamp });
        eq_(x.username, 'foo');
    },
    async 'find-gt'() {
        let x = await User.fetch({ timestamp: `>${timestamp - 20}` });  
        is_(x._id, 'Object');
        eq_(x.username, 'foo');
    },
    async 'find-gte'() {
        let x = await User.fetch({ timestamp: `>=${timestamp}` });

        is_(x._id, 'Object');
        eq_(x.username, 'foo');

    },
    async 'find-none-gt'() {
        let user = await User.fetch({ timestamp: '>' + (timestamp + 20) })
        eq_(user, null);
    },
    async 'count'() {
        let count = await User.count();
        eq_(count, 1);
    },
    async 'remove'() {
        let x = await User.fetch({ username: 'foo' });
        await x.del();

        x = await User.fetch({ username: 'foo' });
        eq_(x, null);
    },

    async 'write-collection' () {
        var count = 300,
            users = [];

        while (--count > -1) {
            users.push(new User({
                username: 'foo',
                timestamp: count
            }));
        }
        await User.upsertMany(users);

        users = await User.fetchMany({ timestamp: '>=150' });
        eq_(users.length, 150);
        is_(users[0]._id, 'Object');
    },

    async 'indexes' (done) {

        @table('user-index')
        class User extends MongoEntity {

            username = ''

            @index()
            timestamp = 0
        }
        
        await MongoIndexes.ensureAll();

        

        let coll = await User.getCollection();
    

        let info = await coll.indexInformation();
        has_(info, 
            {
                _id_: [
                  [
                    '_id',
                    1
                  ]
                ],
                timestamp_1: [
                  [
                    'timestamp',
                    1
                  ]
                ]
              }
        );
    },

    async 'direct collection patching' () {
        let user = new User({ timestamp: 5 });
        await user.upsert();
            
        let coll = await User.getCollection();

        let x = await coll.updateOne({
            _id: user._id
        }, {
            $inc: {
                timestamp: 3
            }
        });
        eq_(x.result.ok, 1);
    },

    'profiler' (done) {

        MongoProfiler.toggle(true, {
                onDetect: assert.await(function (info) {
                    
                    has_(info, {
                        params: {
                            reason: 'unindexed'
                        },
                        coll: 'users',
                        plan: {
                            
                        }
                    });

                    done()
                })
            });


        User.fetch({ username: 'baz' });
    }
})