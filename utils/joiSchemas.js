const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHtml": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHtml: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHtml", { value });
        return clean;
      },
    },
  },
});
const Joi = baseJoi.extend(extension);

const campJoiSchema = Joi.object({
  title: Joi.string().required().escapeHtml(),
  location: Joi.string().required().escapeHtml(),
  price: Joi.number().required().min(1),
  campImage: Joi.object({
    url: Joi.string().escapeHtml(),
    filename: Joi.string().escapeHtml(),
  }),
  amenities: Joi.string().escapeHtml(),
  capacity: Joi.number().required().min(1),
  area: Joi.string().required().escapeHtml(),
  description: Joi.string().required().escapeHtml(),
  contact: Joi.string().required().escapeHtml(),
  website: Joi.string().escapeHtml(),
  "g-recaptcha-response": Joi.string().required().messages({
    "string.empty": "Complete Captcha to proceed!",
    "any.required": "Captcha is required",
  }),
}).required();

const reviewJoiSchema = Joi.object({
  content: Joi.string().required().min(5).escapeHtml(),
  rating: Joi.number().required().min(1),
  "g-recaptcha-response": Joi.string().required().messages({
    "string.empty": "Complete Captcha to proceed!",
    "any.required": "Captcha is required",
  }),
}).required();

const userJoiSchema = Joi.object({
  firstname: Joi.string().required().escapeHtml(),
  lastname: Joi.string().required().escapeHtml(),
  username: Joi.string().required().escapeHtml(),
  password: Joi.string().required().escapeHtml(),
  email: Joi.string().required().escapeHtml(),
  userImage: Joi.string().escapeHtml(),
  birthDate: Joi.date().required(),
  about: Joi.string().escapeHtml(),
  isAdmin: Joi.boolean(),
  "g-recaptcha-response": Joi.string().required().messages({
    "string.empty": "Complete Captcha to proceed!",
    "any.required": "Captcha is required",
  }),
}).required();

module.exports = { campJoiSchema, reviewJoiSchema, userJoiSchema };
