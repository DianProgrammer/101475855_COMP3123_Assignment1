require("dotenv").config();
//express & helmet 
const express = require("express")
const helmet = require("helmet")

//Define the variable for DB : Path = ./config/db
const connectDB = require("./config/db")

//Define userRoutes : Path = ./routes/userRoutes
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(helmet())
app.use(express.json())

//user - userRoutes - path : api/v1/user
app.use("/api/v1/user", userRoutes)

//GET - Path : /health 
app.get("/health", (request, response) => {

    //show the result status code 
    response.status(200).json({
        //message content status 
        status: "OK", 
        //messgae
        message: "COMP3123 Assignemnt 1 API is running"
    })
})

//Define the port 
const PORT = process.env.PORT || 3000;

//define the variable 
const startServer = async ()=>{
    //wait until you have connection 
    await connectDB()

    //listen to the port [need arrow function]
    app.listen(PORT, ()=>{

        //show the message on console
        console.log(`Server is running on port ${PORT}`)
    })
}

//startServer 
startServer()