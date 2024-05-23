const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Review is required"],
      minlength: 5,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
