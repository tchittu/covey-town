import express from 'express';

// This will help us connect to the database
import * as dbo from './conn';

// profileRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const profileRoutes = express.Router();

// This section will help you get a list of all the profiles.
profileRoutes.route('/profiles').get((_req: any, res: any) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('profiles')
    .find({})
    .toArray((err: any, result: any) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single profile by username
profileRoutes.route('/profiles/:username').get((req: any, res: any) => {
  const dbConnect = dbo.getDb();
  const myquery = { username: req.params.username };
  dbConnect.collection('profiles').findOne(myquery, (err: any, result: any) => {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new profile.
profileRoutes.route('/profiles/add').post((req: any, response: any) => {
  const dbConnect = dbo.getDb();
  const myobj = {
    username: req.body.username,
    password: req.body.password,
    avatar: req.body.avatar,
    aboutMe: req.body.aboutMe,
    friendsList: req.body.friendsList,
  };
  dbConnect.collection('profiles').insertOne(myobj, (err: any, res: any) => {
    if (err) throw err;
    response.json(res);
  });
});

// Create a profile if it doesn't already exist
profileRoutes.route('/profiles/retrieveOrAdd').post(async (req: any, response: any) => {
  const dbConnect = dbo.getDb();

  const result = await dbConnect.collection('profiles').findOne({ username: req.body.username });

  if (result) {
    if (result.password === req.body.password) {
      console.log('Found profile');
      response.json(result);
    } else {
      console.log('Incorrect password');
      response.status(400).send('Incorrect password');
    }
  } else {
    const myobj = {
      username: req.body.username,
      password: req.body.password,
      avatar: req.body.avatar,
      aboutMe: req.body.aboutMe,
      friendsList: req.body.friendsList,
    };
    dbConnect.collection('profiles').insertOne(myobj, (err: any, res: any) => {
      if (err) throw err;
      response.json(res);
    });
  }
});

// This section will help you update a profile by username.
profileRoutes.route('/profiles/update').post(async (req: any, response: any) => {
  const dbConnect = dbo.getDb();
  const myquery = { username: req.body.username };
  const newvalues = {
    $set: {
      avatar: req.body.avatar,
      aboutMe: req.body.aboutMe,
    },
  };
  dbConnect.collection('profiles').updateOne(myquery, newvalues, (err: any, res: any) => {
    if (err) throw err;
    console.log(`${res.matchedCount} document(s) matched the query criteria.`);
    console.log(`${res.modifiedCount} document(s) was/were updated.`);
    response.json(res);
  });
});

// This section will help you delete a profile
profileRoutes.route('/:username').delete((req: any, response: any) => {
  const dbConnect = dbo.getDb();
  const myquery = { _username: req.params.username };
  dbConnect.collection('profiles').deleteOne(myquery, (err: any, obj: any) => {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});

export default { profileRoutes };
