import express from 'express';
import {
    allJobListings,
    changeJobListingStatus,
    deleteJobListing,
    newJobListing
} from "../controllers/jobController.js";
import protectRoute from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/new", newJobListing, protectRoute);
router.get("/all/:userId", allJobListings, protectRoute);
router.put("/:listingId/status", changeJobListingStatus, protectRoute);
router.delete("/listing/:_id", deleteJobListing, protectRoute);

export default router;
