import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
  	email: { type: String, required: true, unique: true, },
  	school: { type: String, required: true, unique: false, default: "Unknown"},
  	grade: { type: String, required: true, unique: false, default: "Unknown"},
	password: { type: String, required: true, select: false },
	isAdmin: { type: Boolean, required: true, default: false },
	signature: { type: Boolean, required: true, default: false },
	pfp: { type: String, required: true, default: "default" },
	sport: { type: String, required: true, default: " " },
	position: { type: String, required: true, default: " " },
	subject: { type: String, required: true, default: " " },
	hobby: { type: String, required: true, default: " " },
	themeName: { type: String, required: true, default: "default" },
	color1: { type: String, required: false },
	color2: { type: String, required: false },
	clusterPoints: { type: [Number], required: true, default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
	likedCareers: [ObjectId],
	profileAnswers: { type: [String], required: true, default: ["", "", "", "", "", "", "", "", "", "", "", ""] }
});

export default mongoose.model('user', userSchema);