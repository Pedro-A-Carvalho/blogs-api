const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const createToken = (payload) => {
  console.log(SECRET);
  const token = jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, SECRET);
  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};