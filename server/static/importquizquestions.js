import mongoose from 'mongoose'; // api for mongoDB
import Quiz from '../models/quizModel.js';
import basicQuiz from './quizquestions.js';
import config from '../../config.js'; // mongoDB config file
import { CircularProgress } from '@mui/material';

// connect to database
var connection
connection = mongoose.connect(config.db.uri)
.then(() => {
	console.log(`Successfully connected to mongoose database.`)
})
.then(() => {
  var saveQuiz = new Quiz(basicQuiz);
  saveQuiz.save(function(err, c) {
    if (err) {
      console.log("ERR:", err);
      return 0;
    }
    console.log("saved =>", c)
  })
  }
)



