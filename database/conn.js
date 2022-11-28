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
    }
  },

  getDb: function () {
    return _db;
  },
};
