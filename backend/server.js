const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(bodyParser.json())

const db = process.env.DB_URI
const port = process.env.PORT || 5000

const auth = require('./routes/auth')
const completeProfile = require('./routes/completeProfile')
// const emailVerification = require('./routes/emailVerification')
const cronjobs = require('./routes/cronjobs')
const temp = require('./routes/temp')

app.use('/api/auth', auth)
app.use('/api/completeProfile', completeProfile)
// app.use('/api/emailVerification', emailVerification)
app.use('/api/cronjobs', cronjobs)
app.use('/api/temp', temp)


const start = async () => {
    try {
        await mongoose.connect(db)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

app.use("/", (req, res) => {
    // res.redirect("http://localhost:5173/confirmedEmail");
    res.send("Hello World");
});

start()