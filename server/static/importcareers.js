import mongoose from 'mongoose'; // api for mongoDB
import Career from '../models/careerModel.js';
import config from '../../config.js'; // mongoDB config file
import careerlist from './careers.js';
import { CircularProgress } from '@mui/material';

// connect to database
var connection
connection = mongoose.connect(config.db.uri)
.then(() => {
	console.log(`Successfully connected to mongoose database.`)
})
.then(() => {
	Career.deleteMany({}, (ok, deletedCount, n) => {
		console.log(deletedCount.deletedCount, " careers deleted!");
	});

	Object.keys(careerlist).forEach((pathway, index) => {
		careerlist[pathway].map(career => {
			career.pathway = pathway;
			var saveCareer = new Career(career);
			saveCareer.save(function (err, c) {
				if (err) {
					//console.log("Problem career: ", c.name)
					console.log("ERR: ", err);
					return 0;
				}
				console.log("saved => ", c);
			})
		})
	})
})



