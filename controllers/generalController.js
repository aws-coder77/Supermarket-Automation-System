const User = require("../models/user");
// const catchAsyncError = require("../middlewares/catchAsyncError");

// Home page
exports.home = (req, res) => {
  res.render("home");
};

// Welcome page
exports.welcome = (req, res) => {
  res.render("welcome");
};

// Profile page
exports.profile = (req, res) => {
  res.render("profile");
};

// About page
exports.about = (req, res) => {
  res.render("about");
};

// Test route - create user
exports.makeUser = async (req, res, next) => {
  const user = new User({
    name: "staff",
    user_type: "Staff",
    username: "staff",
  });
  const newUser = await User.register(user, "staff");
  res.send(newUser);
};

// Test route - add item
exports.addItemTest = (req, res) => {
  res.send(res.locals.currentUser?.user_type || "Not logged in");
};
