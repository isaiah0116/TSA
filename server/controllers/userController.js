import path, {dirname} from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bcrypt from "bcrypt";
import * as jose from "jose";

import careerclusters from "../static/careerclusters.js";
import User from "../models/userModel.js";

async function createJWT (payload, privateKey, res) {
	const jwt = await new jose.SignJWT(payload)
		.setProtectedHeader({ alg: 'ES256' })
		.setIssuedAt()
		.setIssuer('AthleteCareerDev')
		.setExpirationTime('2h')
		.sign(privateKey)

	res.status(200).json({"token": jwt, "_id": payload._id, "isAdmin": payload.isAdmin});
}

export const registerUser = async (req, res) => {
	// Check if the required fields are present
	if (!(req.body.name && req.body.email && req.body.password))
		return res.status(400).json({"err": "Missing field(s)"});

	// create the object
	bcrypt.hash(req.body.password, 10).then(hash => {
		let saveUser = new User({
			name: req.body.name,
      		email: req.body.email,
      		school: req.body.school,
      		grade: req.body.grade,
			password: hash,
			signature: req.body.signature,
		});
		
		// maybe add things later here for optional fields
		
		saveUser.save(function (err, user) {
			if (err)
				return res.status(400).json(err);
			console.log("saved => ", user);
			return res.status(200).json(user);
		});
	});
}

export const loginUser = async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	if (!(email && password))
		return res.status(400).json({"err": "Missing field(s)"});

	User.findOne({email: email}).select({ password: 1, isAdmin: 1 }).then(user => {
		let passHash = user ? user.password : "";
		bcrypt.compare(password, passHash).then(match => {
			if (!(passHash && match))
				return res.status(400).json({"err": "Username or Password incorrect!"});
	
			createJWT({'_id': user._id, 'isAdmin': user.isAdmin}, req.app.locals.privateKey, res);
		});
	});
}

export const updateSelf = async (req, res) => {
	if (req.body.isAdmin) return res.status(400).json({"err": "Cannot self-elevate!"});
	if (req.body.password) {
		bcrypt.hash(req.body.password, 10).then(hash => {
			req.body.password = hash;
			User.findByIdAndUpdate(req.decoded._id, req.body, {new: true}, (err, user) => {
				if (err)
					return res.status(400).json({"err": "User not found!"});
				res.status(200).json(user);
			});
		});
	} else {
		User.findByIdAndUpdate(req.decoded._id, req.body, {new: true}, (err, user) => {
			if (err)
				return res.status(400).json({"err": "User not found!"});
			res.status(200).json(user);
		});
	}
}

export const deleteSelf = async (req, res) => {
	User.findByIdAndDelete(req.decoded._id, (err, user) => {
		if (err)
			return res.status(400).json({"err": "User not found!"});
		res.status(200).json(user);
	});
}

export const adminUpdate = async (req, res) => {
	if (req.body.password) {
		bcrypt.hash(req.body.password, 10).then(hash => {
			req.body.password = hash;
			User.findByIdAndUpdate(req.params.user, req.body, {new: true}, (err, user) => {
				if (err)
					return res.status(400).json({"err": "User not found!"});
				res.status(200).json(user);
			});
		});
	} else {
		User.findByIdAndUpdate(req.params.user, req.body, {new: true}, (err, user) => {
			if (err)
				return res.status(400).json({"err": "User not found!"});
			res.status(200).json(user);
		});
	}
}

export const adminDelete = async (req, res) => {
	User.findByIdAndDelete(req.params.user, (err, user) => {
		if (err)
			return res.status(400).json({"err": "User not found!"});
		res.status(200).json(user);
	});
}

export const getUserList = async (req, res) => {
	User.find({})
		// .select({name: 1, signature: 1, pfp: 1, sport: 1 })
		.then((data) => {
			var d = []
			for (var i = 0; i < data.length; i++) {
				var u = {
					_id: data[i]._id,
					name: data[i].name,
					email: data[i].email,
					school: data[i].school,
					grade: data[i].grade,
					sport: data[i].sport,
					position: data[i].position,
					subject: data[i].subject,
					hobby: data[i].hobby,
          			pfp: data[i].pfp,
          			clusterPoints: data[i].clusterPoints,
		  			signature: data[i].signature
				}
				d.push(u)
			}
			console.log(d)
			res.status(200).json(d);
	});
}

export const searchUsers = async (req, res) => {
	let search = decodeURI(req.params.search);
	console.log(search);
  User.find().or([{name: decodeURI(search)}, {email: decodeURI(search)}])
  // User.find()({$or:[{name: decodeURI(search)}, {email: decodeURI(search)}]})
		.select({ name: 1, signature: 1, pfp: 1, sport: 1 })
		.then((data) => {
			res.status(200).json(data);
	});
}

export const getUserViaID = async (req, res) => {
	User.findById(req.params.id)
		.select({ name: 1, signature: 1, pfp: 1, sport: 1})
		.then((data) => {
			if (!data)
				return res.status(400).json({"err": "User not found!"});
			res.status(200).json(data);
	});
}

export const getSelfProfile = async (req, res) => {
	User.findById(req.decoded._id)
.select({ name: 1, pfp: 1, signature: 1, email: 1, school: 1, sport: 1, position: 1, subject: 1, hobby: 1, themeName: 1, profileAnswers: 1 })
		.then((data) => {
			res.status(200).json(data);
		});
}

export const getMindClusters = async (req, res) => {
	User.findById(req.decoded._id)
		.select({clusterPoints: 1, name: 1})
		.then((data) => {
			console.log(data);
			let clusterPoints = data.clusterPoints.map((element, index) => [careerclusters.clusters[index], element]);
			clusterPoints.sort((first, second) => second[1] - first[1]); // descending order
			console.log(clusterPoints);

			// grab top 3 by number (not counting ties)
			let count = 0;
			let track = 0;
			let max = clusterPoints[0][1];
			let arr = [];
			for (let c of clusterPoints) {
				if (c[1] < max) {
					count++;
					max = c[1];
					if (count >= 3)
						break;
				}
				if (c[1] != 0)
					arr.push(c[0]);
				track++;
				if (track >= 5)
					break;
			}
			
			//arr.push(clusterPoints[0][0]);

			console.log(arr);

			var payload = { name: data.name, children: []}
			for (let c of arr) {
				var cluster = {
					name: c.shortName,
					color: c.color,
					imgRoad: c.imgRoad,
					imgCareer: c.imgCareer,
					description: c.description,
					webURL: c.webURL
				};
				var children = [];
				//console.log("abba =>", c[0].pathways);
				for (let p of c.pathways) {
					children.push({
						name: p,
						color: cluster.color
					});
				}
				cluster.children = children;
				payload.children.push(cluster);
			}

			res.status(200).json(payload);
		});
}