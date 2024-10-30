import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import {
    addMyFutureApplication,
    deleteMyFutureApplication,
    getAllFutureApplications
} from '../controllers/myFutureApplicationController.js'

const router = express.Router();

router.post("/myConnection", addMyFutureApplication, protectRoute);
router.get("/myConnection/:userId", deleteMyFutureApplication, protectRoute);
router.delete("/myConnection/:applicationId", getAllFutureApplications, protectRoute);

export default router;
