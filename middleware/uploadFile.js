// Multer Mime Type Validation : https://www.positronx.io/angular-express-file-upload-with-reactive-forms-tutorial/

/*let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose');

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

// Multer Mime Type Validation
//const uploadFile = (req, res, next) => multer({
var uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" 
    || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf .png, .jpg and .jpeg format allowed!'));
    }
  }
});*/


const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../CPD-Tracker/uploads'); //Uploads will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)  //Unique filename to avoid overwriting
  }
});

//Create multer upload instance
const upload = multer({ storage: storage }); 

//Custom file upload middleware
const uploadFile = (req, res, next) => {
  // Use multer upload instance
  upload.array('files', 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    //Retrieve uploaded files
    const files = req.files;
    const errors = [];

    //Validate file types and sizes
    files.forEach((file) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });
    if (errors.length > 0) {  //Handle validation errors
      files.forEach((file) => {  //Remove uploaded files
        fs.unlinkSync(file.path);
      });

      return res.status(400).json({ errors });
    }
    req.files = files; //Attach files to the request object
    next();  //Proceed to the next middleware or route handler
  });
};

module.exports = uploadFile;




