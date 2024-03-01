/* 
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks, and more, making it easier to work with MongoDB databases in Node.js applications.
*/

const express = require("express") // Import the express module
const mongoose = require("mongoose") // Import the mongoose module
const app = express() // Create an express application

app.use(express.json()) // Middleware to parse JSON request bodies

mongoose.connect(
    // Connect to MongoDB Atlas cluster
    "mongodb+srv://Abhishek:PaJEMTWOmyNUb8C6@cluster0.lqffou4.mongodb.net/userappnew"
)

const User = mongoose.model("Users", {
    // Define a mongoose model for users
    name: String,
    email: String,
    password: String,
})

app.post("/signup", async function (req, res) {
    // Route for user sign-up
    const username = req.body.username // Get username from request body
    const password = req.body.password // Get password from request body
    const name = req.body.name // Get name from request body

    const existingUser = await User.findOne({ email: username }) // Check if user already exists

    if (existingUser) {
        // If user already exists, return error
        return res.status(400).send("Username already exists")
    }

    const user = new User({
        // Create a new user object
        name: name,
        email: username,
        password: password,
    })

    user.save() // Save the new user to the database
    res.json({
        // Return success message
        msg: "User created successfully",
    })
})
