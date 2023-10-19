import * as paymentController from "../controllers/paymentController.js";

import express from "express";


const paymentRouter = express.Router();






paymentRouter.get('/create', paymentController.createPayment);
paymentRouter.get('/success', paymentController.successPayment);

paymentRouter.get('/cancel', paymentController.cancelPayment);





 


export default paymentRouter;