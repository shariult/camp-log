const db = require("../models");

function getUserPage(req, res) {
  res.render("user");
}

async function postRegisterUser(req, res) {
  const newUserData = new db.User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    birthDate: req.body.birthDate,
    userImage: req.body.userImage.length > 0 ? req.body.userImage : undefined,
    about: req.body.about,
  });
  const registerUser = await db.User.register(newUserData, req.body.password);
  req.login(registerUser, function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Registration Successful!");
    res.redirect("/");
  });
}

function postLoginUser(req, res) {
  req.flash("success", `Welcome, ${req.user.username} to Camp Log!`);
  res.redirect("/");
}

function getLogoutUser(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/");
  });
}

module.exports = {
  getUserPage,
  postRegisterUser,
  postLoginUser,
  getLogoutUser,
};
