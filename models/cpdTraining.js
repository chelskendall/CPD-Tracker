const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create CPD Training Schema
const CPDTrainingSchema = new Schema({
    email: {
        type: String,
        required: [true],
        ref: "User"
    },
    typeCPD: {
        type: String, //dropdown selection
        required: [true]
    },
    cpdTitle: {
        type: String,
        required: [true]
    },
    cpdDescribe: {
        type: String,
        required: [true]
    },
    cpdStart: {
        type: Date,
        required: [true]
    },
    cpdEnd: {
        type: Date,
        required: [true]
    },
    cpdHours: {
        type: Number,
        required: [true]
    },
    cpdReflect: {
        type: String,
        required: [true]
    },
    files: {
        type: Array
    },
    idCPD: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const CPDTraining = mongoose.model('cpdTraining', CPDTrainingSchema); 
module.exports = CPDTraining;