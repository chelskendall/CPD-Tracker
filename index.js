const express = require('express');
const mongoose = require('mongoose');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require ('path');

const expressHandlebars = require('express-handlebars').engine;

const { downloadOrder, findAll, findOne, viewOrder } = require('./controllers/cvTemplate');
const AcademicQual = require('./models/academicQual');
//const Endorsements = require('./models/endorsements');

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

// Used to log requests
/*const morgan = require('morgan');
app.use(morgan('dev'));*/

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
app.use(express.json()); // allow application to use json data

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');   //sets Handlebars as the view engine to render pages
app.set('views', path.resolve(__dirname, './views'));  //indicates the folder where the view engine will look up the files to render


// Connect Database & Backend
connectMongoDB();
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})

//Initialize Routes
app.use('/', require('./routes/userAPI'));
app.use('/', require('./routes/personalAPI'));
app.use('/', require('./routes/academicqualAPI'));
app.use('/', require('./routes/employhistoryAPI'));
app.use('/', require('./routes/affiliationAPI'));
app.use('/', require('./routes/serviceAPI'));
app.use('/', require('./routes/cpdAPI'));
app.use('/', require('./routes/endorseAPI'));
app.use('/orders/:id/view', viewOrder);


/*const resume = {
	shipping: {
		name: 'John Doe',
		address: '1234 Main Street',
		city: 'San Francisco',
		state: 'CA',
		country: 'US',
		postal_code: 94111,
	}
};*/

/*const { createCV } = require('./createCV.js');
const AcademicQual = require('./models/academicQual');
createCV(AcademicQual, 'invoice.pdf');*/

//Testing
app.use((req,res,next) => {
    res.status(404).send("Sorry can't find that!")
})




// register endpoint
/*app.post("/register", (request, response) => {
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
  });*/

// login endpoint
/*app.post("/login", (request, response) => {
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
  });*/
  
  // free endpoint
/*app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are allowed to access me." });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint", userAuth, (request, response) => {
    response.send({ message: "You are authorized to access me." });
  });*/