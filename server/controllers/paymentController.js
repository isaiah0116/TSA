
import paypal from "paypal-rest-sdk";

import User from "../models/userModel.js";


paypal.configure({
  mode: "live", //sandbox or live
  client_id: process.env.paypalClientID,
  client_secret:  process.env.paypalClientSecret,
});



export const createPayment = async (req, res) => {




    let {currency} = req.query

    let amount = 20


    let payment = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT   + '/api/payment/success',
          cancel_url: process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/payment/cancel',

        },
    
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "Subscription Payment",
                  sku: "item",
                  price: +amount,
                  currency: currency,
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: currency,
              total: +amount,
            },
            description: `This payment is for subscription done by user`,
          },
        ],
      };

      console.log("links",payment.redirect_urls)
    
      paypal.payment.create(payment, function (error, payment) {
        if (error) {
          console.log(error.response)
				return res.status(400).json(error);
        } else {
          return res.redirect(payment.links[1].href);
        }
      });


}


export const successPayment = async (req, res) => {

    let paymentId = req.query.paymentId;
    let payerId = { payer_id: req.query.PayerID };
  
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
      if (error) {

        return res.status(400).json(error);
    
      } else {

  

        return res.redirect(process.env.REACT_APP_S_HOST + '/register?payment=paid');
           
      }
    });



}

export const cancelPayment = (req, res) => {

return res.redirect(process.env.REACT_APP_S_HOST + '/register?payment=unpaid');

      }


    









