const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
  },

  shift: {
    type: String,
  },

  location: {
    type: String,
  },
});
module.exports = mongoose.model("Job", jobSchema);
