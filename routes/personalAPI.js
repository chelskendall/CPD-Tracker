const express = require('express'); //import express
const router  = express.Router(); //express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const personalController = require('../controllers/personalDetails');  //Import our personal details controller

// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newpersonal', userAuth, personalController.newPersonal); //new personal
router.get('/user/:email/allpersonal', userAuth, personalController.getAllPersonal); //display all personal
router.get('/user/:email/personal/:id', userAuth, personalController.getPersonal); //display one personal
router.delete('/user/:email/deletepersonal/:id', userAuth, personalController.deleteOnePersonal); //delete one personal
router.put('/user/:email/updatepersonal/:id', userAuth, personalController.updateOnePersonal); //update an personal


//Export the route to use in our index.js
module.exports = router;
