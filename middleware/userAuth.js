const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user
    const user = decodedToken; 
    req.user = user; // pass the the user down to the endpoints here    
    next(); // pass down functionality to the endpoint
    
  } catch (error) {
    res.status(401).json({
      error: new Error("Please log in!"),
    });
  }
};