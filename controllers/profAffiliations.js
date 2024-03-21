//import Prof Affiliations model
const Affiliations = require('../models/profAffiliations');
const uuid = require("uuid");
const fs = require("fs");

const baseUrl = "http://localhost:3000/affiliationfiles/";


//POST new Affiliation
exports.newAffiliation = (req, res) => {  
  
  const reqFiles = []
  const url = 'http://localhost:3000/user/:email/newaffiliation'
  
  for (var i = 0; i < req.files.length; i++) {
  reqFiles.push(url + '/uploads/' + req.files[i].filename)}

  // Create an Affiliation
  const affiliations = new Affiliations({
    email: req.params.email,
    typeAffiliation: req.body.typeAffiliation,
    organization: req.body.organization,
    affiliateTitle: req.body.affiliateTitle,
    affiliateStart: req.body.affiliateStart,
    affiliateEnd: req.body.affiliateEnd,
    files: reqFiles,
    idAffiliate: uuid.v4()
  });
  
  //Save Affiliation in the database
  affiliations
    .save()
    .then(result => {
      console.log(result);
    res.status(201).json({
      message: "Done upload!",
      affiliationCreated: {
        typeAffiliation: result.typeAffiliation,
        organization: result.organization,
        affiliateTitle: result.affiliateTitle,
        affiliateStart: result.affiliateStart,
        affiliateEnd: result.affiliateEnd,
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
    .then((result) => { return res.send({data: result}); })
    .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving affiliations."
      });
    });
};

//GET Affiliation/id
exports.getAffiliation = (req, res) => {
  const id = req.params.id;

  Affiliations.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find affil with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving affil with id=" + id });
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
  Affiliations.findByIdAndUpdate(id, {$set: req.body})
  .then((result) => {
    if (!result) {
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