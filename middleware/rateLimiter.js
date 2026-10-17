//Define express-rate-limit package 
const rateLimit = require("express-rate-limit")

//Define API Rate Limiter
const apilimiter = rateLimit({
    //Set the time window to 15 min
    windowMs: 15 * 60 * 1000,

    //Allow maximum 100 requiests per IP 
    limit: 100, 

    //Return standard rate limit headers
    standardHeaders: "draft-8", 

    //Disable legacy rate limit headers
    legacyHeaders: false, 

    //show message when request limit exceeded
    message: {message: "Toomany requests.please try again later!"}
})

//export section 
module.exports = apilimiter;