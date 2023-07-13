import path, {dirname} from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

import careerclusters from "../static/careerclusters.js";
import Career from "../models/careerModel.js"

export const getClusterList = async (req, res) => {
	res.status(200).json(careerclusters.clusters);
}

export const getClusterShort = async (req, res) => {
	var cluster = careerclusters.clusters.find(function(curr) {
		if (curr.shortName == req.params.name) {
			return curr;
		}
	});

	if (cluster) {
		res.status(200).json(cluster);
	} else {
		res.status(400).json({"err": "cluster not found"});
	}
}

export const getPathwayList = async (req, res) => {
	res.status(200).json(careerclusters.pathways);
}

export const getPathwayViaCluster = async (req, res) => {
	var cluster = careerclusters.clusters.find(function(curr) {
		if (curr.shortName == req.params.cluster) {
			return curr;
		}
	});

	if (!cluster) {
		return res.status(400).json({"err": "cluster not found"});
	}

	var pathways = [];
	careerclusters.pathways.forEach(p => {
		if (cluster.pathways.includes(p.shortName)) {
			pathways.push(p);
		}
	});

	res.status(400).json({"pathways": pathways});
}