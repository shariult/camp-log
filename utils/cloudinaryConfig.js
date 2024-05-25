const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "CampLog",
    allowedFormats: ["jpg", "png", "webp"],
    // format: async (req, file) => "png",
    // public_id: (req, file) => "computed-filename-using-request"
  },
});
module.exports = { cloudinary, storage };
