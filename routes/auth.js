const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getLogin, postLogin, getRegister, postRegister, logout } = require("../controllers/authController");
const { isLoggedIn } = require("../middlewares/authMiddleware");

// Login routes
router.route("/login").get(getLogin);
router.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  postLogin
);

// Register routes
router.route("/register").get(getRegister);
router.route("/register").post(postRegister);

// Logout route
router.route("/logout").get(isLoggedIn, logout);

module.exports = router;
