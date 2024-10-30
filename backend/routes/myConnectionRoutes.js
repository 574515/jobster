import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import { addMyConnection, deleteMyConnection, getAllConnections } from '../controllers/myConnectionController.js'

const router = express.Router();

router.post("/myConnection", addMyConnection, protectRoute);
router.get("/myConnection/:userId", deleteMyConnection, protectRoute);
router.delete("/myConnection/:listingId", getAllConnections, protectRoute);

export default router;
