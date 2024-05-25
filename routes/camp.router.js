const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinaryConfig");
const upload = multer({ storage: storage });

const errorHandler = require("../utils/errorHandler");
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
  .get(errorHandler.AsyncError(getCamps))
  .post(
    authValidate.isLoggedIn,
    upload.single("campImage"),
    joiValidate.validateCamp,
    errorHandler.AsyncError(postCamp)
  );

router.route("/new").get(authValidate.isLoggedIn, getCampPostForm);

router
  .route("/:campId")
  .get(errorHandler.AsyncError(getCamp))
  .put(
    authValidate.isLoggedIn,
    authValidate.isCampOwner,
    upload.single("campImage"),
    joiValidate.validateCamp,
    errorHandler.AsyncError(putCamp)
  )
  .delete(
    authValidate.isLoggedIn,
    authValidate.isCampOwner,
    errorHandler.AsyncError(deleteCamp)
  );

router
  .route("/:campId/edit")
  .get(
    authValidate.isLoggedIn,
    authValidate.isCampOwner,
    errorHandler.AsyncError(getCampEditForm)
  );

module.exports = router;
