const { Category } = require('../models');
const schema = require('./validations/validateCategoryInput');

const insertCategory = async (categoryDetails) => {
  const error = schema.validateCategory(categoryDetails);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const { name } = categoryDetails;
  
  const newCategory = await Category.create({ name });
  
  return { status: 'CREATED', data: newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  insertCategory,
  getAllCategories,
};