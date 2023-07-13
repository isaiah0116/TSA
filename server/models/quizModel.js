import mongoose from 'mongoose';
import questionSchema from './questionSchema.js';

const quizSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: false },
	questions: [questionSchema]
});

export default mongoose.model('quiz', quizSchema);