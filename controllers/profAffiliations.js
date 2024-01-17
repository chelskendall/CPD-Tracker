//import Prof Affiliations model
const Affiliations = require('../models/profAffiliations');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadFile = require('../middleware/uploadFile');
const baseUrl = "http://localhost:3000/affiliationfiles/";

//POST new Affiliation
exports.newAffiliation = (req, res) => {  
  // Create an Affiliation
  const affiliations = new Affiliations({
    user: req.params.email,
    typeAffiliation: req.body.typeAffiliation,
    organization: req.body.organization,
    affiliateTitle: req.body.affiliateTitle,
    affiliateStart: req.body.affiliateStart,
    affiliateEnd: req.body.affiliateEnd,
    //files: req.body.files,
    idAffiliate: uuid.v4()
  });
  if (req.file){
    let path = ''
    req.files.forEach(function(files,index,arr){
      path = path + files.path + ','
    })
    path = path.substring(0, path.lastIndexOf(","))
    affiliations.files = path
  }
  //Save Affiliation in the database
  affiliations
    .save(affiliations)
    .then(data => {
      res.send(data);
      res.json({ msg: 'New affiliations added successfully!'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering affiliations."
      });
    });
};

//GET all Files  
exports.getAffiliationFiles = (req, res) => {
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

//GET all Affiliations
exports.getAllAffiliation = (req, res) => {
    Affiliations.find()
  .then(data => { return res.send(data); })
  .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving affiliations."
      });
    });
};

//DELETE File/id
exports.deleteAffiliationFile = (req, res) => {
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

//DELETE Affiliation/id
exports.deleteOneAffiliation = (req, res) => {
  const id = req.params.id;
  Affiliations.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & delete affiliation.'
        });
      } else {
        res.send({
          message: "Affiliation was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete affiliation."
      });
    });
};

//PUT update Affiliation/id
exports.updateOneAffiliation = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Affiliations.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & update affiliation.'
        });
      } else res.send({ message: "Affiliation was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating affiliation."
      });
    });
};