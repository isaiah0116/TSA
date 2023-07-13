import * as careerController from "../controllers/careerController.js";
import * as jwtMiddleware from "../controllers/jwtMiddleware.js";
import express from "express";
const careerRouter = express.Router();

// Careers
careerRouter.get('/get_careers', jwtMiddleware.loginOptional, careerController.getCareerList);
careerRouter.get('/get_careers_via_pathways/:pathway', jwtMiddleware.loginOptional, careerController.getCareerViaPathway);
careerRouter.get('/get_career/:id', jwtMiddleware.loginOptional, careerController.getCareer);
careerRouter.post('/create_career', jwtMiddleware.loginRequired, /*jwtMiddleware.adminRequired,*/ careerController.createCareer);
careerRouter.post('/update_career/:id', jwtMiddleware.loginRequired, /*jwtMiddleware.adminRequired,*/ careerController.updateCareer);
careerRouter.delete('/delete_career/:id', jwtMiddleware.loginRequired, /*jwtMiddleware.adminRequired,*/ careerController.deleteCareer);

// User Actions
careerRouter.get('/like_career/:id/:liked', jwtMiddleware.loginRequired, careerController.likeCareer);
careerRouter.get('/get_liked_careers', jwtMiddleware.loginRequired, careerController.getLikedCareers);

export default careerRouter;