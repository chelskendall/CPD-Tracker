const express = require('express'); //import express
const router  = express.Router(); //Create an express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const employController = require('../controllers/employHistory');   //Import our controller from our controller file we created earlier

 
//Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newemploy', userAuth, employController.newEmployment); //new employment
router.get('/user/:email/allemploy', userAuth, employController.getAllEmploy); //display all employment
router.get('/user/:email/employ/:id', userAuth, employController.getEmploy); //display one employment
router.delete('/user/:email/deleteemploy/:id', userAuth, employController.deleteOneEmploy); //delete one employment
router.put('/user/:email/updateemploy/:id', userAuth, employController.updateOneEmploy); //update an employment


// Export the route to use in our index.js
module.exports = router;