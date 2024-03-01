const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const uploadFile = require('../middleware/uploadFile');
const serviceController = require('../controllers/profServices');


// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newservice', userAuth, uploadFile, serviceController.newService); //new service
router.get('/user/:email/allservice', userAuth, serviceController.getAllService); //display all service
router.get('/user/:email/service/:id', userAuth, serviceController.getService); //display one service
router.get('/user/:email/servicefiles', userAuth, serviceController.getServiceFiles); //display all files
router.delete('/user/:email/deleteservice/:id', userAuth, serviceController.deleteOneService); //delete one service
router.delete('/user/:email/deleteservicef/:files', userAuth, serviceController.deleteServiceFile); //delete one file
router.put('/user/:email/updateservice/:id', userAuth, serviceController.updateOneService); //update an service


//Export the route to use in our index.js
module.exports = router;