import * as userStoryController from "../controllers/userStoryController.js";
import * as jwtMiddleware from "../controllers/jwtMiddleware.js";
import express from "express";
const userStoryRouter = express.Router();

userStoryRouter.get('/', jwtMiddleware.loginOptional, userStoryController.getUserStories);
userStoryRouter.post('/add', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, userStoryController.addUserStory);
userStoryRouter.delete('/:id', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, userStoryController.deleteUserStory);

export default userStoryRouter;