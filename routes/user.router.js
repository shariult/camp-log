const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");
const errorHandler = require("../utils/errorHandler");
const joiValidate = require("../middleware/joiValidate");

router.route("/user").get(userController.getUserPage);
router
  .route("/register")
  .post(
    joiValidate.validateUser,
    errorHandler.AsyncError(userController.postRegisterUser)
  );
router.route("/login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user",
  }),
  userController.postLoginUser
);
router.route("/logout").get(userController.getLogoutUser);
module.exports = router;
