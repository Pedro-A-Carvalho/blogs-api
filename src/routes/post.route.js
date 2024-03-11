const postRouter = require('express').Router();
const { postController } = require('../controllers');
const { verifyTokenMiddleware } = require('../middlewares/auth.middleware');

postRouter.post('/', verifyTokenMiddleware, postController.createPost);
postRouter.get('/', verifyTokenMiddleware, postController.getAllPosts);
postRouter.get('/:id', verifyTokenMiddleware, postController.getPostById);
postRouter.put('/:id', verifyTokenMiddleware, postController.updatePost);

module.exports = postRouter;