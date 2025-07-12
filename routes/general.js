const express = require("express");
const router = express.Router();
const { home, welcome, profile, about, makeUser, addItemTest } = require("../controllers/generalController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.route("/").get(home);
router.route("/welcome").get(isLoggedIn, welcome);
router.route("/profile").get(isLoggedIn, profile);
router.route("/about").get(isLoggedIn, about);

// Test routes
router.route("/makeuser").get(makeUser);
router.route("/additem").get(addItemTest);

module.exports = router;
