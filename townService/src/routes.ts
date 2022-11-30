// Explanation of lint warnings:
// We have no-explicit-any warnings in these database files because some of the functions used
// by axios and the router can accept parameters of any type, so we were unable to specify the
// type as something other than any.
// We also have no-console warnings because we are using console.log to notify us that we
// are connected to the server correctly.

import express, { Request, Response, Router } from 'express';

// This will help us connect to the database
import * as dbo from './conn';

// profileRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const profileRoutes: Router = express.Router();

// This section will help you get a list of all the profiles.
profileRoutes.route('/profiles').get((_req: Request, res: Response) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection('profiles')
    .find({})
    .toArray((err: Error, result: any) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single profile by username
profileRoutes.route('/profiles/:username').get((req: Request, res: Response) => {
  const dbConnect = dbo.getDb();
  const myquery = { username: req.params.username };
  dbConnect.collection('profiles').findOne(myquery, (err: Error, result: any) => {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new profile.
profileRoutes.route('/profiles/add').post((req: Request, response: Response) => {
  const dbConnect = dbo.getDb();
  const myobj = {
    username: req.body.username,
    password: req.body.password,
    avatar: req.body.avatar,
    aboutMe: req.body.aboutMe,
    friendsList: req.body.friendsList,
  };
  dbConnect.collection('profiles').insertOne(myobj, (err: Error, res: any) => {
    if (err) throw err;
    response.json(res);
  });
});

// Create a profile if it doesn't already exist
profileRoutes.route('/profiles/retrieveOrAdd').post(async (req: Request, response: Response) => {
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
    dbConnect.collection('profiles').insertOne(myobj, (err: Error, res: any) => {
      if (err) throw err;
      response.json(res);
    });
  }
});

// This section will help you update a profile by username.
profileRoutes.route('/profiles/update').post(async (req: Request, response: Response) => {
  const dbConnect = dbo.getDb();
  const myquery = { username: req.body.username };
  const newvalues = {
    $set: {
      avatar: req.body.avatar,
      aboutMe: req.body.aboutMe,
      friendsList: req.body.friendsList,
    },
  };
  dbConnect.collection('profiles').updateOne(myquery, newvalues, (err: Error, res: any) => {
    if (err) throw err;
    console.log(`${res.matchedCount} document(s) matched the query criteria.`);
    console.log(`${res.modifiedCount} document(s) was/were updated.`);
    response.json(res);
  });
});

// Update friends list
profileRoutes.route('/profiles/addFriend').post(async (req: Request, response: Response) => {
  const dbConnect = dbo.getDb();
  const myquery = { username: req.body.username };
  const newvalues = {
    $set: {
      friendsList: req.body.friendsList,
    },
  };
  dbConnect.collection('profiles').updateOne(myquery, newvalues, (err: Error, res: any) => {
    if (err) throw err;
    console.log(`${res.matchedCount} document(s) matched the query criteria.`);
    console.log(`${res.modifiedCount} document(s) was/were updated.`);
    response.json(res);
  });
});

// This section will help you delete a profile
profileRoutes.route('/:username').delete((req: Request, response: Response) => {
  const dbConnect = dbo.getDb();
  const myquery = { _username: req.params.username };
  dbConnect.collection('profiles').deleteOne(myquery, (err: Error, obj: any) => {
    if (err) throw err;
    console.log('1 document deleted');
    response.json(obj);
  });
});

export default profileRoutes;
