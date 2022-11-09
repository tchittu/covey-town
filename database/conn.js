const { MongoClient } = require("mongodb");
const db =
  "mongodb+srv://covey_town_user:cs4530@cluster0.bpcqjvf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
      console.log("Connected correctly to server");

      _db = client.db("CoveyTown");
    } catch (err) {
      console.log(err.stack);
    } finally {
      //   await client.close();
    }

    // client.connect(function (err, db) {
    //   // Verify we got a good "db" object
    //   if (db)
    //   {
    //     _db = db.db("CoveyTown");
    //     console.log("Successfully connected to MongoDB.");
    //   }
    //   return callback(err);
    //      });
  },

  getDb: function () {
    return _db;
  },
};
