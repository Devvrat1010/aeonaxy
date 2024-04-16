// write an api endpoint to drop all collectinos in the database

// code
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();

router.get("/clearDatabase", async (req, res) => {
    try {
        // Drop all collections in the database
        await mongoose.connection.db.dropDatabase();
        res.status(200).json({ message: "Database cleared successfully" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;