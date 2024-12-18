import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import {
    addMyConnection,
    deleteMyConnection,
    getAllConnections,
    handleNote
} from '../controllers/myConnectionController.js'

const router = express.Router();

router.post("/myConnection", protectRoute, addMyConnection);
router.put("/myConnection/:connectionId/note", protectRoute, handleNote);
router.delete("/myConnection/:connectionId", protectRoute, deleteMyConnection);
router.get("/myConnection/:userId", protectRoute, getAllConnections);

export default router;
