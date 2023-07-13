import * as jose from 'jose';
import User from "../models/userModel.js";
import SavedQuiz from "../models/savedQuizModel.js";

export const loginRequired = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader)
		return res.status(400).json({"err": "No bearer token!"});
	const jwt = authHeader.split(' ')[1];

	// check if valid
	try {
		const { payload, protectedHeader } = await jose.jwtVerify(jwt, req.app.locals.publicKey, {issuer: 'AthleteCareerDev'});
		req.decoded = payload;
		console.log("payload => ", payload);

		next();
	} catch (err) {
		return res.status(400).json({"err": "Not logged in!"});
	}
}

export const loginOptional = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader) {
		next();
	} else {
		const jwt = authHeader.split(' ')[1];

		// check if valid
		try {
			const { payload, protectedHeader } = await jose.jwtVerify(jwt, req.app.locals.publicKey, {issuer: 'AthleteCareerDev'});
			req.decoded = payload;
			console.log("payload => ", payload._id);

			// usually called for likedCareers, so grab it while we're here
			User.findById(req.decoded._id)
				.select({likedCareers: 1})
				.then((data) => {
					req.decoded.likedCareers = data.likedCareers;
					
					// also called for savedQuizzes
					SavedQuiz.find({userID: req.decoded._id})
						.select({quizID: 1})
						.then((data) => {
							//console.log("saved quizzes: ", data);
							var sq = [];
							data.forEach(q => sq.push(q.quizID.toString()));
							console.log("sq list: ", sq)
							req.decoded.savedQuizzes = sq;
							
							next();
						});
				});
		} catch (err) {
			// they aren't logged in, but its fine
			req.decoded = false;
			next();
		}
	}
}

export const adminRequired = async (req, res, next) => {
	if(!req.decoded.isAdmin)
		return res.status(400).json({"err": "User does not have admin privileges!"});
	next();
}