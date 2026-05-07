const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  scholarshipId: Number,
  title: String,
  description: String,
  details: String,
});

const Scholarship = mongoose.model("scholarship", scholarshipSchema);

module.exports = Scholarship;