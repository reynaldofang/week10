// userController.js

const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: "Username, password, and role are required." });
  }

  if (username.trim() === "") {
    return res.status(400).json({ error: "Username cannot be blank." });
  }

  if (
    password.length < 8 ||
    !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  ) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain both letters and numbers.",
    });
  }

  if (role !== "maker" && role !== "approver") {
    return res
      .status(400)
      .json({ error: "Invalid role. Valid roles are 'maker' and 'approver'." });
  }

  try {
    const mongoClient = await new MongoClient(
      "mongodb://127.0.0.1:27017"
    ).connect();
    const db = mongoClient.db("revou_week10");

    // Check if username already exists
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db
      .collection("users")
      .insertOne({ username, password: hashedPassword, role });
    res.json({
      message: "User created successfully.",
      userId: result.insertedId,
    });

    mongoClient.close();
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user." });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const mongoClient = await new MongoClient(
      "mongodb://127.0.0.1:27017"
    ).connect();
    const db = mongoClient.db("revou_week10");

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    mongoClient.close();

    res.json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
