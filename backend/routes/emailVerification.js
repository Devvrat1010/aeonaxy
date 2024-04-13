const router = require("express").Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

router.post("/sendConfirmationEmail", async (req, res) => {
    const { email } = req.body;
    const mailjet = require('node-mailjet').connect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE
    )
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: process.env.MJ_SENDER_EMAIL,
                    Name: 'Devvrat',
                },
                To: [
                    {
                        Email: email,
                        Name: 'You',
                    },
                ],
                Subject: 'My first Mailjet Email!',
                TextPart: 'Greetings from Mailjet!',
                HTMLPart:
                    '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body)
        })
        .catch(err => {
            console.log(err.statusCode)
        })
});

module.exports = router;