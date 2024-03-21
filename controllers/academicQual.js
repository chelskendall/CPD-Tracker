//import Academic model
const AcademicQual = require('../models/academicQual');
const uuid = require("uuid");
const fs = require("fs");

const baseUrl = "http://localhost:3000/academicfiles/";


//POST new Academic
exports.newAcademic = (req, res) => {  
  
  const reqFiles = []
  const url = 'http://localhost:3000/user/:email/newacademic'
  
  for (var i = 0; i < req.files.length; i++) {
  reqFiles.push(url + '/uploads/' + req.files[i].filename)}

  // Create an Academic
  const academics = new AcademicQual({
    email: req.params.email,
    establishment: req.body.establishment,
    courseTitle: req.body.courseTitle,
    academicStart: req.body.academicStart,
    academicEnd: req.body.academicEnd,
    files: reqFiles,
    idAcademic: uuid.v4()
  });
  
  //Save Academic in the database
  academics
    .save()
    .then(result => {
      console.log(result);
    res.status(201).json({
      message: "Done upload!"
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
exports.getAllAcademic = (req, res) => {
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
  