const db = require("../models");

async function getHomepage(req, res) {
  const campsData = await db.Camp.find({}).sort({ createdAt: -1 }).limit(4);
  res.render("index", { campsData });
}

async function getAboutPage(req, res) {
  res.render("about", { currentPage: "about" });
}

async function getContactPage(req, res) {
  res.render("contact", { currentPage: "contact" });
}

module.exports = { getHomepage, getAboutPage, getContactPage };
