import { MongoEntity } from '../src/MongoEntity';
import { table } from '../src/decos';
import { MongoSettings } from '../src/export';
import { CollectionHandler } from '../src/mongo/CollectionHandler';


@table('weather', {
   collection: {
      timeseries: {
         timeField: "timestamp"
      }
   }
})
class Weather extends MongoEntity<Weather> {
    metadata: { sensorId, type }
    timestamp: Date
    temp: number
}

UTest({
    async $before() {
        MongoSettings.define({ db: 'test-class' });

        const db = await MongoEntity.getDb();
        await db.dropDatabase();
        await CollectionHandler.ensureCollections();
    },
    async $after() {
        let db = await MongoEntity.getDb();
        await db.dropDatabase();
    },

    async '$addFields with $size' () {
        await Weather.upsertMany([{
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-18T00:00:00.000Z"),
            "temp": 12
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-18T04:00:00.000Z"),
            "temp": 5
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-18T08:00:00.000Z"),
            "temp": 11
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-18T12:00:00.000Z"),
            "temp": 12
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-18T16:00:00.000Z"),
            "temp": 16
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-18T20:00:00.000Z"),
            "temp": 15
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-19T00:00:00.000Z"),
            "temp": 13
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-19T04:00:00.000Z"),
            "temp": 12
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-19T08:00:00.000Z"),
            "temp": 11
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-19T12:00:00.000Z"),
            "temp": 12
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-19T16:00:00.000Z"),
            "temp": 17
         }, {
            "metadata": {"sensorId": 5578, "type": "temperature"},
            "timestamp": new Date("2021-05-19T20:00:00.000Z"),
            "temp": 12
         }].map(x => new Weather(x)));


        let weather = await Weather.fetch({
            "timestamp": new Date("2021-05-18T04:00:00.000Z")
        });
        eq_(weather.temp, 5);
    },


})
