const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { username, password, role, accessLevel } = req.body;

  try {
    const user = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      accessLevel,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User successfully registered", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("send error");
  }
};
