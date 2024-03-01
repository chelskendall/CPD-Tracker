const express = require('express'); //import express
const router  = express.Router(); //Create an express router object to set up our routes

const userAuth = require('../middleware/userAuth');
const uploadFile = require('../middleware/uploadFile');
const academicController = require('../controllers/academicQual');   //Import our academic qual controller from our controller file we created earlier


// Create our routes with the controller function as the callback to handle the request.
router.post('/user/:email/newacademic', userAuth, uploadFile, academicController.newAcademic); //create new academic
router.get('/user/:email/allacademic', userAuth, academicController.getAllAcademic); //display all academics
router.get('/user/:email/academic/:id', userAuth, academicController.getAcademic); //display one academic
router.get('/user/:email/academicfiles', userAuth, academicController.getAcademicFiles); //display all files
router.delete('/user/:email/deleteacademic/:id', userAuth, academicController.deleteOneAcademic); //delete one academic
router.delete('/user/:email/deleteacademicf/:files', userAuth, academicController.deleteAcademicFile); //delete one file
router.put('/user/:email/updateacademic/:id', userAuth, academicController.updateOneAcademic); //update an academic

//Export the route to use in our index.js
module.exports = router;
