import express from 'express';
import { allPosts, deletePost, newPost } from "../controllers/jobController.js";
import protectRoute from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/new", newPost, protectRoute);
router.get("/all/:userId", allPosts, protectRoute);
router.delete("/listing/:_id", deletePost, protectRoute);

export default router;
