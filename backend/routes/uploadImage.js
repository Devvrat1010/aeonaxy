
// import express from "express";
// import User from "../models/users";

const express = require("express");
const User = require("../models/users");

const router = express.Router();

router.post("/", async (req, res) => {
    try{

        const { public_id, username } = req.body;
        if (!public_id || !username) {
            res.status(400).json({ error: "All fields are required" });
            return 
        }
        else{
            const img = await User.findOneAndUpdate({ username: username }, { image: public_id })
            if (!img) {
                res.status(400).json({ error: "User not found" });
                return
            }
            res.status(200).json({ message: "Image uploaded successfully" });
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;