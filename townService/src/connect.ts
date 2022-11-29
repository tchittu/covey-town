import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://covey_town_user:cs4530@cluster0.bpcqjvf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function createProfile(client: any, newProfile: any) {
  const result = await client
    .db("CoveyTown")
    .collection("profiles")
    .insertOne(newProfile);
  console.log(
    `New profile created with the following id: ${result.insertedId}`
  );
}

async function findOneProfileByUsername(client: any, username: any) {
  const result = await client
    .db("CoveyTown")
    .collection("profiles")
    .findOne({ username: username });

  if (result) {
    console.log(
      `Found a profile in the collection with the name '${username}':`
    );
    console.log(result);
    // if profile doesn't exist we should call createProfile
  } else {
    console.log(`No profiles found with the username '${username}'`);
  }
}

async function updateProfileByUsername(client: any, username: any, updatedProfile: any) {
  const result = await client
    .db("CoveyTown")
    .collection("profiles")
    .updateOne({ username: username }, { $set: updatedProfile });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function run() {
  try {
    await client.connect();

    // link to crud operations examples: https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/?_ga=2.259017740.706464881.1667653501-926212907.1666640891

    // can create a new profile for a new user
    await createProfile(client, {
      username: "test user",
      password: "test password",
      avatar: "avatar is a string for now",
      aboutMe: "about me",
      friendsList: ["friend1", "friend2"],
    });

    // can retrieve a person's profile when they log in again
    // we also need to check that the password is correct
    await findOneProfileByUsername(client, "test user");

    await updateProfileByUsername(client, "test user", {
      avatar: "avatar",
      friendsList: "no friends",
    });

    console.log("Connected correctly to server");
  } catch (err: any) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
