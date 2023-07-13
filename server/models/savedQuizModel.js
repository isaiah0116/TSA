import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import questionSchema from './questionSchema.js';

import User from "./userModel.js";
import Quiz from "./quizModel.js";
import Answer from "./answerSchema.js"

const savedQuizSchema = mongoose.Schema({
	userID: { type: ObjectId, required: true, ref: User },
	quizID: { type: ObjectId, required: true, ref: Quiz },
	name: { type: String, required: true },
	answers: [{type: ObjectId, required: true, ref: Answer}],
	points: { type: [Number], required: true, default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
});

export default mongoose.model('savedQuiz', savedQuizSchema);

// Since we only have one quiz, we don't need this anymore.
// This functionality is handled by userModel.