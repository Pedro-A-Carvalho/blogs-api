const { BlogPost, Category } = require('../models');
const schema = require('./validations/validatePostInput');

const insertPost = async (postDetails, userId) => {
  const error = schema.validatePost(postDetails);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const { title, content, categoryIds } = postDetails;

  //   const categories = categoryIds.map((id) => Category.findByPk(id));
  //   await Promise.all(categories);
  const categories = await Promise.all(categoryIds.map((id) => Category.findByPk(id)));
  if (categories.some((category) => category === null)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  const updated = Date.now();
  const published = Date.now();
  
  const newPost = await BlogPost.create({ title, content, userId, updated, published });
  await newPost.addCategories(categories);
  
  return { status: 'CREATED', data: newPost };
};

const getAllCategories = async () => {
  const categories = await BlogPost.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  insertPost,
  getAllCategories,
};