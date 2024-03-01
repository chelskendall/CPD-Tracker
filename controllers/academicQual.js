//import Academic model
const AcademicQual = require('../models/academicQual');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadFile = require('../middleware/uploadFile');
const baseUrl = "http://localhost:3000/academicfiles/";
  

//POST create Academic
exports.newAcademic = (req, res) => {  
    // Create an Academic
    const academic = new AcademicQual({
      user: req.params.email,
      establishment: req.body.establishment,
      courseTitle: req.body.courseTitle,
      academicStart: req.body.academicStart,
      academicEnd: req.body.academicEnd,
      //files: req.body.files,
      idAcademic: uuid.v4()
    });
    if (req.file){
      let path = ''
      req.files.forEach(function(files,index,arr){
        path = path + files.path + ','
      })
      path = path.substring(0, path.lastIndexOf(","))
      academic.files = path
    }
    // Save Academic in the database
    academic
      .save(academic)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while entering Academic Qualifications."
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
      .then(data => { res.send(data); })
      .catch(err => {
        res.status(500).send({
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
    AcademicQual.findByIdAndUpdate(id, req.body)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: 'Cannot find & update qualification.'
          });
        } else res.send({ message: "Qualification was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating qualification."
        });
      });
  };
  