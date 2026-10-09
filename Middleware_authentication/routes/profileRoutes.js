const express = require("express");
const router = express.Router();

const validateApiKey = require("../middleware/validateApiKey");

router.get("/profile", validateApiKey, (req, res) => {
    return res.status(200).json({
        message: "Profile accessed"
    });
});

module.exports = router;