import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import {
    addMyFutureApplication,
    deleteMyFutureApplication,
    getAllFutureApplications,
    handleNote
} from '../controllers/myFutureApplicationController.js'

const router = express.Router();

router.post("/myFutureApplication", protectRoute, addMyFutureApplication);
router.get("/myFutureApplication/:userId", protectRoute, getAllFutureApplications);
router.put("/myFutureApplication/:applicationId/note", protectRoute, handleNote);
router.delete("/myFutureApplication/:applicationId", protectRoute, deleteMyFutureApplication);

export default router;
