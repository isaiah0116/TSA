// dependencies
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose'; // api for mongoDB
import * as jose from 'jose';
import {} from 'dotenv/config';

//import config from './config.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// routes
import clusterRouter from './server/routes/clusterRouter.js';
import dummyRouter from './server/routes/dummyRouter.js';
import userRouter from './server/routes/userRouter.js';
import quizRouter from './server/routes/quizRouter.js';
import careerRouter from './server/routes/careerRouter.js';
import accessCodeRouter from './server/routes/accessCodeRouter.js';

// heroku shenanigans
//require("dotenv").config();
//const p = require("path");


// init app
const app = express();


// connect to database
let connection
connection = mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log(`Successfully connected to mongoose database.`)
});
app.locals.connection = connection;

// generate a secret key
const { publicKey, privateKey } = await jose.generateKeyPair('ES256')
app.locals.publicKey = publicKey;
app.locals.privateKey = privateKey;

// enable request logging for development debugging
app.use(morgan('dev'));

// body parsing middleware
app.use(express.urlencoded({
	extended: true
}));

// parses json files
app.use(express.json());

/* serve static files - see http://expressjs.com/en/starter/static-files.html */
app.use('/', express.static('./client/build'));
app.use(express.static('./client/build'));

//https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://immense-sea-87491.herokuapp.com"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors());

// ROUTES
app.use('/api/clusters', clusterRouter);
app.use('/api/dummy', dummyRouter);
app.use('/api/user', userRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/career', careerRouter);
app.use('/api/access_code', accessCodeRouter);

// https://stackoverflow.com/questions/49961731/react-router-4-and-express-cannot-get
// https://stackoverflow.com/questions/51227859/react-router-doesnt-work-on-express-server
// try this to remove GET issues

// Graceful shutdown
async function gracefulShutdown() {
	//await oracledb.getPool().close(1);
	//connection.close();
	//console.log("MongoDB connection closed.");

	// Kill itself
	process.kill(process.pid, 'SIGTERM');
}
process.once('SIGTERM', gracefulShutdown);
process.once('SIGINT', gracefulShutdown);
process.once('SIGUSR2', gracefulShutdown); // used by nodemon to end script

// Start app

if(process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	})
}

//const PORT = '3001';
//const HOST = '0.0.0.0'
app.listen(process.env.PORT || '3001', '0.0.0.0');

// OpenAI chatbot route
/*import { Router } from 'express';
import axios from 'axios';

const chatbotRouter = Router();

chatbotRouter.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const { data } = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Code this: ${message}`,
      max_tokens: 150,
      n: 1,
      stop: ['\n', 'Error:', 'Traceback', '>>>'],
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    const { choices } = data;
    const { text } = choices[0];
    const code = text.replace(/>>>/g, '').trim();
    res.status(200).json({ code });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});*/