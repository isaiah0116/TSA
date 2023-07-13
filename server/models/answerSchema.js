import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
	answer: { type: String, required: true },
	answerImg: { type: String, required: false },
	answerCluster: { type: [String], required: true } 
});
export default answerSchema;