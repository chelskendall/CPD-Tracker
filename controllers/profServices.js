//import Prof Service model
const Services = require('../models/profServices');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadFile = require('../middleware/uploadFile');
const baseUrl = "http://localhost:3000/servicefiles/";

//POST new Service
exports.newService = (req, res) => {  
  // Create an Service
  const services = new Services({
    user: req.params.email,
    typeServices: req.body.typeServices,
    serviceTitle: req.body.serviceTitle,
    serviceDescribe: req.body.serviceDescribe,
    serviceDate: req.body.serviceDate,
    serviceNotes: req.body.serviceNotes,
    //files: req.body.files,
    idServices: uuid.v4()
  });
  if (req.file){
    let path = ''
    req.files.forEach(function(files,index,arr){
      path = path + files.path + ','
    })
    path = path.substring(0, path.lastIndexOf(","))
    services.files = path
  }
  //Save Service in the database
  services
    .save(services)
    .then(data => {
      res.send(data);
      res.json({ msg: 'New services added successfully!'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering services."
      });
    });
};

//GET all Files  
exports.getServiceFiles = (req, res) => {
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

//GET all Service
exports.getAllService = (req, res) => {
    Services.find()
    .then((result) => { return res.send({data: result}); })
    .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving services."
      });
    });
};

//GET Service/id
exports.getService = (req, res) => {
  const id = req.params.id;

  Services.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find service with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving service with id=" + id });
    });
};

//DELETE File/id
exports.deleteServiceFile = (req, res) => {
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

//DELETE Service/id
exports.deleteOneService = (req, res) => {
  const id = req.params.id;
  Services.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & delete services.'
        });
      } else {
        res.send({
          message: "Service was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete services."
      });
    });
};

//PUT update Service/id
exports.updateOneService = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Services.findByIdAndUpdate(id, {$set: req.body})
  .then((result) => {
    if (!result) {
        res.status(404).send({
          message: 'Cannot find & update services.'
        });
      } else res.send({ data: result, message: "Service was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating services."
      });
    });
};