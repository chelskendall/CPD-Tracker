const express = require('express'); //import express

// 1. Create an express router object to set up our routes
const router  = express.Router(); 


// 2. Import our academic qual controller from our controllers/academicQual.js file we created earlier
const academicController = require('../controllers/academicQual'); 


// 3. Create our first route with the controller function as the callback to handle the request.
router.post('/academicqualAPI', academicController.newAcademic); //create new academic
router.get('/academicqualAPI', academicController.getAllAcademic); //display all academics
router.delete('/academicqualAPI/:name', academicController.deleteOneAcademic); //delete one academic

// 4. Export the route to use in our server.js
module.exports = router;
