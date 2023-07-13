import * as userController from "../controllers/userController.js";
import * as jwtMiddleware from "../controllers/jwtMiddleware.js";
import express from "express";
const userRouter = express.Router();

// user regristration and stuff
userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/update_self', jwtMiddleware.loginRequired, userController.updateSelf);
userRouter.delete('/delete_self', jwtMiddleware.loginRequired, userController.deleteSelf);
userRouter.post('/admin_update_user/:user', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, userController.adminUpdate);
userRouter.delete('/admin_delete_user/:user', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, userController.adminDelete);

// Public Profile
userRouter.get('/get_users', userController.getUserList);
userRouter.get('/search_users/:search', userController.searchUsers);
userRouter.get('/get_user/:id', userController.getUserViaID);

// Private Profile
userRouter.get('/get_self_profile', jwtMiddleware.loginRequired, userController.getSelfProfile);
userRouter.get('/get_self_mindmap', jwtMiddleware.loginRequired, userController.getMindClusters);


export default userRouter;