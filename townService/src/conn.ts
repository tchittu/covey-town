import { MongoClient, MongoClientOptions } from "mongodb";
const db =
  "mongodb+srv://covey_town_user:cs4530@cluster0.bpcqjvf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(db);

var _db: any;

const connectToServer = async function (_callback: any) {
  try {
    await client.connect();
    console.log("Connected correctly to server");

    _db = client.db("CoveyTown");
  } catch (err: any) {
    console.log(err.stack);
  }
}

const getDb = function () {
  return _db;
}

export {
  connectToServer,
  getDb
};
