const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const uploadFile = require('../middleware/uploadFile');
const endorseController = require('../controllers/endorsements');


// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newendorse', userAuth, uploadFile, endorseController.newEndorse); //new endorsement
router.get('/user/:email/allendorse', userAuth, endorseController.getAllEndorse); //display all endorsement
router.get('/user/:email/endorse/:id', userAuth, endorseController.getEndorse); //display one endorsement
router.get('/user/:email/endorsefiles', userAuth, endorseController.getEndorseFiles); //display all files
router.delete('/user/:email/deleteendorse/:id', userAuth, endorseController.deleteOneEndorse); //delete one endorsement
router.delete('/user/:email/deleteendorsef/:files', userAuth, endorseController.deleteEndorseFile); //delete one file
router.put('/user/:email/updateendorse/:id', userAuth, endorseController.updateOneEndorse); //update an endorsement


//Export the route to use in our index.js
module.exports = router;