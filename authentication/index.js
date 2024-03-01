const express = require("express") // Import the express module
const jwt = require("jsonwebtoken") // Import the jsonwebtoken module
const jwtPassword = "123456" // Define a secret key for JWT

const app = express() // Create an express application

app.use(express.json()) // Middleware to parse JSON request bodies

const ALL_USERS = [
    // Define an array of user objects
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "abhishek@gmail.com",
        password: "123321",
        name: "Abhishek Upadhyay",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
]

function userExists(username, password) {
    // Function to check if a user exists
    const matchedUsers = ALL_USERS.filter(
        // Filter the users array
        (user) => user.username === username && user.password === password
    )
    return matchedUsers.length > 0 // Return true if any user matches, otherwise false
}

app.post("/signin", function (req, res) {
    // Route for user sign-in
    const username = req.body.username // Get username from request body
    const password = req.body.password // Get password from request body

    if (!userExists(username, password)) {
        // Check if user exists
        return res.status(403).json({
            // Return 403 if user doesn't exist
            msg: "User doesnt exist in our in memory db",
        })
    }
    var token = jwt.sign({ username: username }, jwtPassword) // Generate JWT token
    return res.json({
        // Return token in response
        token,
    })
})

app.get("/users", function (req, res) {
    // Route to get list of users
    const token = req.headers.authorization // Get JWT token from Authorization header
    try {
        const decoded = jwt.verify(token, jwtPassword) // Verify and decode JWT token
        const username = decoded.username // Extract username from decoded token
        res.json({
            // Return list of users excluding current user
            users: ALL_USERS.filter((value) => {
                if (value.username == username) return false
                else return true
            }),
        })
    } catch (err) {
        // Handle invalid token
        return res.status(403).json({
            msg: "Invalid token",
        })
    }
})

app.listen(3000) // Start listening on port 3000
