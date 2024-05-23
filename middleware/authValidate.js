const db = require("../models");

function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash("error", "Log in first!");
    return res.redirect("/user");
  }
  next();
}

async function isCampOwner(req, res, next) {
  const { campId } = req.params;
  const campData = await db.Camp.findById(campId);
  if (!campData.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission!");
    return res.redirect("/camps/" + req.params.campId);
  }
  next();
}

async function isReviewOwner(req, res, next) {
  const { reviewId } = req.params;
  const reviewData = await db.Review.findById(reviewId);
  if (!reviewData.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission!");
    return res.redirect("/camps/" + req.params.campId);
  }
  next();
}

module.exports = {
  isLoggedIn,
  isCampOwner,
  isReviewOwner,
};
