const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Professional Affiliations Schema
const ProfAffiliationsSchema = new Schema({
    user: {
        type: String,
        required: [true],
        ref: "User"
    },
    typeAffiliation: {
        type: String, //dropdown selection
        required: [true]
    },
    organization: {
        type: String,
        required: [true]
    },
    affiliateTitle: {
        type: String,
        required: [true]
    },
    affiliateStart: {
        type: Date,
        required: [true]
    },
    affiliateEnd: {
        type: Date,
        required: [true]
    },
    files: {
        type: Array
    },
    idAffiliate: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const ProfAffiliations = mongoose.model('professionalAffiliations', ProfAffiliationsSchema); 
module.exports = ProfAffiliations;