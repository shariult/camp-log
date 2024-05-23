const db = require("../models");

async function postReview(req, res) {
  const { campId } = req.params;
  const { content, rating } = req.body;
  const newReviewData = {
    content,
    rating,
    owner: req.user,
  };
  const reviewData = await db.Review.create(newReviewData);
  const campData = await db.Camp.findById(campId);
  campData.reviews.push(reviewData);
  await campData.save();
  req.flash("success", "Thanks for Your Review!");
  res.redirect("/camps/" + campId);
}

async function deleteReview(req, res) {
  const { campId, reviewId } = req.params;
  const reviewDeleted = await db.Review.findByIdAndDelete(reviewId);
  const campUpdateData = await db.Camp.findByIdAndUpdate(
    campId,
    { $pull: { reviews: reviewDeleted._id } },
    { new: true, runValidators: true }
  );
  req.flash("success", "Review Removed Successfully!");
  res.redirect("/camps/" + campUpdateData._id);
}

module.exports = { postReview, deleteReview };
