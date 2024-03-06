const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createUser = async (req, res) => {
  const { status, data } = await userService.insertUser(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createUser,
};