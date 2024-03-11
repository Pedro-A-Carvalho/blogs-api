const { postSchema, postUpdateSchema } = require('./schemas');

const validatePost = (keysObjectToValidate) => {
  const { error } = postSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: 'Some required fields are missing' };
};

const validatePostUpdate = (keysObjectToValidate) => {
  const { error } = postUpdateSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: 'Some required fields are missing' };
};

module.exports = {
  validatePost,
  validatePostUpdate,
};