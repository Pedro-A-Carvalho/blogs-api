const { BlogPost, Category, User } = require('../models');
const schema = require('./validations/validatePostInput');

const insertPost = async (postDetails, userId) => {
  const error = schema.validatePost(postDetails);
  if (error) return { status: error.status, data: { message: error.message } };
  const { title, content, categoryIds } = postDetails;
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
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};
const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data: post };
};
const updatePost = async (id, postDetails, userId) => {
  const error = schema.validatePostUpdate(postDetails);
  if (error) return { status: error.status, data: { message: error.message } };
  const { title, content } = postDetails;
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } }; 
  }
  const updated = Date.now();
  await post.update({ title, content, updated });
  return { status: 'SUCCESSFUL', data: post };
};
module.exports = {
  insertPost,
  getAllPosts,
  getPostById,
  updatePost,
};