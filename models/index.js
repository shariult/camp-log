const mongoose = require("mongoose");

const Camp = require("./Camp");
const Review = require("./Review");
const User = require("./User");

mongoose
  .connect(process.env.DBURL)
  .then(function () {
    console.log("Connection Successful!");
  })
  .catch(function (err) {
    console.log("Connection Failed!", err);
  });

module.exports = { Camp, Review, User };
