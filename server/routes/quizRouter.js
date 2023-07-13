import * as quizController from "../controllers/quizController.js";
import * as savedQuizController from "../controllers/savedQuizController.js";
import * as jwtMiddleware from "../controllers/jwtMiddleware.js";
import express from "express";
const quizRouter = express.Router();

// quiz routes
quizRouter.get('/get_quizzes', jwtMiddleware.loginOptional, quizController.getQuizList);
quizRouter.get('/get_quiz/:id', jwtMiddleware.loginOptional, quizController.getQuiz);

// admin routes
quizRouter.post('/create_quiz', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, quizController.createQuiz);
quizRouter.post('/update_quiz/:id', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, quizController.updateQuiz);
quizRouter.delete('/delete_quiz/:id', jwtMiddleware.loginRequired, jwtMiddleware.adminRequired, quizController.deleteQuiz);

// quiz progress routes
quizRouter.get('/get_saved_quizzes', jwtMiddleware.loginRequired, savedQuizController.getSavedQuizList);
quizRouter.get('/get_saved_quiz/:id', jwtMiddleware.loginRequired, savedQuizController.getSavedQuiz);
quizRouter.post('/create_saved_quiz', jwtMiddleware.loginRequired, savedQuizController.createSavedQuiz);
quizRouter.post('/update_saved_quiz', jwtMiddleware.loginRequired, savedQuizController.updateSavedQuiz);
quizRouter.delete('/delete_saved_quiz/:id', jwtMiddleware.loginRequired, savedQuizController.deleteSavedQuiz);

export default quizRouter;