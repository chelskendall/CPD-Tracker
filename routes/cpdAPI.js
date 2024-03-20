const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
let multer = require('multer'), mongoose = require('mongoose');

const userAuth = require('../middleware/userAuth');
const cpdController = require('../controllers/cpdTraining');
 
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
router.post('/user/:email/newcpd', userAuth, upload.array('files', 6), cpdController.newCPD); //new cpd training
router.get('/user/:email/allcpd', userAuth, cpdController.getAllCPD); //display all cpd training
router.get('/user/:email/cpd/:id', userAuth, cpdController.getCPD); //display one cpd
router.get('/user/:email/cpdfiles', userAuth, cpdController.getCPDFiles); //display all files
router.delete('/user/:email/deletecpd/:id', userAuth, cpdController.deleteOneCPD); //delete one cpd training
router.delete('/user/:email/deletecpdf/:files', userAuth, cpdController.deleteCPDFile); //delete one file
router.put('/user/:email/updatecpd/:id', userAuth, cpdController.updateOneCPD); //update an cpd training


//Export the route to use in our index.js
module.exports = router;