const express = require("express");
const router = express.Router({ mergeParams: true });

const { AsyncError } = require("../utils/index.utils");
const middleware = require("../middleware/index.middleware");

const {
  postReview,
  deleteReview,
} = require("../controllers/review.controller");

router.route("/").post(middleware.isLoggedIn, AsyncError(postReview));

router
  .route("/:reviewId")
  .delete(
    middleware.isLoggedIn,
    middleware.isReviewOwner,
    AsyncError(deleteReview)
  );

module.exports = router;
