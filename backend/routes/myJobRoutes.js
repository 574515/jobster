import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import { addMyJob, changeMyJobStatus, deleteMyJob, getAllMyJobs } from "../controllers/myJobController.js";

const router = express.Router();

router.post("/myJob", addMyJob, protectRoute);
router.put("/myJob/:jobId", changeMyJobStatus, protectRoute);
router.delete("/myJob/:jobId", deleteMyJob, protectRoute);
router.get("/myJob/:userId", getAllMyJobs, protectRoute);

export default router;
