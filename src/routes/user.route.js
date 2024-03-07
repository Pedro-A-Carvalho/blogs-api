const userRouter = require('express').Router();
const { userController } = require('../controllers');
const { verifyTokenMiddleware } = require('../middlewares/auth.middleware');

userRouter.get('/', verifyTokenMiddleware, userController.getAllUsers);
userRouter.post('/', userController.createUser);

module.exports = userRouter;