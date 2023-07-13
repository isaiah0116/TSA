import path, {dirname} from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bcrypt from "bcrypt";
import * as jose from "jose";
import express from "express";

import Quiz from '../models/quizModel.js'
import SavedQuiz from "../models/savedQuizModel.js";

export const promptAccess = async (req, res) => {
	
}

export const getQuizList = async (req, res) => {
	Quiz.find({})
		.then((data) => {
			var d = [];
			for (var i = 0; i < data.length; i++) {
				//if (req.decoded)
				//	console.log(req.decoded.savedQuizzes)
				var q = {
					_id: data[i]._id,
					name: data[i].name,
					questions: data[i].questions
				}
				if (req.decoded && req.decoded.savedQuizzes && req.decoded.savedQuizzes.findIndex(sq => sq === data[i]._id.toString()) >= 0) {
					console.log(data[i].name);
					q['saved'] = true;
				} else {
					q ['saved'] = false;
				}
				d.push(q)
			}
			console.log(d);
			res.status(200).json(d);
		});
}

export const getQuiz = async (req, res) => {
	Quiz.findById(req.params.id)
		.then((data) => {
			if (!data)
				return res.status(400).json({"err": "Quiz not found!"});
			//console.log("req", req.decoded)
			var d = {
				_id: data._id,
				name: data.name,
				questions: data.questions,
				saved: (req.decoded && req.decoded.savedQuizzes && req.decoded.savedQuizzes.findIndex(sq => sq === data._id.toString()) >= 0)
			};
			console.log(d);
			res.status(200).json(d);
		});
}

export const createQuiz = async (req, res) => {
	// technically only name is needed
	console.log("body ", req.body)
	if(!req.body.name)
		return res.status(400).json({"err": "Missing name field"});
	let saveQuiz = new Quiz({
		name: req.body.name,
	});

	// add optional description
	if (req.body.description)
		saveQuiz.description = req.body.description;
	
	// handle questions
	// mongoose is smart and will auto-parse it
	if (req.body.questions)
		saveQuiz.questions = req.body.questions;
	
	saveQuiz.save(function (err, quiz) {
		if (err)
			return res.status(400).json(err);
		console.log("saved => ", quiz);
		return res.status(200).json(quiz);
	})
}

export const updateQuiz = async (req, res) => {
	let toUpdate = {};
	if (req.body.name) toUpdate.name = req.body.name;
	if (req.body.description) toUpdate.description = req.body.description;
	if (req.body.questions) toUpdate.questions = req.body.questions;

	Quiz.findByIdAndUpdate(req.params.id, toUpdate, {new: true}, (err, quiz) => {
		if (err)
			return res.status(400).json({"err": "Quiz not found!"});
		res.status(200).json(quiz);
		SavedQuiz.deleteMany({quizID: quiz._id});
	});
}

export const deleteQuiz = async (req, res) => {
	Quiz.findByIdAndDelete(req.params.id, (err, quiz) => {
		if (err)
			return res.status(400).json({"err": "Quiz not found!"});
		res.status(200).json(quiz);
		SavedQuiz.deleteMany({quizID: quiz._id});
	});
}