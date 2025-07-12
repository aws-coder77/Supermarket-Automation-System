const User = require("../models/user");

// Get login page
exports.getLogin = (req, res) => {
  res.render("login");
};

// Handle login
exports.postLogin = async (req, res, next) => {
  req.flash("success", "Welcome back!");
  res.redirect("/welcome");
};

// Get register page
exports.getRegister = (req, res) => {
  res.render("register");
};

// Handle registration
exports.postRegister = async (req, res, next) => {
  const { name, username, user_type, password } = req.body;
  const joining_date = Date.now();
  const user = new User({ name, user_type, joining_date, username });
  const newUser = await User.register(user, password);

  req.login(newUser, (err) => {
    if (err) return next(err);
    req.flash("success", "Welcome new user!");
    res.redirect("/welcome");
  });
};

// Handle logout
exports.logout = async (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/auth/login");
  });
};
