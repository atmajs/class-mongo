import { table, index } from '../src/decos';
import { Serializable } from 'class-json';
import { MongoSettings, MongoIndexes } from '../src/export';
import { MongoEntity, MongoEntityFor } from '../src/MongoEntity';
import { db_getCollection } from '../src/mongo/Driver';


UTest({
    $before (done) {
        MongoSettings.define({
            name: 'testDb',
            db: 'class-store-mongo-test'
        });
        db_getCollection({ collection: 'foos', server: 'testDb' }, (error, coll) => {
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

        @table('foos', { server: 'testDb' })
        class FooDb extends MongoEntityFor(Foo) {

        }


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

        @table('foos', { server: 'testDb' })
        class FooDb extends MongoEntityFor(Foo) {

            @index('letter', { unique: true })
            letter: string
        }

        await MongoIndexes.ensureAll()

        let coll = await FooDb.getCollection();
        let indexes = await coll.indexInformation();

        notEq_(indexes.letter, null);
    },


    async 'should throw as db not found by name' () {
        @table('foos', { server: 'fake' })
        class FooDb extends MongoEntity<FooDb> {
            _id: string
            letter: string
        }

        let error: Error;
        try {
            let fooSaved = new FooDb({ letter: 'a' });
            await fooSaved.upsert();
        } catch (err) {
            error = err;
        }
        has_(error?.message, 'fake');
    }
})
