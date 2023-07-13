import * as dummyController from "../controllers/dummyController.js";
import express from "express";
const dummyRouter = express.Router();

// Profile
dummyRouter.get('/get_profile/:id', dummyController.getProfile);
dummyRouter.get('/get_mind_clusters/:id', dummyController.getMindClusters);
dummyRouter.get('/get_careers', dummyController.getCareerList);
dummyRouter.get('/get_career/:name', dummyController.getCareer);

export default dummyRouter;