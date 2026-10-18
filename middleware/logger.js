
//Define the Morgan Package
const morgan = require("morgan")

//Define the File System package
const fs = require("fs")

//Define the path package
const path = require("path")

//Define the logs folder path - use join() - path : ../logs
const logsFolder = process.env.VERCEL
    ? path.join("/tmp", "logs")
    : path.join(__dirname, "../logs")

//if statement : check the logs folder exists
if (!fs.existsSync(logsFolder)) {
    //Create the logs folder
    fs.mkdirSync(logsFolder, { recursive: true })
}

//Define the log file path - use join()
const logFile = path.join(logsFolder, "access.log")

//Create Stream to writing logs
const logStream = fs.createWriteStream(logFile, {
    flags: "a"
})

//Define custom pathname token without query parameters
morgan.token("pathname", (request) => {
    //Get only the request path
    return request.path
})

//Define the logger
const logger = morgan(
    ':date[iso] :method :pathname :status :response-time ms',
    {
        stream: logStream
    }
)

//export section
module.exports = logger
