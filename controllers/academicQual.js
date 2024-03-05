//import Academic model
const AcademicQual = require('../models/academicQual');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const baseUrl = "http://localhost:3000/academicfiles/";


//POST create Academic - old version
/*exports.newAcademic = (req, res, next) => {
  const url = 'http://localhost:3000/user/:email/newacademic'
  const academic = new AcademicQual({
    user: req.params.email,
      establishment: req.body.establishment,
      courseTitle: req.body.courseTitle,
      academicStart: req.body.academicStart,
      academicEnd: req.body.academicEnd,
      files: url + '/uploads/' + req.file.filename,
      idAcademic: uuid.v4()
  });
// Save Academic in the database
 academic.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Academic entered successfully!",
      academicCreated: {
        establishment: result.establishment,
        courseTitle: result.courseTitle,
        academicStart: result.academicStart,
        academicEnd: result.academicEnd,
        files: result.files
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })

}*/

//POST new Affiliation - https://www.positronx.io/angular-drag-and-drop-file-uploading-with-mongodb-multer/
exports.newAcademic = (req, res) => {  
  
  const reqFiles = []
  const url = 'http://localhost:3000/user/:email/newacademic'
  
  for (var i = 0; i < req.files.length; i++) {
  reqFiles.push(url + '/uploads/' + req.files[i].filename)}

  // Create an Affiliation
  const academic = new AcademicQual({
    user: req.params.email,
    establishment: req.body.establishment,
    courseTitle: req.body.courseTitle,
    academicStart: req.body.academicStart,
    academicEnd: req.body.academicEnd,
    files: reqFiles,
    idAffiliate: uuid.v4()
  });
  
  //Save Academic in the database
  academic
    .save()
    .then(result => {
      console.log(result);
    res.status(201).json({
      message: "Done upload!",
      academicCreated: {
        establishment: result.establishment,
        courseTitle: result.courseTitle,
        academicStart: result.academicStart,
        academicEnd: result.academicEnd,
        files: result.files
      }
    })
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering academics."
      });
    });
};

//GET all Files  
exports.getAcademicFiles = (req, res) => {
  const directoryPath = "../CPD-Tracker/uploads";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    else{
    let fileList = [];

    files.forEach((file) => {
      fileList.push({
        name: file,
        url: baseUrl + file,
      });
    });
    return res.status(200).send(fileList);
    };
  });
};

//GET all Academics  
exports.getAllAcademic = (req, res) => {no
    AcademicQual.find()
    .then((result) => { return res.send({data: result}); })
    .catch(err => {
      return res.status(404).json({
          message:
            err.message || "Some error occurred while retrieving qualifications."
        });
      });
  };

//GET Academic/id
exports.getAcademic = (req, res) => {
  const id = req.params.id;

  AcademicQual.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find academics with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving academics with id=" + id });
    });
};

//DELETE File/id
exports.deleteAcademicFile = (req, res) => {
  const fileName = req.params.files;
  const directoryPath = "../CPD-Tracker/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

//DELETE Academic/id
exports.deleteOneAcademic = (req, res) => {
    const id = req.params.id;
    AcademicQual.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: 'Cannot find & delete qualification.'
          });
        } else {
          res.send({
            message: "Qualification was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete qualification."
        });
      });
  };
 
//PUT update Academic/id  
exports.updateOneAcademic = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    AcademicQual.findByIdAndUpdate(id, {$set: req.body})
    .then((result) => {
      if (!result) {
          res.status(404).send({
            message: 'Cannot find & update qualification.'
          });
        } else res.send({ data: result, message: "Qualification was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating qualification."
        });
      });
  };
  