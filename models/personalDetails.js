const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Personal Details Schema
const PersonalDetailsSchema = new Schema({
    email: {
        type: String,
        required: [true],
        ref: "User"
    },
    firstName: {
        type: String,
        required: [true]
    },
    lastName: {
        type: String,
        required: [true]
    },
    phone: {
        type: Number,
        required: [true]
    },
    emailAddress: {
        type: String,
        required: [true]
    },
    mailAddress: {
        type: String,
        required: [true]
    },
    statement: {
        type: String,
        required: [true]
    },
    idPersonal: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const PersonalDetails = mongoose.model('personalDetails', PersonalDetailsSchema);
module.exports = PersonalDetails;