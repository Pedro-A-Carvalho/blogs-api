const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createUser = async (req, res) => {
  const { status, data } = await userService.insertUser(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllUsers = async (_req, res) => {
  const { status, data } = await userService.getAllUsers();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createUser,
  getAllUsers,
};