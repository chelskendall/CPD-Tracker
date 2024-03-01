const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");

/*const path = require ('path');
const expressHandlebars = require('express-handlebars').engine;
const { downloadOrder, findAll, findOne, viewOrder } = require('./controllers/cvTemplate');
const AcademicQual = require('./models/academicQual');*/

//Setting up express application which listens for request
const app = express();

// Used to log requests
const morgan = require('morgan');
app.use(morgan('dev'));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  if (req.method === 'OPTIONS'){
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // allow these method to access API
    return res.status(200).json({});
  }
  next();
});

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://chelsk:tebendiga@cpddata.ktoj6gu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const connectMongoDB = async()=>{
  try {
      await mongoose.connect(uri);
      console.log("Database is connected.")
  } catch (error) {
      throw error;
  }
}

app.use(express.json()); // allow application to use json data

// use the cors middleware with the origin and credentials options
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));


app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// Connect Database & Backend
connectMongoDB();
/*const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})*/

//Initialize Routes
app.use('/', require('./routes/userAPI'));
app.use('/', require('./routes/personalAPI'));
app.use('/', require('./routes/academicqualAPI'));
app.use('/', require('./routes/employhistoryAPI'));
app.use('/', require('./routes/affiliationAPI'));
app.use('/', require('./routes/serviceAPI'));
app.use('/', require('./routes/cpdAPI'));
app.use('/', require('./routes/endorseAPI'));

//Testing
app.use((req,res,next) => {
    res.status(404).send("Sorry can't find that!")
})

module.exports = app;
