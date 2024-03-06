const { User } = require('../models');
const jwtUtils = require('../utils/jwt.util');
// const schema = require('./validations/validateProductInput');

const logIn = async (userDetails) => {
  const { email, password } = userDetails;
  if (!email || !password) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Some required fields are missing' },
    };
  }
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return {
      status: 'UNAUTHORIZED',
      data: { 
        message: 'Invalid fields',
      },
    };
  }

  // Caso exista, criar e devolver esse token
  const token = jwtUtils.createToken({ userId: user.id });

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  logIn,
};