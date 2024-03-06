const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
let multer = require('multer'), mongoose = require('mongoose');

const userAuth = require('../middleware/userAuth');
const endorseController = require('../controllers/endorsements');
 
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

// Create routes with the controller function as the callback to handle the request.
router.post('/user/:email/newendorse', userAuth, upload.array('files', 6), endorseController.newEndorse); //new endorsement
router.get('/user/:email/allendorse', userAuth, endorseController.getAllEndorse); //display all endorsement
router.get('/user/:email/endorse/:id', userAuth, endorseController.getEndorse); //display one endorsement
router.get('/user/:email/endorsefiles', userAuth, endorseController.getEndorseFiles); //display all files
router.delete('/user/:email/deleteendorse/:id', userAuth, endorseController.deleteOneEndorse); //delete one endorsement
router.delete('/user/:email/deleteendorsef/:files', userAuth, endorseController.deleteEndorseFile); //delete one file
router.put('/user/:email/updateendorse/:id', userAuth, endorseController.updateOneEndorse); //update an endorsement


//Export the route to use in our index.js
module.exports = router;