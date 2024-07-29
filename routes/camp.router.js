const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinaryConfig");
const upload = multer({ storage: storage });

const { AsyncError } = require("../utils/errorHandler");
const authValidate = require("../middleware/authValidate");
const joiValidate = require("../middleware/joiValidate");

const {
  getCamps,
  getCampPostForm,
  postCamp,
  getCamp,
  getCampEditForm,
  putCamp,
  deleteCamp,
} = require("../controllers/camp.controller");

router
  .route("/")
  .get(AsyncError(getCamps))
  .post(
    authValidate.isLoggedIn,
    upload.single("campImage"),
    joiValidate.validateCamp,
    AsyncError(postCamp)
  );

router.route("/new").get(authValidate.isLoggedIn, getCampPostForm);

router
  .route("/:campId")
  .get(AsyncError(getCamp))
  .put(
    authValidate.isLoggedIn,
    authValidate.isCampOwner,
    upload.single("campImage"),
    joiValidate.validateCamp,
    AsyncError(putCamp)
  )
  .delete(
    authValidate.isLoggedIn,
    authValidate.isCampOwner,
    AsyncError(deleteCamp)
  );

router
  .route("/:campId/edit")
  .get(
    authValidate.isLoggedIn,
    authValidate.isCampOwner,
    AsyncError(getCampEditForm)
  );

module.exports = router;
