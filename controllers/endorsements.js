//import Endorsement model
const Endorsement = require('../models/endorsements');
const uuid = require("uuid");
const fs = require("fs");

const baseUrl = "http://localhost:3000/endorsefiles/";


//POST new Endorsement
exports.newEndorse = (req, res) => {  
  
  const reqFiles = []
  const url = 'http://localhost:3000/user/:email/newendorse'
  
  for (var i = 0; i < req.files.length; i++) {
  reqFiles.push(url + '/uploads/' + req.files[i].filename)}

  // Create an Endorsement
  const endorsements = new Endorsement({
    email: req.params.email,
    refereeName: req.body.refereeName,
    refereePlace: req.body.refereePlace,
    refereePhone: req.body.refereePhone,
    refereeDate: req.body.refereeDate,
    files: reqFiles,
    idEndorse: uuid.v4()
  });
  
  //Save Endorsement in the database
  endorsements
    .save()
    .then(result => {
      console.log(result);
    res.status(201).json({
      message: "Done upload!",
      endorsementCreated: {
        refereeName: result.refereeName,
        refereePlace: result.refereePlace,
        refereePhone: result.refereePhone,
        refereeDate: result.refereeDate,
        files: result.files
      }
    })
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering affiliations."
      });
    });
};

//GET all Files  
exports.getEndorseFiles = (req, res) => {
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

//GET all Endorsement
exports.getAllEndorse = (req, res) => {
  Endorsement.find()
  .then((result) => { return res.send({data: result}); })
  .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving endorsements."
      });
    });
};

//GET Endorsement/id
exports.getEndorse = (req, res) => {
  const id = req.params.id;

  Endorsement.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find endorse with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving endorse with id=" + id });
    });
};

//DELETE File/id
exports.deleteEndorseFile = (req, res) => {
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

//DELETE Endorsement/id
exports.deleteOneEndorse = (req, res) => {
  const id = req.params.id;
  Endorsement.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & delete endorsement.'
        });
      } else {
        res.send({
          message: "Endorsement was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete endorsement."
      });
    });
};

//PUT update Endorsement/id
exports.updateOneEndorse = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Endorsement.findByIdAndUpdate(id, {$set: req.body})
  .then((result) => {
    if (!result) {
        res.status(404).send({
          message: 'Cannot find & update endorsement.'
        });
      } else res.send({ data: result, message: "Endorsement was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating endorsement."
      });
    });
};