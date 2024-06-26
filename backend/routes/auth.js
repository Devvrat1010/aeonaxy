// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import User from "../models/users";

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const { Resend } = require('resend');


const router = express.Router();
const saltRounds = 10;

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

router.get("/getLoggedInUser", async (req, res) => {
    const token = req.get("Authorization")
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(200).json({ error: err, message: "Server Error" })
                return
            }
            else {
                const user = await User.findById(decodedToken.id)
                res.status(200).json({ user: user })
                return
            }
        })
        return
    }
    else {
        res.status(400).json({ error: "No Token Found" })
        return
    }
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        // console.log(user, "user")
        const authorize = bcrypt.compareSync(password, user.password);
        if (authorize) {
            const token = createToken(user._id);
            res.status(200).json({ user: user, token: token });
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } else {
        res.status(400).json({ error: "Invalid credentials" });
        return;
    }
});



const validate = async (data) => {
    const { username, email, password } = data
    if (!username || !email || !password) {
        return { message: "Please enter all the fields" }
    }
    if (username.length < 1 || email.length < 1 || password.length < 1) {
        return { message: "Please enter all the fields" }
    }
    if (password.length < 6) {
        return { message: "Password should be atleast 6 characters long" }
    }
    if (username.includes(" ")) {
        return { message: "Username should only contain alphabets and numbers and special characters like _ - ." }
    }
    if (email.includes(" ")) {
        return { message: "Invalid email address" }
    }
    return true
}

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUsername = username.toLowerCase();
        // console.log(username, "username")
        const existingUser = await User.find();
        const userExists = existingUser.some(user => user.username === newUsername || user.email === req.body.email);
        
        // console.log(userExists, "userExists")
        if (userExists) {
            return res.status(400).json({ error: "Username or email already exists" });
        }

        const validation = await validate(req.body);
        if (validation !== true) {
            return res.status(400).json({ error: validation.message || "Server side error" });
        }

        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const newUser = await User.create({
            username: newUsername,
            email: req.body.email,
            password: hash,
            fullName: req.body.fullName,
            emailVerified: false,
            profileCompleted: false
        });
        newUser.save();
        const token = createToken(newUser._id);
        return res.status(200).json({ token: token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/sendConfirmationEmail", async (req, res) => {
    const { email } = req.body;
    // console.log(email, "email")
    // console.log(process.env.SENDER_EMAIL, "process.env.SENDER_EMAIL")
    const { data, error } = await resend.emails.send({
        from: process.env.SENDER_EMAIL,
        to: [email],
        subject: 'Email Confirmation',
        html: `<strong>Click on the link to confirm your email address!</strong><br><a href="https://aeonaxy-8u8e.onrender.com/api/auth/confirmEmail?email=${email}">Click here to confirm your email address</a>`,
        // html: `<strong>Click on the link to confirm your email address!</strong><br><a href="http://localhost:5000/api/auth/confirmEmail?email=${email}">Click here to confirm your email address</a>`,
    });

    // if (error) {
        // return console.error({ error });
    // }
    // console.log({ data });
    res.status(200).json({ data: data });
});

router.get("/confirmEmail", async (req, res) => {
    try {

        const { email } = req.query;
        // console.log(email, "email")
        const user = await User.findOneAndUpdate(
            { email: email },
            { emailVerified: true }
        )
        res.status(200).redirect("https://aeonaxydev.netlify.app/confirmedEmail");
    }
    catch (err) {
        // console.log(err)
        res.status(500).json({ error: err.message });
    }

});

router.post("/changeEmailAddress", async (req, res) => {
    try{
        const { username, email } = req.body;
        if (!username || !email) {
            res.status(400).json({ error: "All fields are required" });
            return 
        }
        else{
            const user = await User.findOneAndUpdate(
                { username: username },
                { email: email, emailVerified: false }
            )
            if (!user) {
                res.status(400).json({ error: "User not found" });
                return
            }
            if (email == user.email){
                res.status(400).json({ error: "Email is same as the previous one" });
                return
            }
            // console.log(user, "image")
            res.status(200).json({ user:user, message: "Email changed successfully" });
        }
    }
    catch(err){
        // console.log(err)
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;