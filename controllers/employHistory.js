//import Employment model
const EmployHistory = require('../models/employHistory');
const uuid = require("uuid");
const fs = require("fs");

const baseUrl = "http://localhost:3000/employmentfiles/";

//POST new Employment
exports.newEmployment = (req, res) => {  
  // Create an Employment
  const employment = new EmployHistory({
    email: req.params.email,
    jobTitle: req.body.jobTitle,
    employer: req.body.employer,
    employStart: req.body.employStart,
    employEnd: req.body.employEnd,
    responsibilities: req.body.responsibilities,
    idEmploy: uuid.v4()
  });
  //Save Employment in the database
  employment
    .save(employment)
    .then((result) => {
      res.json({ data: result, msg: 'New employment added successfully!'});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while entering employment."
      });
    });
};

//GET all Employment
exports.getAllEmploy = (req, res) => {
  EmployHistory.find()
  .then((result) => { return res.send({data: result}); })
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
  EmployHistory.findByIdAndUpdate(id, {$set: req.body})
  .then((result) => {
    if (!result) {
        res.status(404).send({
          message: 'Cannot find & update employment.'
        });
      } else res.send({ data: result, message: "Employment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employment."
      });
    });
};
