const AcademicQual = require('../models/academicQual');
const CPD = require('../models/cpdTraining');
const EmployHistory = require('../models/employHistory');
const Endorsement = require('../models/endorsements');
const PersonalDetails = require('../models/personalDetails');
const Affiliations = require('../models/profAffiliations');
const Services = require('../models/profServices');

const User = require('../models/user'); //import User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = function(req,res){
    User.find({email: req.body.email})
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email taken.'
            }); //Conflict occurs
        }else if (req.body.password != req.body.passwordConfirmation) {
            return res.status(409).json({
                message: 'Password and Password Confirmation does not match.'
            }); //Conflict occurs
        } else{  
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const token = jwt.sign({
                        email: req.body.email
                    }, 
                    'RANDOM-TOKEN',
                    {
                        expiresIn: "1h"
                    }
                    );
                    (new User({'email': req.body.email , 'password': hash 
                    /*'securityQuestion': req.body.securityQuestion, 
                  'securityQuestionAnswer':req.body.securityQuestionAnswer*/}))
                    .save().then(function(){
                        return res.status(200).json({
                            message: 'Registration Successful!',
                            token: token
                        });}).catch(error => {console.log(error)});
                }
            }
        )}}
)
};

exports.login = function(request, response){
    // check if email exists
    User.findOne({ email: request.body.email })
      // if email exists
      .then((userProfile) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(request.body.password, userProfile.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords do not match.",
                error,
              });
            }
            //   create JWT token
            const token = jwt.sign(
              {
                userId: userProfile._id,
                userEmail: userProfile.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            //   return success response
            response.status(200).send({
              message: "Login Successful!",
              email: userProfile.email,
              token,
            });
          })
          // catch error if password do not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords do not match.",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found.",
          e,
        });
      });
  };

exports.updatePW = function(req,res){
    User.find({email: req.body.email})
    .then(user => {
        if (user.length < 1){
            return res.status(401).json({
                message: 'Invalid email.'
            });
        }else if(req.body.password === req.body.passwordConfirmation)
                bcrypt.hash(req.body.password,10,(err,hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const token = jwt.sign({
                            email: req.body.email
                        }, 
                        'RANDOM-TOKEN',
                        {
                            expiresIn: "1h"
                        }
                        );
                        const updatedUser = { password: hash };
                        User.findOneAndUpdate({email: req.body.email},updatedUser).then(function(){
                            res.status(200).json({
                                token: token
                            });
                    })
                }})
            else{
            return res.status(401).json({
                message: 'Password and Password Confirmation do not match.'
            });
        }
        })
};

//Admin views all users
exports.allUsers = function(req,res){
    if (req.params.email === 'Administrator'){
        res.status(200);
        User.find({}, { email: 1, _id: 0 }).then(function(email){
            res.status(201).json({
                email
            });
        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
    }
    else {
        res.status(401).json({
            message: 'Administrator access only.'
        }); 
    }
};

//Admin views all of users data
exports.allOfAUser = function(req, res) {
    User.find({ email: req.params.email })
        .then(users => {
            if (users.length === 0) {
                return res.status(401).json({
                    message: 'Invalid email'
                });
            }else{
                res.status(200);
        Promise.all([
            AcademicQual.find({email: req.params.email}),
            CPD.find({email: req.params.email}),
            EmployHistory.find({email: req.params.email}),
            Endorsement.find({email: req.params.email}),
            PersonalDetails.find({email: req.params.email}),
            Affiliations.find({email: req.params.email}),
            Services.find({email: req.params.email}),
        ]).then(function(results) {
            const profiles = [    
            { name: 'AcademicQual', data: results[0] },
            { name: 'CPD', data: results[1] },
            { name: 'EmployHistory', data: results[2] },
            { name: 'Endorsement', data: results[3] },
            { name: 'PersonalDetails', data: results[4] },
            { name: 'Affiliations', data: results[5] },
            { name: 'Services', data: results[6] },
            ];
            res.status(201).json({
                profiles
            });
        }).catch(error => {console.log(error)});                        
            }
        });
};

//Admin deletes user
exports.deleteUser = function(req,res){
    const deleteUserInfo = (user) => {
        AcademicQual.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
        CPD.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
        EmployHistory.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
        Endorsement.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
        PersonalDetails.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
        Affiliations.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
        Services.deleteMany({email: req.body.email})
        .then(() => user)
        .catch((error) => console.log(error));
    };
    if (req.params.email === 'Administrator'){
        res.status(200);
        User.findOneAndRemove({email: req.body.email})
        .then((user) => {res.send(deleteUserInfo(user));})
        .catch((error) => console.log(error));
    }
    else {
        res.status(401).json({
            message: 'Administrator ONLY!'
        }); 
    }
};


//Mentor?