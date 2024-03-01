//import Personal Details model
const PersonalDetails = require('../models/personalDetails');
const uuid = require("uuid");

//POST new Personal
exports.newPersonal = (req, res) => {
    // Create a Personal
    const personal = new PersonalDetails({
      user: req.params.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      emailAddress: req.body.emailAddress,
      mailAddress: req.body.mailAddress,
      statement: req.body.statement,
      idPersonal: uuid.v4()
    });
    // Save Personal in the database
    personal
      .save(personal)
      .then(data => {
        res.send(data);
        //res.json({ msg: 'New endorsement added successfully!'});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving personal details."
        });
      });
};

//GET all Personal
/*exports.getAllPersonal = (req, res) => {
  PersonalDetails.find()
  .then(data => { return res.send(data); })
  .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving details."
      });
    });
};*/

exports.getAllPersonal = (req, res) => {
  PersonalDetails.find()
  .then((result) => { return res.send({data: result}); })
  .catch(err => {
    return res.status(404).json({
      message:
        err.message || "Some error occurred while retrieving details."
      });
    });
};

//GET Personal/id
exports.getPersonal = (req, res) => {
  const id = req.params.id;

  PersonalDetails.findById(id)
    .then((result) => {
      if (!result)
        res.status(404).send({ 
          message: "Cannot find details with id " + id });
      else res.send({data: result});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving details with id=" + id });
    });
};

//DELETE Personal/id
exports.deleteOnePersonal = (req, res) => {
  const id = req.params.id;
  PersonalDetails.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot find & delete details.'
        });
      } else {
        res.send({
          message: "Details were deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete details."
      });
    });
};

//PUT update Personal/id
exports.updateOnePersonal = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  PersonalDetails.findByIdAndUpdate(id, {$set: req.body})
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: 'Cannot find & update details.'
        });
      } else res.send({ data: result, message: "Details were updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating details."
      });
    });
};
