const { BlogPost, Category, User } = require('../models');
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

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },

    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  insertPost,
  getAllPosts,
};