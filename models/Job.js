const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: Number,
  title: String,
  description: String,
  type: String,
  salary: Number,
});

const Job = mongoose.model("job", jobSchema);

module.exports = Job;