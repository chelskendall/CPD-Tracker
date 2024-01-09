const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
//const authUser = require('./userAuth');
const userController = require('../controllers/user');


router.post('/register', userController.register); //Add a user to the database
//router.post('/login', userController.login); // Login 


module.exports = router;

// Display list of users from database
//router.get('/users/:username',users.allUsers );

// Update a password for a user
//router.put('/users',users.updatePassword);
//router.get('/users',users.updatePasswordSQ);

//Delete a user and all info from database by username
//router.delete('/users/:username',users.deleteUser);

//Get all of a users's info from all mappings
//router.get('/usersinfo/:username',users.allOfAUser); 