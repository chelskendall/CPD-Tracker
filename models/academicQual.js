const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Academic Qualifications Schema
const AcademicQualSchema = new Schema({
    user: {
        type: String,
        required: [true],
        ref: "userEmail"
    },
    establishment: {
        type: String,
        required: [true]
    },
    courseTitle: {
        type: String,
        required: [true]
    },
    academicStart: {
        type: Date,
        required: [true]
    },
    academicEnd: {
        type: Date,
        required: [true]
    },
    idAcademic: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const AcademicQual = mongoose.model('academicQualifications', AcademicQualSchema); 
module.exports = AcademicQual;