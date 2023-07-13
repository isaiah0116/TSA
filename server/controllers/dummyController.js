import path, {dirname} from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

import careerclusters from "../static/careerclusters.js";

const profiles = [
	{
		name: "Jeremy Tinana",
		pfp: "https://cdn.discordapp.com/avatars/262425476822204421/8a35d0c3d5ce65727fda7766f564d85f.png?size=256",
		email: "jeremy@jeremy.com",
		sport: "Table Tennis",
		themeName: "UF",
		color1: "#FF4616",
		color2: "#0021A5",
		clusterPoints: [0, 1, 2, 0, 3, 0, 0, 3, 0, 0, 10, 0, 5, 10, 0]
	},
	{
		name: "Ayaya",
		pfp: "https://cdn.discordapp.com/avatars/535566086259736596/1d55e4c4deae35b5799ca613776617e0.png?size=256",
		email: "tinana@tinana.com",
		sport: "Football",
		themeName: "UF",
		color1: "#FF4616",
		color2: "#0021A5",
		clusterPoints: [0, 11, 12, 0, 3, 0, 0, 13, 0, 0, 10, 0, 5, 10, 0]
	}
]
const careers = [
	{
		name: "Computer Hardware Engineers",
		pathway: "Soft Dev",
		salary: {
			"Median hourly wage": 57.48,
			"Mean hourly wage": 60.65,
			"Annual mean wage": 126140
		},
		image: "https://cdn.discordapp.com/attachments/686352975479963698/940317644647723039/unknown.png",
		description: "When you make computers"
	},
	{
		name: "Operations Research Analysts",
		pathway: "Network",
		salary: {
			"Median hourly wage": 41.44,
			"Mean hourly wage": 44.37,
			"Annual mean wage": 92280
		},
		image: "https://cdn.discordapp.com/attachments/686352975479963698/940317644647723039/unknown.png",
		description: "I'm in."
	}
]

export const getProfile = async (req, res) => {
	let id = req.params.id;
	if (id >= profiles.length)
		return res.status(400).json({"err": "Profile not found"});
	res.status(200).json(profiles[id]);
}

export const getMindClusters = async (req, res) => {
	let id = req.params.id;
	if (id >= profiles.length)
		return res.status(400).json({"err": "Profile not found"});

	let clusterPoints = profiles[id].clusterPoints.map((element, index) => [careerclusters.clusters[index], element]);
	clusterPoints.sort((first, second) => second[1] - first[1]); // descending order
	//console.log(clusterPoints);

	// grab top 3 by number (not counting ties)
	let count = 0;
	let max = clusterPoints[0][1];
	let arr = [];
	for (let c of clusterPoints) {
		if (c[1] < max) {
			count++;
			max = c[1];
			if (count >= 3)
				break;
		}
		arr.push(c[0]);
	}

	res.status(200).json(arr);
}

export const getCareerList = async (req, res) => {
	res.status(200).json(careers);
}

export const getCareer = async (req, res) => {
	let name = decodeURI(req.params.name);
	console.log(name);

	let career = careers.find(function(c) {
		if (c.name == name)
			return c;
	});

	if (!career)
		return res.status(400).json({"err": "Career not found"});
	res.status(200).json(career);
}