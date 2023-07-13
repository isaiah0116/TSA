import mongoose from 'mongoose';
import answerSchema from './answerSchema.js';

const questionSchema = mongoose.Schema({
	question: { type: String, required: true },
  	questionNumber: { type: Number, required: false},
	questionImg: { type: String, required: false },
	answers: [answerSchema]
});
export default questionSchema;