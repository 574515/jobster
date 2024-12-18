import express from 'express';

import { addMyJob, changeMyJobStatus, deleteMyJob, getAllMyJobs, handleNote } from "../controllers/myJobController.js";
import protectRoute from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/myJob", protectRoute, addMyJob);
router.put("/myJob/:jobId", protectRoute, changeMyJobStatus);
router.put("/myJob/:jobId/note", protectRoute, handleNote);
router.delete("/myJob/:jobId", protectRoute, deleteMyJob);
router.get("/myJob/:userId", protectRoute, getAllMyJobs);

export default router;
