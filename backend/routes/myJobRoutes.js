import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import { addMyJob, changeJobListingStatus, deleteJobListing, getAllMyJobs } from "../controllers/myJobController.js";

const router = express.Router();

router.post("/myJob", addMyJob, protectRoute);
router.put("/myJob/:listingId", changeJobListingStatus, protectRoute);
router.delete("/myJob/:listingId", deleteJobListing, protectRoute);
router.get("/myJob/:userId", getAllMyJobs, protectRoute);

export default router;
