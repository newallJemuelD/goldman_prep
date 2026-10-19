const express = require("express");
const router = express.Router();

const controller = require("../controllers/transferController");

router.post("/transfers", controller.createTransfer);

// BUG: route may be incorrect - fix9
router.get("/transfers/:id", controller.getTransfer);

module.exports = router;