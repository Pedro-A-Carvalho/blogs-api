const { postSchema } = require('./schemas');

const validatePost = (keysObjectToValidate) => {
  const { error } = postSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: 'Some required fields are missing' };
};

module.exports = {
  validatePost,
};