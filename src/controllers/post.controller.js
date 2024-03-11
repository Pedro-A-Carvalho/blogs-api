const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createPost = async (req, res) => {
  const { status, data } = await postService.insertPost(req.body, req.user.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const getAllPosts = async (req, res) => {
  const { status, data } = await postService.getAllPosts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getPostById = async (req, res) => {
  const { status, data } = await postService.getPostById(req.params.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updatePost = async (req, res) => {
  const { status, data } = await postService.updatePost(req.params.id, req.body, req.user.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};