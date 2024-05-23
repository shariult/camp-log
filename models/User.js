const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required!"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required!"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
    },
    password: String,
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    userImage: {
      type: String,
      default: `/img/user-${Math.ceil(Math.random() * 15)}.jpg`,
    },
    birthDate: {
      type: Date,
      required: [true, "Birth Date is required!"],
    },
    about: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
