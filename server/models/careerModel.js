import mongoose from 'mongoose';

const careerSchema = mongoose.Schema({
	name: { type: String, required: true },
	pathway: { type: String, required: true },
	salary: {
		medianHourly: { type: Number },
		meanHourly: { type: Number },
		meanAnnual: { type: Number },
	},
	image: { type: String, required: false },
	description: { type: String, required: false },
});

export default mongoose.model('career', careerSchema);