const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Endorsements Schema
const EndorsementsSchema = new Schema({
    user: {
        type: String,
        required: [true],
        ref: "userEmail"
    },
    refereeName: {
        type: String,
        required: [true]
    },
    refereePlace: {
        type: String,
        required: [true]
    },
    refereePhone: {
        type: Number,
        required: [true]
    },
    refereeDate: {
        type: Date,
        required: [true]
    },

    //file input field

    idEndorse: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const Endorsements = mongoose.model('endorsements', EndorsementsSchema); 
module.exports = Endorsements;