const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["maker", "approver"], required: true },
  accessLevel: { type: Number, required: true }, // 1 for maker, 2 for approver
});

module.exports = mongoose.model("User", userSchema);
