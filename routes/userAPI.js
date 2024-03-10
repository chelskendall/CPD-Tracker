const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
const userController = require('../controllers/user');

//User Roles
router.post('/register', userController.register); //Add a user to the database
router.post('/login', userController.login); // Login 
router.put('/users',userController.updatePW); // Update a password for a user

//Admin Roles
router.get('/users/:email', userController.allUsers ); // Display list of users from database
router.get('/usersinfo/:email', userController.allOfAUser); //Get all of a users's info from all submissions
router.delete('/users/:email',userController.deleteUser); //Delete a user and all info from database by email


module.exports = router;

