require("dotenv").config();

//express & helmet
const express = require("express")
const helmet = require("helmet")

//Define the variable for DB : Path = ./config/db
const connectDB = require("./config/db")

//Define userRoutes : Path = ./routes/userRoutes
const userRoutes = require("./routes/userRoutes")

//Define employeeRoutes - path : ./routes/employeeRoutes
const employeeRoutes = require("./routes/employeeRoutes")

//Define Centralized Error Handler
const errorHandler = require("./middleware/errorHandler")

//Define Rate Limiter - path : ./middleware/rateLimiter
const apiLimiter = require("./middleware/rateLimiter")

//Define Logger - path : ./middleware/logger 
const logger = require("./middleware/logger")

const app = express()

app.use(helmet())
app.use(express.json())

//Apply Logger to all requests 
app.use(logger)

//Apply Rate limiter to all API routes
app.use("/api/v1", apiLimiter)

//user - userRoutes - path : api/v1/user
app.use("/api/v1/user", userRoutes)

//employee - employeeRoutes - path : api/v1/emp
app.use("/api/v1/emp", employeeRoutes)

//GET - Path : /health
app.get("/health", (request, response) => {

    //show the result status code
    response.status(200).json({
        //message content status
        status: "OK",
        //message
        message: "COMP3123 Assignment 1 API is running"
    })
})

//Apply Centralized error handler after all routes
app.use(errorHandler)

//Define the port
const PORT = process.env.PORT || 3000;

//define the variable
const startServer = async () => {
    //wait until you have connection
    await connectDB()

    //listen to the port [need arrow function]
    app.listen(PORT, () => {

        //show the message on console
        console.log(`Server is running on port ${PORT}`)
    })
}

//startServer
startServer()
