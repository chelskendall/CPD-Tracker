const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/academicqualAPI','./routes/employhistoryAPI'); // import the routes

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://chelsk:tebendiga@cpddata.ktoj6gu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//Setting up express application which listens for request
const app = express();

//Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Connection to database
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/CPDdata') 
.then(() => console.log("Database is connected"))
.catch((error) => console.log(error));*/

const connectMongoDB = async()=>{
    try {
        await mongoose.connect(uri);
        console.log("Database is connected.")
    } catch (error) {
        throw error;
    }
}

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE"
    );
    next();
  });

// use the cors middleware with the origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.json()); // allow application to use json data

app.use('/', routes); //to use the routes

// Connect Database & Backend
connectMongoDB();
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})

const User = require("./models/user");
const userAuth = require('./userAuth');

// register endpoint
app.post("/register", (request, response) => {
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const userProfile = new User({
          email: request.body.email,
          password: hashedPassword,
          //passwordConfirmation: confirmHashedPassword,
        });
  
        // save the new user
        userProfile.save().then((result) => { // return success if the new user is added to the database successfully
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch erroe if the new user wasn't added successfully to the database
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  });

// login endpoint
app.post("/login", (request, response) => {
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
                message: "Passwords does not match",
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
              message: "Login Successful",
              email: userProfile.email,
              token,
            });
          })
          // catch error if password do not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  
  // free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are allowed to access me." });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint", userAuth, (request, response) => {
    response.send({ message: "You are authorized to access me." });
  });