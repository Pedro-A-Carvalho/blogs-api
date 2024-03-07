const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  const { status, data } = await categoryService.insertCategory(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllCategories = async (req, res) => {
  const { status, data } = await categoryService.getAllCategories();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};