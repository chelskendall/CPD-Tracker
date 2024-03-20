const express = require('express'); //import express
const router = express.Router(); //Create an express router object to set up our routes
let multer = require('multer'), mongoose = require('mongoose');

const userAuth = require('../middleware/userAuth');
const serviceController = require('../controllers/profServices');

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
router.post('/user/:email/newservice', userAuth, upload.array('files', 6), serviceController.newService); //new service
router.get('/user/:email/allservice', userAuth, serviceController.getAllService); //display all service
router.get('/user/:email/service/:id', userAuth, serviceController.getService); //display one service
router.get('/user/:email/servicefiles', userAuth, serviceController.getServiceFiles); //display all files
router.delete('/user/:email/deleteservice/:id', userAuth, serviceController.deleteOneService); //delete one service
router.delete('/user/:email/deleteservicef/:files', userAuth, serviceController.deleteServiceFile); //delete one file
router.put('/user/:email/updateservice/:id', userAuth, serviceController.updateOneService); //update an service


//Export the route to use in our index.js
module.exports = router;