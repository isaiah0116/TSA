import * as clusterController from "../controllers/clusterController.js";
import express from "express";
const clusterRouter = express.Router();

// Clusters
clusterRouter.get('/get_clusters', clusterController.getClusterList);
clusterRouter.get('/get_cluster_short/:name', clusterController.getClusterShort);

// Pathways
clusterRouter.get('/get_pathways', clusterController.getPathwayList);
clusterRouter.get('/get_pathways_via_cluster/:cluster', clusterController.getPathwayViaCluster);

export default clusterRouter;