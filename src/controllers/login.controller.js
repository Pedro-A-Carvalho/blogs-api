const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const logIn = async (req, res) => {
  const { status, data } = await userService.logIn(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  logIn,
};