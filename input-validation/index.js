const express = require("express")

const app = express()

// Middleware to extract the body- express.json is the middle ware here
app.use(express.json())

app.post("/health-checkup", function (req, res) {
    // kidneys = [1, 2]
    const kidneys = req.body.kidneys
    const kidneyLength =
        kidneys.length /* Exception will be thrown on this line */

    res.send("you have " + kidneyLength + " kidneys")
})

// Global Catches- Error based middlewares it has 4 arguments(err is the error object)
app.use(function (err, req, res, next) {
    res.json({
        msg: "Sorry something is up with our server.",
    })
})
app.listen(3000)
