const db = require("../models");

async function getCamps(req, res) {
  const campsData = await db.Camp.find({});
  res.render("camps", { campsData, currentPage: "allCamps" });
}

function getCampPostForm(req, res) {
  res.render("camps/new", { currentPage: "newCamp" });
}

async function postCamp(req, res) {
  const {
    title,
    location,
    price,
    campImage,
    amenities,
    capacity,
    area,
    description,
    contact,
    website,
  } = req.body;
  const newCampData = {
    title,
    location,
    price,
    campImage: campImage.length > 0 ? campImage : undefined,
    amenities: amenities.split(","),
    capacity,
    area,
    description,
    contact,
    website,
    owner: req.user,
  };
  console.log(newCampData);
  const campData = await db.Camp.create(newCampData);
  req.flash("success", "Camp Created Successfully!");
  res.redirect("/camps/" + campData._id);
}

async function getCamp(req, res) {
  const { campId } = req.params;
  const campData = await db.Camp.findById(campId)
    .populate({
      path: "reviews",
      populate: {
        path: "owner",
        select: "firstname lastname userImage",
      },
    })
    .populate("owner");

  res.render("camps/show", { campData });
}

async function getCampUpdateForm(req, res) {
  const { campId } = req.params;
  const campData = await db.Camp.findById(campId);
  res.render("camps/edit", { campData });
}

async function putCamp(req, res) {
  const { campId } = req.params;
  const {
    title,
    location,
    price,
    campImage,
    amenities,
    capacity,
    area,
    description,
    contact,
    website,
  } = req.body;
  const editCampData = {
    title,
    location,
    price,
    campImage,
    amenities: amenities.split(","),
    capacity,
    area,
    description,
    contact,
    website,
  };
  const campData = await db.Camp.findByIdAndUpdate(campId, editCampData, {
    new: true,
    runValidators: true,
  });
  req.flash("success", "Camp Updated Successfully!");
  res.redirect("/camps/" + campData._id);
}

async function deleteCamp(req, res) {
  const { campId } = req.params;
  const campDeleted = await db.Camp.findByIdAndDelete(campId);
  const reviewsDeleted = await db.Review.deleteMany({
    _id: { $in: campDeleted.reviews },
  });
  req.flash("success", "Camp Deleted Successfully!");
  res.redirect("/camps");
}

module.exports = {
  getCamps,
  getCampPostForm,
  postCamp,
  getCamp,
  getCampUpdateForm,
  putCamp,
  deleteCamp,
};
