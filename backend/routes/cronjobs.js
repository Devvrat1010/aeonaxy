const router = require("express").Router();

router.get("/getResponse", async (req, res) => {
    res.status(200).json({ message: "Cron job is running" });
});

module.exports = router;