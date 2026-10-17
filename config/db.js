//Define the variable for Database 
const mongoose = require("mongoose")

//Define the variable for data of the DB
const connectDB = async ()=>{

    //try section 
    try{
        //wait until the DB Connect 
        await mongoose.connect(process.env.MONGODB_URI)
        //Show the message 
        console.log("MongoDB connected successfully")
    }
    //catch section : catch any kind of error 
    catch(error){
        //show the messgae in console &  show exact error message
        console.error("MongoDB connection failed", error.message)
        //exit from the process 
        process.exit(1)
    }
}

//exprot section 
module.exports = connectDB