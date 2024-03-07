const jwtUtil = require('../utils/jwt.util');
const { User } = require('../models');

const verifyTokenMiddleware = async (req, res, next) => {
  // Verificar se o token foi enviado
  console.log(req.headers);
  const { authorization } = req.headers;

  console.log(`bearerToken: ${authorization}`);
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  // Verificar se o token é válido
  try {
    const token = authorization.split(' ')[1];
    console.log(`token: ${token}`);
    const payload = jwtUtil.verifyToken(token);
    const user = await User.findByPk(payload.userId);
    req.user = user.dataValues;

    // Caso seja válido chamar o próximo middleware
    next();
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  verifyTokenMiddleware,
};