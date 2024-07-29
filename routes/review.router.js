const express = require("express");
const router = express.Router({ mergeParams: true });

const { AsyncError } = require("../utils/errorHandler");
const authValidate = require("../middleware/authValidate");
const joiValidate = require("../middleware/joiValidate");

const {
  postReview,
  deleteReview,
} = require("../controllers/review.controller");

router
  .route("/")
  .post(
    authValidate.isLoggedIn,
    joiValidate.validateReview,
    AsyncError(postReview)
  );

router
  .route("/:reviewId")
  .delete(
    authValidate.isLoggedIn,
    authValidate.isReviewOwner,
    AsyncError(deleteReview)
  );

module.exports = router;
