import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import {
    addMyFutureApplication,
    deleteMyFutureApplication,
    getAllFutureApplications,
    handleNote
} from '../controllers/myFutureApplicationController.js'

const router = express.Router();

router.post("/myFutureApplication", addMyFutureApplication, protectRoute);
router.get("/myFutureApplication/:userId", getAllFutureApplications, protectRoute);
router.put("/myFutureApplication/:applicationId/note", handleNote, protectRoute);
router.delete("/myFutureApplication/:applicationId", deleteMyFutureApplication, protectRoute);

export default router;
