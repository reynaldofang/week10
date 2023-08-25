const { MongoClient } = require("mongodb");

let db;

const databaseMiddleware = async (req, res, next) => {
  try {
    console.log("try connect");
    const mongoClient = await new MongoClient(
      "mongodb://mongo:1Jpj8GslQ6B2sFb6g0Bt@containers-us-west-155.railway.app:5984"
    ).connect();

    console.log("Connected to MongoDB");
    db = mongoClient.db("revou_week10");

    console.log(`Using database: ${db.databaseName}`);

    req.db = db;

    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).send("Failed to connect to MongoDB");
  }
};

module.exports = databaseMiddleware;
