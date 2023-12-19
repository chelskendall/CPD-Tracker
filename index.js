const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/academicqualAPI'); // import the routes

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
        //await mongoose.connect("mongodb://localhost:27017/CPDdata");
        await mongoose.connect(uri);
        console.log("Database is connected.")
    } catch (error) {
        throw error;
    }
}

// use the cors middleware with the origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyParser.json()); // allow application to use json data
//app.use(express.json()); // allow application to use json data

app.use('/', routes); //to use the routes

/*app.listen(3000, ()=>{
    connectMongoDB();
    console.log("Connected to backend.");
});*/

// Connect Database
connectMongoDB();
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})
