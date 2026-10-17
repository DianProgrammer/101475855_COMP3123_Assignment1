//Define the File System package
const fs = require("fs")

//Define the path package
const path = require("path")

//Define the error log file path - join() - path : ../logs/error.log
const errorLogFile = path.join(__dirname, "../logs/error.log")

//Define the error logging function
const logError = (request, errorType, statusCode) => {

    //Get the current timestamp
    const timestamp = new Date().toISOString()

    //Create the log message without sensitive data
    const logMessage =
        `${timestamp} ${request.method} ${request.path} ${statusCode} ${errorType}\n`

    //Write the error information to the local log file
    fs.appendFileSync(errorLogFile, logMessage)
}

//export section
module.exports = logError
