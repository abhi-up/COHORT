// Importing the 'http' module
const http = require("http")

// Creating a server instance using the 'http.createServer' method
const server = http.createServer((req, res) => {
    // Logging a message when a new request is received
    console.log("New Request Received")
    // Sending a response to the client with an HTML message
    res.end("<h1>Hello from Server !</h1>")
})

// Specifying the port number on which the server will listen for incoming requests
const port = 3000

// Starting the server to listen on the specified port
server.listen(port, () => {
    // Logging a message when the server starts successfully
    console.log(`Server started at: http://localhost:${port}/`)
})
