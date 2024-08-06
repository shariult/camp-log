const baseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});
const Joi = baseJoi.extend(extension);

const campJoiSchema = Joi.object({
  title: Joi.string().required().escapeHTML(),
  location: Joi.string().required().escapeHTML(),
  price: Joi.number().required().min(1),
  campImage: Joi.object({
    url: Joi.string(),
    filename: Joi.string(),
  }),
  amenities: Joi.string().escapeHTML(),
  capacity: Joi.number().required().min(1),
  area: Joi.string().required().escapeHTML(),
  description: Joi.string().required().escapeHTML(),
  contact: Joi.string().required().escapeHTML(),
  website: Joi.string().escapeHTML(),
  "g-recaptcha-response": Joi.string().required().messages({
    "string.empty": "Complete Captcha to proceed!",
    "any.required": "Captcha is required",
  }),
}).required();

const reviewJoiSchema = Joi.object({
  content: Joi.string().required().min(5).escapeHTML(),
  rating: Joi.number().required().min(1),
  "g-recaptcha-response": Joi.string().required().messages({
    "string.empty": "Complete Captcha to proceed!",
    "any.required": "Captcha is required",
  }),
}).required();

const userJoiSchema = Joi.object({
  firstname: Joi.string().required().escapeHTML(),
  lastname: Joi.string().required().escapeHTML(),
  username: Joi.string().required().escapeHTML(),
  password: Joi.string().required().escapeHTML(),
  email: Joi.string().required().escapeHTML(),
  userImage: Joi.string().escapeHTML(),
  birthDate: Joi.date().required(),
  about: Joi.string().escapeHTML(),
  isAdmin: Joi.boolean(),
  "g-recaptcha-response": Joi.string().required().messages({
    "string.empty": "Complete Captcha to proceed!",
    "any.required": "Captcha is required",
  }),
}).required();

module.exports = { campJoiSchema, reviewJoiSchema, userJoiSchema };
