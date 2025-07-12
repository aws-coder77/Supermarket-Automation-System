const express = require("express");
const router = express.Router();
const { getStats, filterStats } = require("../controllers/statsController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.route("/stat").get(isLoggedIn, getStats);
router.route("/stat").post(isLoggedIn, filterStats);

module.exports = router;
