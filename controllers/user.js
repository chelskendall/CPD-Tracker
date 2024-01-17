//import User model
const User = require('../models/user');
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

//Admin deletes user

//User views all data

//Mentor?