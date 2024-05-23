const express = require("express");
const router = express.Router();

const errorHandler = require("../utils/errorHandler");
const authValidate = require("../middleware/authValidate");
const joiValidate = require("../middleware/joiValidate");

const {
  getCamps,
  getCampPostForm,
  postCamp,
  getCamp,
  getCampUpdateForm,
  putCamp,
  deleteCamp,
} = require("../controllers/camp.controller");

router
  .route("/")
  .get(errorHandler.AsyncError(getCamps))
  .post(
    authValidate.isLoggedIn,
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
    errorHandler.AsyncError(getCampUpdateForm)
  );

module.exports = router;
