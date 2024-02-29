const express = require("express")
const zod = require("zod")
const app = express()

// this will tell that schema will be an array of number
// this is used to describe the structure of ur i/p
const schema = zod.array(zod.number())

app.use(express.json())

app.post("/health-checkup", function (req, res) {
    const kidneys = req.body.kidneys
    const response = schema.safeParse(kidneys)

    if (!response.success) {
        res.status(411).json({
            msg: "Input is Invalid",
        })
    } else {
        res.send({
            response,
        })
    }

    // const kidneyLength = kidneys.length
    // res.send("You have " + kidneyLength + " kidneys")
})

app.listen(3000)
