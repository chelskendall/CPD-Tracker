const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const uploadFile = require('../middleware/uploadFile');
const affiliationController = require('../controllers/profAffiliations');


// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newaffiliation', userAuth, uploadFile, affiliationController.newAffiliation); //new affiliation
router.get('/user/:email/allaffiliation', userAuth, affiliationController.getAllAffiliation); //display all affiliation
router.get('/user/:email/affiliation/:id', userAuth, affiliationController.getAffiliation); //display one affiliation
router.get('/user/:email/affiliationfiles', userAuth, affiliationController.getAffiliationFiles); //display all files
router.delete('/user/:email/deleteaffiliation/:id', userAuth, affiliationController.deleteOneAffiliation); //delete one affiliation
router.delete('/user/:email/deleteaffiliationf/:files', userAuth, affiliationController.deleteAffiliationFile); //delete one file
router.put('/user/:email/updateaffiliation/:id', userAuth, affiliationController.updateOneAffiliation); //update an affiliation


//Export the route to use in our index.js
module.exports = router;