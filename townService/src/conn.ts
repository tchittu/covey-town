import { MongoClient } from 'mongodb';

const DB =
  'mongodb+srv://covey_town_user:cs4530@cluster0.bpcqjvf.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(DB);

let db: any;

const connectToServer = async function (_callback: any) {
  try {
    await client.connect();
    console.log('Connected correctly to server');

    db = client.db('CoveyTown');
  } catch (err: any) {
    console.log(err.stack);
  }
};

const getDb = function () {
  return db;
};

export { connectToServer, getDb };
