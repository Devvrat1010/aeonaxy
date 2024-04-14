const express = require("express");
const User = require("../models/users");

const router = express.Router();

router.post("/uploadImage", async (req, res) => {
    try{

        const { avatar, location, username } = req.body;
        if (!avatar || !username) {
            res.status(400).json({ error: "All fields are required" });
            return 
        }
        else{
            const user = await User.findOneAndUpdate(
                { username: username },
                { avatar: avatar, location: location }
            )
            if (!user) {
                res.status(400).json({ error: "User not found" });
                return
            }
            console.log(user, "image")
            res.status(200).json({ user:user, message: "Image uploaded successfully" });
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

router.post("/survey", async (req, res) => {
    try {
        const { username, survey } = req.body;
        if (!username || !survey) {
            res.status(400).json({ error: "All fields are required" });
            return
        }
        else {
            const user = await User.findOneAndUpdate(
                { username: username },
                { survey: survey, profileCompleted: true },
            )
            if (!user) {
                res.status(400).json({ error: "User not found" });
                return
            }
            // console.log(user, "user")
            res.status(200).json({ user:user, message: "Survey completed successfully" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;