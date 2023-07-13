import path, {dirname} from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

import careerclusters from "../static/careerclusters.js";
import Career from "../models/careerModel.js";
import User from "../models/userModel.js";

export const getCareerList = async (req, res) => {
	Career.find({})
		.then((data) => {
			for (var i = 0; i < data.length; i++) {
				if (req.decoded && req.decoded.likedCareers.indexOf(data[i]._id) >= 0) {
					data[i].liked = true;
				} else {
					data[i].liked = false;
				}
			}
			res.status(200).json(data);
		});
}

export const getCareerViaPathway = async (req, res) => {
	Career.find({pathway: req.params.pathway})
		.then((data) => {
			for (var i = 0; i < data.length; i++) {
				if (req.decoded && req.decoded.likedCareers.indexOf(data[i]._id) >= 0) {
					data[i].liked = true;
				} else {
					data[i].liked = false;
				}
			}
			res.status(200).json(data);
		});
}

export const getCareer = async (req, res) => {
	Career.findById(req.params.id)
		.then((data) => {
			if (!data)
				return res.status(400).json({"err": "Career not found!"})

			var d = data;
			if (req.decoded && req.decoded.likedCareers.indexOf(data._id) >= 0) {
				data.liked = true;
			} else {
				data.liked = false;
			}
			res.status(200).json(data);
		});
}

export const createCareer = async (req, res) => {
	// check if required is there
	if(!req.body.name || !req.body.pathway || !req.body.salary)
		return res.status(400).json({"err": "Missing field(s)"});
	let saveCareer = new Career({
		name: req.body.name,
		pathway: req.body.pathway,
		salary: req.body.salary
	});

	// add optional description
	if (req.body.description)
		saveCareer.description = req.body.description;
	if (req.body.image)
		saveCareer.image = req.body.image
	
	saveCareer.save(function (err, quiz) {
		if (err)
			return res.status(400).json(err);
		console.log("saved => ", quiz);
		return res.status(200).json(quiz);
	})
}

export const updateCareer = async (req, res) => {
	let toUpdate = {};
	if (req.body.name) toUpdate.name = req.body.name;
	if (req.body.description) toUpdate.description = req.body.description;
	if (req.body.image) toUpdate.image = req.body.image;
	if (req.body.salary) toUpdate.salary = req.body.salary;

	Career.findByIdAndUpdate(req.params.id, toUpdate, {new: true}, (err, career) => {
		if (err)
			return res.status(400).json({"err": "Career not found!"});
		res.status(200).json(career);
	});
}

export const deleteCareer = async (req, res) => {
	Career.findByIdAndDelete(req.params.id, (err, career) => {
		if (err)
			return res.status(400).json({"err": "Career not found!"});
		res.status(200).json(career);
	});
}

export const likeCareer = async (req, res) => {
	User.findById(req.decoded._id)
		.select({likedCareers: 1})
		.then((data) => {
			var likedCareers = data.likedCareers;
			if (req.params.liked) {
				likedCareers.push(req.params.id);
			} else {
				likedCareers.splice(likedCareers.indexOf(req.params.id), 1)
			}

			User.findByIdAndUpdate(req.decoded._id, {likedCareers: likedCareers}, {new: true})
				.then((data) => {
					res.status(200).json(data);
				});
		})
}

export const getLikedCareers = async (req, res) => {
	Career.find()
		.where("_id").in(req.decoded.likedCareers)
		.then((data) => {
			return res.status(200).json(data);
		})
}