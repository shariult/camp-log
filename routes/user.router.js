const express = require("express");
const router = express.Router();
const passport = require("passport");

const { AsyncError } = require("../utils/errorHandler");
const joiValidate = require("../middleware/joiValidate");
const userController = require("../controllers/user.controller");

router.route("/user").get(userController.getUserPage);

router
  .route("/register")
  .post(joiValidate.validateUser, AsyncError(userController.postRegisterUser));

router.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user",
  }),
  userController.postLoginUser
);

router.route("/logout").get(userController.getLogoutUser);

module.exports = router;
