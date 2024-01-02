const express = require('express'); //import express

// 1. Create an express router object to set up our routes
const router  = express.Router(); 


// 2. Import our employment history controller from our controllers/employHistory.js file we created earlier
const employController = require('../controllers/employHistory'); 


// 3. Create our first route with the controller function as the callback to handle the request.
router.post('/employhistoryAPI', employController.newEmployment); //create new employment
router.get('/employhistoryAPI', employController.getAllEmployment); //display all employment
router.delete('/employhistoryAPI/:id', employController.deleteOneEmployment); //delete one employment
router.put('/employhistoryAPI/:id', employController.updateOneEmployment); //update an employment

// 4. Export the route to use in our server.js
module.exports = router;