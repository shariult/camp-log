if (process.env.NODE_ENV === "dev") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 3000;

// Imports //
const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Custom Imports //
const { ExpressError } = require("./utils/errorHandler");
const db = require("./models");
const indexRoutes = require("./routes/index.router");
const campRoutes = require("./routes/camp.router");
const reviewRoutes = require("./routes/review.router");
const userRoutes = require("./routes/user.router");

// Configuration //
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use(helmet({ contentSecurityPolicy: false }));

const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
if (process.env.NODE_ENV !== "dev") {
  sessionConfig.cookie.secure = true;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.currentPage = "none";
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

// Routes //
app.use("/", indexRoutes);
app.use("/", userRoutes);
app.use("/camps", campRoutes);
app.use("/camps/:campId/reviews", reviewRoutes);

// Error Handling //
app.all("*", function (req, res) {
  throw new ExpressError("Page not found!", 404);
});

app.use(function (err, req, res, next) {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.render("error", { statusCode, message, errStack: err.stack });
});

// Server //
app.listen(PORT, function () {
  console.log("Server Running at Port: " + PORT);
});
