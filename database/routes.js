const express = require("express");

// profileRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const profileRoutes = express.Router();

// This will help us connect to the database
const dbo = require("./conn");

// This section will help you get a list of all the profiles.
profileRoutes.route("/profiles").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("profiles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single profile by username
profileRoutes.route("/profiles/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _username: req.params.username };
  db_connect.collection("profiles").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new profile.
profileRoutes.route("/profiles/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
    avatar: req.body.avatar,
    aboutMe: req.body.aboutMe,
    friendsList: req.body.friendsList,
  };
  db_connect.collection("profiles").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Create a profile if it doesn't already exist
profileRoutes.route("/profiles/retrieveOrAdd").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    username: req.body.username,
    password: req.body.password,
    avatar: req.body.avatar,
    aboutMe: req.body.aboutMe,
    friendsList: req.body.friendsList,
  };

  db_connect
    .collection("profiles")
    .findOneAndUpdate(
      { username: req.body.username, password: req.body.password },
      { $setOnInsert: myobj },
      { upsert: true },
      function (err, res) {
        if (err) throw err;
        console.log("Profile retrieved");
        response.json(res);
      }
    );
});

// This section will help you update a profile by username.
profileRoutes.route("/update/:username").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _username: req.params.username };
  let newvalues = {
    $set: {
      username: req.body.username,
      password: req.body.password,
      avatar: req.body.avatar,
      aboutMe: req.body.aboutMe,
      friendsList: req.body.friendsList,
    },
  };
  db_connect
    .collection("profiles")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a profile
profileRoutes.route("/:username").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _username: req.params.username };
  db_connect.collection("profiles").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = profileRoutes;
