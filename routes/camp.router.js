const express = require("express");
const router = express.Router();

const { AsyncError } = require("../utils/index.utils");
const middleware = require("../middleware/index.middleware");

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
  .get(AsyncError(getCamps))
  .post(middleware.isLoggedIn, AsyncError(postCamp));

router.route("/new").get(middleware.isLoggedIn, getCampPostForm);

router
  .route("/:campId")
  .get(AsyncError(getCamp))
  .put(middleware.isLoggedIn, middleware.isCampOwner, AsyncError(putCamp))
  .delete(
    middleware.isLoggedIn,
    middleware.isCampOwner,
    AsyncError(deleteCamp)
  );

router
  .route("/:campId/edit")
  .get(
    middleware.isLoggedIn,
    middleware.isCampOwner,
    AsyncError(getCampUpdateForm)
  );

module.exports = router;
