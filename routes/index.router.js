const express = require("express");
const router = express.Router();

const { AsyncError } = require("../utils/index.utils");

const {
  getHomepage,
  getAboutPage,
  getContactPage,
} = require("../controllers/index.controller");

router.route("/").get(AsyncError(getHomepage));
router.route("/about").get(AsyncError(getAboutPage));
router.route("/contact").get(AsyncError(getContactPage));

module.exports = router;
