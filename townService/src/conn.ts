import { MongoClient } from 'mongodb';

const DB =
  'mongodb+srv://covey_town_user:cs4530@cluster0.bpcqjvf.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(DB);

let db: any;

// Here we have an unused variable _callback, which causes a no-unused-vars warning.
// This is necessary because this is required for the connectToServer function.
const connectToServer = async (_callback: any) => {
  try {
    await client.connect();
    console.log('Connected correctly to server');

    db = client.db('CoveyTown');
  } catch (err: any) {
    console.log(err.stack);
  }
};

const getDb = () => db;

export { connectToServer, getDb };
