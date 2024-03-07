const { categorySchema } = require('./schemas');

const validateCategory = (keysObjectToValidate) => {
  const { error } = categorySchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

module.exports = {
  validateCategory,
};