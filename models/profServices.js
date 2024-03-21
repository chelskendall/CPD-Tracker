const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Professional Services Schema
const ProfServicesSchema = new Schema({
    email: {
        type: String,
        required: [true],
        ref: "User"
    },
    typeServices: {
        type: String, //dropdown selection
        required: [true]
    },
    serviceTitle: {
        type: String,
        required: [true]
    },
    serviceDescribe: {
        type: String,
        required: [true]
    },
    serviceDate: {
        type: Date,
        required: [true]
    },
    serviceNotes: {
        type: String,
        required: [true]
    },
    files: {
        type: Array
    },
    idServices: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const ProfServices = mongoose.model('professionalServices', ProfServicesSchema); 
module.exports = ProfServices;