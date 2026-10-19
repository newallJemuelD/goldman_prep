const express = require("express");
const controller = require("../controllers/alertController");

const router = express.Router();

//Path inconsistency - fix6
router.get("/alerts", controller.getAlerts);

router.patch(
    "/alerts/:id/resolve",
    controller.resolveAlert
);

module.exports = router;