// First call the express function
const express = require("express")
// This will give u back an express object
const app = express()
// Port no. deploy our server on the provided port no.
const port = 3000

// Now on the app object whenever we want to create a new
// route handler we will call the get method
app.get("/", function (req, res) {
  // req includes headers, body, query parameters
  // Do the computing or console logs
  res.send("Hello World")
})

app.listen(port)
