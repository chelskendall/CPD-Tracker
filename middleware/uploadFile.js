const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../CPD-Tracker/uploads'); //Uploads will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); //Unique filename to avoid overwriting
  }
});

const upload = multer({ storage: storage }); //Create multer upload instance

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