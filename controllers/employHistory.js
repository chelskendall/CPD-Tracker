//import Employment model
const EmployHistory = require('../models/employHistory');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadFile = require('../middleware/uploadFile');
const baseUrl = "http://localhost:3000/employmentfiles/";

//POST new Employment
exports.newEmployment = (req, res) => {  
  // Create an Employment
  const employment = new EmployHistory({
    user: req.params.email,
    jobTitle: req.body.jobTitle,
    employer: req.body.employer,
    employStart: req.body.employStart,
    employEnd: req.body.employEnd,
    responsibilities: req.body.responsibilities,
    //files: req.body.files,
    idEmploy: uuid.v4()
  });
  if (req.file){
    let path = ''
    req.files.forEach(function(files,index,arr){
      path = path + files.path + ','
    })
    path = path.substring(0, path.lastIndexOf(","))
    employment.files = path
  }
  //Save Employment in the database
  employment
    .save(employment)
    .then(data => {
      res.send(data);
      res.json({ msg: 'New employment added successfully!'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering employment."
      });
    });
};

//GET all Files  
exports.getEmployFiles = (req, res) => {
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

//GET all Employment
exports.getAllEmploy = (req, res) => {
  EmployHistory.find()
  .then(data => { return res.send(data); })
  .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving employment."
      });
    });
};

//GET Employment/id
exports.getEmploy = (req, res) => {
  const id = req.params.id;

  EmployHistory.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find employ with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving employ with id=" + id });
    });
};

//DELETE File/id
exports.deleteEmployFile = (req, res) => {
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

//DELETE Employment/id
exports.deleteOneEmploy = (req, res) => {
  const id = req.params.id;
  EmployHistory.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & delete employment.'
        });
      } else {
        res.send({
          message: "Employment was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employment."
      });
    });
};

//PUT update Employment/id
exports.updateOneEmploy = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  EmployHistory.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & update employment.'
        });
      } else res.send({ message: "Employment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employment."
      });
    });
};
