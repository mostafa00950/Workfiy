const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    duration: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    },
    location: {
        type: String
    },
    skillsRequired: {
        type: String
    },

});

module.exports = mongoose.model("Internship", internshipSchema);