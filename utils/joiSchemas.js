const Joi = require("joi");

const campJoiSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().required().min(1),
  campImage: Joi.object({
    url: Joi.string(),
    filename: Joi.string(),
  }),
  amenities: Joi.string(),
  capacity: Joi.number().required().min(1),
  area: Joi.string().required(),
  description: Joi.string().required(),
  contact: Joi.string().required(),
  website: Joi.string(),
}).required();

const reviewJoiSchema = Joi.object({
  content: Joi.string().required().min(5),
  rating: Joi.number().required().min(1),
}).required();

const userJoiSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  userImage: Joi.string(),
  birthDate: Joi.date().required(),
  about: Joi.string(),
  isAdmin: Joi.boolean(),
}).required();

module.exports = { campJoiSchema, reviewJoiSchema, userJoiSchema };
