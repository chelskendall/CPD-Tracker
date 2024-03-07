//import CPD Training model
const CPD = require('../models/cpdTraining');
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

const uploadFile = require('../middleware/uploadFile');
const baseUrl = "http://localhost:3000/cpdfiles/";
 
//POST new CPD - old version
/*exports.newCPD = (req, res) => {  
  // Create an CPD
  const cpd = new CPD({
    user: req.params.email,
    typeCPD: req.body.typeCPD,
    cpdTitle: req.body.cpdTitle,
    cpdDescribe: req.body.cpdDescribe,
    cpdStart: req.body.cpdStart,
    cpdEnd: req.body.cpdEnd,
    cpdHours: req.body.cpdHours,
    cpdReflect: req.body.cpdReflect,
    //files: req.body.files,
    idCPD: uuid.v4()
  });
  if (req.file){
    let path = ''
    req.files.forEach(function(files,index,arr){
      path = path + files.path + ','
    })
    path = path.substring(0, path.lastIndexOf(","))
    cpd.files = path
  }
  //Save CPD in the database
  cpd
    .save(cpd)
    .then(data => {
      res.send(data);
      res.json({ msg: 'New CPD added successfully!'});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering CPD."
      });
    });
};*/

//POST new CPD - https://www.positronx.io/angular-drag-and-drop-file-uploading-with-mongodb-multer/
exports.newCPD = (req, res) => {  
  
  const reqFiles = []
  const url = 'http://localhost:3000/user/:email/newcpd'
  
  for (var i = 0; i < req.files.length; i++) {
  reqFiles.push(url + '/uploads/' + req.files[i].filename)}

  // Create an CPD
  const cpds = new CPD({
    user: req.params.email,
    typeCPD: req.body.typeCPD,
    cpdTitle: req.body.cpdTitle,
    cpdDescribe: req.body.cpdDescribe,
    cpdStart: req.body.cpdStart,
    cpdEnd: req.body.cpdEnd,
    cpdHours: req.body.cpdHours,
    cpdReflect: req.body.cpdReflect,
    files: reqFiles,
    idCPD: uuid.v4()
  });
  
  //Save CPD in the database
  cpds
    .save()
    .then(result => {
      console.log(result);
    res.status(201).json({
      message: "Done upload!",
      cpdCreated: {
        typeCPD: result.typeCPD,
        cpdTitle: result.cpdTitle,
        cpdDescribe: result.cpdDescribe,
        cpdStart: result.cpdStart,
        cpdEnd: result.cpdEnd,
        cpdHours: result.cpdHours,
        cpdReflect: result.cpdReflect,
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
exports.getCPDFiles = (req, res) => {
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

//GET all CPD
exports.getAllCPD = (req, res) => {
  CPD.find()
  .then((result) => { return res.send({data: result}); })
  .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving CPD."
      });
    });
};

//GET CPD/id
exports.getCPD = (req, res) => {
  const id = req.params.id;

  CPD.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find CPD with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving CPD with id=" + id });
    });
};

//DELETE File/id
exports.deleteCPDFile = (req, res) => {
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

//DELETE CPD/id
exports.deleteOneCPD = (req, res) => {
  const id = req.params.id;
  CPD.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & delete CPD.'
        });
      } else {
        res.send({
          message: "CPD was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete CPD."
      });
    });
};

//PUT update CPD/id
exports.updateOneCPD = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  CPD.findByIdAndUpdate(id, {$set: req.body})
  .then((result) => {
    if (!result) {
        res.status(404).send({
          message: 'Cannot find & update CPD.'
        });
      } else res.send({ data: result, message: "CPD was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating CPD."
      });
    });
};