const categoryRouter = require('express').Router();
const { categoryController } = require('../controllers');
const { verifyTokenMiddleware } = require('../middlewares/auth.middleware');

categoryRouter.post('/', verifyTokenMiddleware, categoryController.createCategory);
categoryRouter.get('/', verifyTokenMiddleware, categoryController.getAllCategories);

module.exports = categoryRouter;