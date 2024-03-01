const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const uploadFile = require('../middleware/uploadFile');
const cpdController = require('../controllers/cpdTraining');


// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newcpd', userAuth, uploadFile, cpdController.newCPD); //new cpd training
router.get('/user/:email/allcpd', userAuth, cpdController.getAllCPD); //display all cpd training
router.get('/user/:email/cpd/:id', userAuth, cpdController.getCPD); //display one cpd
router.get('/user/:email/cpdfiles', userAuth, cpdController.getCPDFiles); //display all files
router.delete('/user/:email/deletecpd/:id', userAuth, cpdController.deleteOneCPD); //delete one cpd training
router.delete('/user/:email/deletecpdf/:files', userAuth, cpdController.deleteCPDFile); //delete one file
router.put('/user/:email/updatecpd/:id', userAuth, cpdController.updateOneCPD); //update an cpd training


//Export the route to use in our index.js
module.exports = router;