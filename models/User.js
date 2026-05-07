const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  email: String,
  gender: String,
  password: String,
  specialist: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;

