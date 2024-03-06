const { userSchema } = require('./schemas');

const validateUser = (keysObjectToValidate) => {
  const { error } = userSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

module.exports = {
  validateUser,
};