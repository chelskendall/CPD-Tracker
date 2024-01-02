//import Academic model
const AcademicQual = require('../models/academicQual');

// newAcademic function for post-academic-route
/*const newAcademic = (req, res, next) => {
    res.json({message: "POST new AcademicQual"}); // dummy function for now
};*/

//GET '/academicqualAPI'
/*const getAllAcademic = (req, res, next) => {
    res.json({message: "GET all AcademicQual"});
};*/

//DELETE '/academicqualAPI/:name'
/*const deleteOneAcademic = (req, res, next) => {
    res.json({message: "DELETE 1 AcademicQual"});
};*/

//used logrocket.com

//POST create Academic
const newAcademic = async(req, res, next) => {
    AcademicQual.create(req.body)
      .then(academicqualAPI => res.json({ msg: 'New academic added successfully!' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this qualification.' }));
  };

  //GET all Academics
  const getAllAcademic = async(req, res, next) => {
    AcademicQual.find()
      .then(academicqualAPI => res.json(academicqualAPI))
      .catch(err => res.status(404).json({ noacademicfound: 'No qualifications found.' }));
  };

  //DELETE Academic/id
  const deleteOneAcademic = async(req, res, next) => {
    AcademicQual.findByIdAndDelete(req.params.id)
      .then(academicqualAPI => res.json({ msg: 'Academic qualification deleted successfully.' }))
      .catch(err => res.status(404).json({ error: 'No such qualification.' }));
  };

  //PUT update Academic/id
  const updateOneAcademic = async(req, res, next) => {
    AcademicQual.findByIdAndUpdate(req.params.id, req.body)
      .then(academicqualAPI => res.json({ msg: 'Updated successfully.' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database.' })
      );
  };
  
//export controller functions
module.exports = {newAcademic, getAllAcademic, deleteOneAcademic, updateOneAcademic};



//POST tea
/*const newAcademic = async(req, res, next) => {
    try {
        if (req.body.academicqualAPI && req.body.academicqualAPI !== ''){
            const createAcademic = new AcademicQual(req.body);
            await createAcademic.save();
            return res.send("Academic Created");
        } else{
            return res.status(400).send("Bad Request");
        }
    }   catch (error) {
        return res.status(500).send("Internal Server Error");
    }
};*/

/*user: req.body.user,
                establishment: req.body.establishment, // placeholder for now
                courseTitle: req.body.courseTitle,
                academicStart: req.body.academicStart,
                academicEnd: req.body.academicEnd,
                idAcademic: req.body.idAcademic,*/