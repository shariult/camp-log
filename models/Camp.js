const mongoose = require("mongoose");

const campSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Camp title is required!"],
      unique: [true, "Camp already exists"],
    },
    location: {
      type: String,
      required: [true, "Camp location is required!"],
    },
    price: {
      type: Number,
      required: [true, "Camp price is required!"],
      min: 1,
    },
    campImage: {
      url: String,
      filename: String,
    },
    amenities: [String],
    capacity: {
      type: Number,
      required: [true, "Camp capacity is required!"],
      min: 1,
    },
    area: {
      type: String,
      required: [true, "Camp area size is required!"],
    },
    description: {
      type: String,
      required: [true, "Camp description is required!"],
    },
    contact: {
      type: String,
      required: [true, "Camp contact email is required!"],
    },
    website: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

campSchema.virtual("averageRating").get(function () {
  if (this.reviews.length === 0) return 0;

  let sum = 0;
  this.reviews.forEach((review) => {
    sum += review.rating;
  });

  return sum / this.reviews.length;
});

// Ensure virtual fields are serialized
campSchema.set("toJSON", { virtuals: true });
campSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Camp", campSchema);
