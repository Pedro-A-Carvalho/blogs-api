const { User } = require('../models');
const jwtUtils = require('../utils/jwt.util');
const schema = require('./validations/validateUserInput');

const logIn = async (userDetails) => {
  const { email, password } = userDetails;
  if (!email || !password) {
    return {
      status: 'BAD_REQUEST',
      data: { message: 'Some required fields are missing' },
    };
  }
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return {
      status: 'BAD_REQUEST',
      data: { 
        message: 'Invalid fields',
      },
    };
  }

  // Caso exista, criar e devolver esse token
  const token = jwtUtils.createToken({ userId: user.id });

  return { status: 'SUCCESSFUL', data: { token } };
};

const insertUser = async (userDetails) => {
  const error = schema.validateUser(userDetails);
  if (error) return { status: error.status, data: { message: error.message } };

  const { email, password, displayName, image = '' } = userDetails;

  const user = await User.findOne({ where: { email } });
  if (user) {
    return {
      status: 'CONFLICT',
      data: { message: 'User already registered' },
    };
  }

  const newUser = await User.create({ email, password, displayName, image });

  const token = jwtUtils.createToken({ userId: newUser.id });

  return { status: 'CREATED', data: { token } };
};

module.exports = {
  logIn,
  insertUser,
};