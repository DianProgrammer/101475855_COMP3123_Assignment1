
 //Define the jwt var
const jwt = require("jsonwebtoken");

//Define User Model : path = ../models/User
const User = require("../models/User");

//Define the Authentication Middleware
const auth = async (request, response, next) => {
    //try section
    try {
        //Get the data [Authorization Header]
        const authHeader = request.headers.authorization;

        //if statement : check if the token exists?
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            //return status code [401]
            return response.status(401).json({
                //show the message content
                message: "Access Denied. Token is required"
            });
        }

        //Get the token from the header
        const token = authHeader.split(" ")[1];

        //verify the JWT TOKEN
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ["HS256"] }
        );

        //Find user by JWT userId
        const user = await User.findById(decoded.userId);

        //if statement : check if the user exists
        if (!user) {
            //return status code (401)
            return response.status(401).json({
                //show the message content
                message: "User not found or unauthorized"
            });
        }

        //Save id in request
        request.userId = user._id;

        //go to the next [middleware or controller]
        next();
    }

    //catch error
    catch (error) {
        //if statement : check expired token
        if (error.name === "TokenExpiredError") {
            //return section : status code (401)
            return response.status(401).json({
                //show the message content
                message: "Token has expired"
            });
        }

        //if statement : check invalid token
        if (error.name === "JsonWebTokenError") {
            //return status code (401)
            return response.status(401).json({
                //show the message content
                message: "Invalid Token"
            });
        }

        //Send unexpected errors to error handler
        next(error);
    }
};

//export section
module.exports = auth;
