const express = require("express");
const app = express();

const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const dotenv = require("dotenv");

const User = require("./models/user");

const authRoutes = require("./routes/auth");
const billRoutes = require("./routes/bill");
const inventoryRoutes = require("./routes/inventory");
const statsRoutes = require("./routes/stats");
const generalRoutes = require("./routes/general");

dotenv.config({ path: "config/config.env" });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));


const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", generalRoutes);
app.use("/", authRoutes);
app.use("/", billRoutes);
app.use("/", inventoryRoutes);
app.use("/", statsRoutes);

module.exports = app;
