import * as accessCodeController from "../controllers/accessCodeController.js";
import * as jwtMiddleware from "../controllers/jwtMiddleware.js";
import express from "express";
const accessCodeRouter = express.Router();

accessCodeRouter.get('/get_school_id/:school_id', accessCodeController.getSchoolID);
accessCodeRouter.get('/get_access_codes', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, accessCodeController.getAccessCodes);
accessCodeRouter.post('/search_access_code', accessCodeController.searchAccessCode);
accessCodeRouter.post('/create_access_code', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, accessCodeController.createAccessCode);

export default accessCodeRouter;