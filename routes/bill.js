const express = require("express");
const router = express.Router();
const { getBill, createBill, printBill } = require("../controllers/billController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.route("/bill").get(isLoggedIn, getBill);
router.route("/bill").post(isLoggedIn, createBill);
router.route("/print").get(printBill);

module.exports = router;
