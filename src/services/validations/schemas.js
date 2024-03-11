const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.any(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  userSchema,
  categorySchema,
  postSchema,
  postUpdateSchema,
};