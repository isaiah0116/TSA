import path, {dirname} from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

import careerclusters from "../static/careerclusters.js";
import User from "../models/userModel.js";
import Quiz from "../models/quizModel.js";
import Answer from "../models/answerSchema.js";
import SavedQuiz from "../models/savedQuizModel.js";

const clusters = [
	"Agriculture","Architecture","Arts",
	"Business","Education","Finance",
	"Government","Health","Hospitality",
	"Human Services","IT","Public Safety",
	"Manufacturing","Marketing","STEM",
	"Transportation"
]

async function updateMindMap(userID) {
	var mindmap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	SavedQuiz.find({userID: userID})
		.then((data) => {
			for (var i = 0; i < data.length; i++) {
				//console.log(data[i].points)
				for (var j = 0; j < mindmap.length; j++) {
					mindmap[j] += data[i].points[j];
				}
			}
			User.findByIdAndUpdate(userID, {clusterPoints: mindmap}, {new: true}, (err, user) => {
				//console.log(user);
			});
		});
}

export const getSavedQuizList = async (req, res) => {
	updateMindMap(req.decoded._id);
	SavedQuiz.find({userID: req.decoded._id})
		//https://stackoverflow.com/questions/69043537/how-to-turn-off-strictpopulate-in-mongoose
		//.populate([{ path: 'QuizID', strictPopulate: false }])
		.then((data) => {
			res.status(200).json(data);
		});
}

export const getSavedQuiz = async (req, res) => {
	SavedQuiz.findById(req.params.id)
		.then((data) => {
			if (!data)
				return res.status(400).json({"err": "Quiz not found!"});
			res.status(200).json(data);
		});
}

export const createSavedQuiz = async (req, res) => {
	if(!req.body.quizID || !req.body.answers || !req.body.name)
		return res.status(400).json({"err": "Missing field(s)"});

	// get answers
	Quiz.findById(req.body.quizID)
		.then((data) => {
			var points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			for (var i = 0; i < req.body.answers.length; i++) {
				
				for (var j = 0; j < data.questions[i].answers.id(req.body.answers[i]).answerCluster.length; j++) {
					var  cluster = data.questions[i].answers.id(req.body.answers[i]).answerCluster[j];
					console.log(cluster, clusters.findIndex(c => c === cluster))
					points[clusters.findIndex(c => c === cluster)] += 1;
				}
			}
			let saveSavedQuiz = new SavedQuiz({
				userID: req.decoded._id,
				quizID: req.body.quizID,
				name: req.body.name,
				answers: req.body.answers,
				points: points
			});

			saveSavedQuiz.save(function (err, quiz) {
				if (err)
					return res.status(400).json(err);
				console.log("saved => ", quiz);
				res.status(200).json(quiz);
				updateMindMap(req.decoded._id)
			});
		});
}

export const updateSavedQuiz = async (req, res) => {
	if(!req.body.quizID || !req.body.answers)
		return res.status(400).json({"err": "Missing field(s)"});

	// get answers
	Quiz.findById(req.body.quizID)
		.then((data) => {
			var points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			for (var i = 0; i < req.body.answers.length; i++) {
				for (var j = 0; j < data.questions[i].answers.id(req.body.answers[i]).answerCluster.length; j++) {
					var  cluster = data.questions[i].answers.id(req.body.answers[i]).answerCluster[j];
					points[clusters.findIndex(c => c === cluster)] += 1;
				}
				//console.log(cluster, clusters.findIndex(c => c === cluster))
			}
			var toUpdate = {
				answers: req.body.answers,
				points: points
			};

			SavedQuiz.findOneAndUpdate({userID: req.decoded._id, quizID: req.body.quizID}, toUpdate, {new: true}, (err, quiz) => {
				if (err)
					return res.status(400).json({"err": "Quiz not found!"});
				//console.log(err, quiz);
				res.status(200).json(quiz);
				updateMindMap(req.decoded._id);
			});
		});
}

export const deleteSavedQuiz = async (req, res) => {
	SavedQuiz.findByIdAndDelete(req.params.id, (err, quiz) => {
		if (err)
			return res.status(400).json({"err": "SavedQuiz not found!"});
		res.status(200).json(quiz);
		updateMindMap(quiz.userID)
	});
}