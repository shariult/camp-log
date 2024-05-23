const db = require("../models");

function getUserPage(req, res) {
  res.render("user");
}

async function postRegisterUser(req, res) {
  const {
    firstname,
    lastname,
    username,
    password,
    email,
    birthDate,
    userImage,
    about,
  } = req.body;
  const newUserData = new db.User({
    firstname,
    lastname,
    username,
    email,
    birthDate,
    userImage: userImage.length > 0 ? userImage : undefined,
    about,
  });
  const registerUser = await db.User.register(newUserData, password);
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
    req.flash("success", "Logout Successful!");
    res.redirect("/");
  });
}

module.exports = {
  getUserPage,
  postRegisterUser,
  postLoginUser,
  getLogoutUser,
};
