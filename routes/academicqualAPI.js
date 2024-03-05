const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
let multer = require('multer'), mongoose = require('mongoose');

const userAuth = require('../middleware/userAuth');
const academicController = require('../controllers/academicQual');   //Import our academic qual controller from our controller file we created earlier

// Multer File upload settings
const DIR = '../CPD-Tracker/uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
 
// Create our routes with the controller function as the callback to handle the request.
router.post('/user/:email/newacademic', userAuth, upload.array('files', 6), academicController.newAcademic); //create new academic
router.get('/user/:email/allacademic', userAuth, academicController.getAllAcademic); //display all academics
router.get('/user/:email/academic/:id', userAuth, academicController.getAcademic); //display one academic
router.get('/user/:email/academicfiles', userAuth, academicController.getAcademicFiles); //display all files
router.delete('/user/:email/deleteacademic/:id', userAuth, academicController.deleteOneAcademic); //delete one academic
router.delete('/user/:email/deleteacademicf/:files', userAuth, academicController.deleteAcademicFile); //delete one file
router.put('/user/:email/updateacademic/:id', userAuth, academicController.updateOneAcademic); //update an academic

//Export the route to use in our index.js
module.exports = router;
