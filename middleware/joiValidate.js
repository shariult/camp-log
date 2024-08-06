const joiSchemas = require("../utils/joiSchemas");
const errorHandler = require("../utils/errorHandler");
const { cloudinary } = require("../utils/cloudinaryConfig");

function validateCamp(req, res, next) {
  const validate = joiSchemas.campJoiSchema.validate(req.body);
  if (validate.error) {
    const message = validate.error.details.map((err) => err.message).join(",");
    if (req.method === "POST") {
      cloudinary.uploader.destroy(req.file.filename);
    }
    throw new errorHandler.ExpressError(message, 400);
  } else {
    next();
  }
}

function validateReview(req, res, next) {
  const validate = joiSchemas.reviewJoiSchema.validate(req.body);
  if (validate.error) {
    const message = validate.error.details.map((err) => err.message).join(",");
    throw new errorHandler.ExpressError(message, 400);
  } else {
    next();
  }
}

function validateUser(req, res, next) {
  const validate = joiSchemas.userJoiSchema.validate(req.body);
  if (validate.error) {
    const message = validate.error.details.map((err) => err.message).join(",");
    throw new errorHandler.ExpressError(message, 400);
  } else {
    next();
  }
}

module.exports = { validateCamp, validateReview, validateUser };
