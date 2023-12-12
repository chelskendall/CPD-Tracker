//import tea model
const AcademicQual = require('../models/academicQual');

// newAcademic function for post-academic-route
const newAcademic = (req, res, next) => {
    res.json({message: "POST new AcademicQual"}); // dummy function for now
};

//GET '/academicqualAPI'
const getAllAcademic = (req, res, next) => {
    res.json({message: "GET all AcademicQual"});
};

//DELETE '/academicqualAPI/:name'
const deleteOneAcademic = (req, res, next) => {
    res.json({message: "DELETE 1 AcademicQual"});
};

//POST tea
/*const newAcademic = (req, res) => {
    //check if the academic name already exists in database
    AcademicQual.find({ name: req.body.name }, (err, data) => {

        //if academic not in database, add it
        if (!data) {
            //create a new academic object using the Academic model and req.body
            const newAcademic = new Academic({
                name:req.body.name,
                image: req.body.image, // placeholder for now
                description: req.body.description,
                keywords: req.body.keywords,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature,
            })

            // save this object to database
            newAcademic.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the academic is in database, return a message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Academic Qualification already exists"});
        }
    })    
};*/


//export controller functions
module.exports = {newAcademic, getAllAcademic, deleteOneAcademic};
