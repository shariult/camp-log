const db = require("../models");
const { cloudinary } = require("../utils/cloudinaryConfig");

async function getCamps(req, res) {
  const campsData = await db.Camp.find({});
  res.render("camps", { campsData, currentPage: "allCamps" });
}

function getCampPostForm(req, res) {
  res.render("camps/new", { currentPage: "newCamp" });
}

async function postCamp(req, res) {
  const newCampData = {
    title: req.body.title,
    location: req.body.location,
    price: req.body.price,
    campImage: {
      url: req.file.path,
      filename: req.file.filename,
    },
    amenities: req.body.amenities.split(","),
    capacity: req.body.capacity,
    area: req.body.area,
    description: req.body.description,
    contact: req.body.contact,
    website: req.body.website,
    owner: req.user,
  };
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

async function getCampEditForm(req, res) {
  const { campId } = req.params;
  const campData = await db.Camp.findById(campId);
  res.render("camps/edit", { campData });
}

async function putCamp(req, res) {
  const { campId } = req.params;
  const currentCampData = await db.Camp.findById(campId);
  const editCampData = {
    title: req.body.title,
    location: req.body.location,
    price: req.body.price,
    campImage: {
      url: req.file ? req.file.path : currentCampData.campImage.url,
      filename: req.file
        ? req.file.filename
        : currentCampData.campImage.filename,
    },
    amenities: req.body.amenities.split(","),
    capacity: req.body.capacity,
    area: req.body.area,
    description: req.body.description,
    contact: req.body.contact,
    website: req.body.website,
    owner: req.user,
  };
  if (req.file) {
    await cloudinary.uploader.destroy(currentCampData.campImage.filename);
  }
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
  const imageDeleted = await cloudinary.uploader.destroy(
    campDeleted.campImage.filename
  );
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
  getCampEditForm,
  putCamp,
  deleteCamp,
};
