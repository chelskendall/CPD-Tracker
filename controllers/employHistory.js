//import Employment model
const EmployHistory = require('../models/employHistory');

//POST create Employment
const newEmployment = async(req, res, next) => {
    EmployHistory.create(req.body)
      .then(employhistoryAPI => res.json({ msg: 'New employment added successfully!' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this employment.' }));
  };

  //GET all Employment
  const getAllEmployment = async(req, res, next) => {
    EmployHistory.find()
      .then(employhistoryAPI => res.json(employhistoryAPI))
      .catch(err => res.status(404).json({ noemploymentfound: 'No employment found.' }));
  };

  //DELETE Employment/id
  const deleteOneEmployment = async(req, res, next) => {
    EmployHistory.findByIdAndDelete(req.params.id)
      .then(employhistoryAPI => res.json({ msg: 'Employment history deleted successfully.' }))
      .catch(err => res.status(404).json({ error: 'No such employment.' }));
  };

  //PUT update Employment/id
  const updateOneEmployment = async(req, res, next) => {
    EmployHistory.findByIdAndUpdate(req.params.id, req.body)
      .then(employhistoryAPI => res.json({ msg: 'Updated successfully.' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database.' })
      );
  };
  
//export controller functions
module.exports = {newEmployment, getAllEmployment, deleteOneEmployment, updateOneEmployment};

