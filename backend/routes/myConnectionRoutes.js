import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import {
    addMyConnection,
    deleteMyConnection,
    getAllConnections,
    handleNote
} from '../controllers/myConnectionController.js'

const router = express.Router();

router.post("/myConnection", addMyConnection, protectRoute);
router.put("/myConnection/:connectionId/note", handleNote, protectRoute);
router.delete("/myConnection/:connectionId", deleteMyConnection, protectRoute);
router.get("/myConnection/:userId", getAllConnections, protectRoute);

export default router;
