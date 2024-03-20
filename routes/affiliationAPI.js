const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
let multer = require('multer'), mongoose = require('mongoose');

const userAuth = require('../middleware/userAuth');
const affiliationController = require('../controllers/profAffiliations');

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
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
    || file.mimetype === "application/pdf" || file.mimetype === "application/msword") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf .docx .png .jpg .jpeg format allowed!'));
    }
  }
});

// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newaffiliation', userAuth, upload.array('files', 6), affiliationController.newAffiliation); //new affiliation
router.get('/user/:email/allaffiliation', userAuth, affiliationController.getAllAffiliation); //display all affiliation
router.get('/user/:email/affiliation/:id', userAuth, affiliationController.getAffiliation); //display one affiliation
router.get('/user/:email/affiliationfiles', userAuth, affiliationController.getAffiliationFiles); //display all files
router.delete('/user/:email/deleteaffiliation/:id', userAuth, affiliationController.deleteOneAffiliation); //delete one affiliation
router.delete('/user/:email/deleteaffiliationf/:files', userAuth, affiliationController.deleteAffiliationFile); //delete one file
router.put('/user/:email/updateaffiliation/:id', userAuth, affiliationController.updateOneAffiliation); //update an affiliation


//Export the route to use in our index.js
module.exports = router;