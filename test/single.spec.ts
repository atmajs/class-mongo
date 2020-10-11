import { table, index } from '../src/decos';
import { Serializable } from 'class-json';
import { MongoEntity, MongoSettings, MongoIndexes } from '../src/export';
import { MongoEntityFor } from '../src/MongoEntity';
import { mixin } from 'atma-utils';
import { db_remove, db_getDb, db_getCollection } from '../src/mongo/Driver';


UTest({
    $before (done) {
        MongoSettings.define({ db: 'class-store-mongo-test' });
        db_getCollection('foos', (error, coll) => {
            coll?.drop(done as any);
        });
    },
    async 'should create and resolve instance' () {


        class Foo extends Serializable<Foo> {
            _id: string
            letter: string
            customer: {
                name: string
                email: string
            }
        }

        @table('foos')
        class FooDb extends MongoEntityFor(Foo) {

        }

        let x = await FooDb.fetchPartial({

        }, {
            projection: {
                letter: 1,
                customer: {
                    name: 1
                }
            }
        });

        x.letter;
        x.customer.


        let fooSaved = new FooDb({ letter: 'a' });
        await fooSaved.upsert();


        let id = String(fooSaved._id);
        gt_(id.length, 10);

        let fooFetched = await FooDb.fetch({ letter: 'a' });
        eq_(String(fooFetched._id), String(fooSaved._id));

        '> change letter'
        fooSaved.letter = 'b';
        await fooSaved.upsert();

        '> check no letter a is returned'
        let noneFetched = await FooDb.fetch({ letter: 'a' });
        eq_(noneFetched, null);


        '> save next letter'
        let nextSaved = new FooDb({ letter: 'c' });
        await nextSaved.upsert();

        '> fetch all'
        let all = await FooDb.fetchMany();
        eq_(all.length, 2);
        deepEq_(all.map(x => x.letter), ['b', 'c']);


        '> delete first'
        await fooSaved.del();

        '>> check is single'
        let allAfterDelete = await FooDb.fetchMany();
        eq_(allAfterDelete.length, 1);
    },
    async 'should create indexes' () {
        class Foo {
            _id: string
            letter: string
        }

        @table('foos')
        class FooDb extends MongoEntityFor(Foo) {

            @index('letter', { unique: true })
            letter: string
        }

        await MongoIndexes.ensureAll()

        let coll = await FooDb.getCollection();
        let indexes = await coll.indexInformation();

        notEq_(indexes.letter, null);
    }
})
