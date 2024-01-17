const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Employment History Schema
const EmployHistorySchema = new Schema({
    user: {
        type: String,
        required: [true],
        ref: "User"
    },
    jobTitle: {
        type: String,
        required: [true]
    },
    employer: {
        type: String,
        required: [true]
    },
    employStart: {
        type: Date,
        required: [true]
    },
    employEnd: {
        type: Date,
        required: [true]
    },
    responsibilities: {
        type: String,
        required: [true]
    },
    files: {
        type: String
    },
    idEmploy: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const EmployHistory = mongoose.model('employmentHistory', EmployHistorySchema); 
module.exports = EmployHistory;