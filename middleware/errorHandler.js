//Define the Centralized Error Handler 
const errorHandler = (error, request, response, next) =>{

    //if statement : check the error is Mongoose db Validation error
    if(error.name === "ValidationError"){
        //return the status code (400)
        return response.status(400).json({
            //show the message content 
            message : "Validation failed!",
            //show the exact error message
            error: error.message
        })
    }

    //if statement : check the error is Mongoose Cast Error
    if(error.name === "CastError"){
        //return the status code (400)
        return response.status(400).json({
            //show the message content 
            message : "Invalid field value!"
        })
    }

    //if statement : check the error is duplicate key 
    if(error.code === 11000){
        //return the status code(409)
        return response.status(409).json({
            //show the message content 
            message : "Duplicate value already exists!"
        })
    }

    //Log unexpected errors on the server 
    console.error("Server error: ", error)

    //return the status code (500)
    return response.status(500).json({
        //show the message error 
        message: "Internal Server error"
    })
}

//export section 
module.exports = errorHandler