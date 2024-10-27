import express from 'express';
import { newPost } from "../controllers/jobController.js";

const router = express.Router();

router.post("/new", newPost);

export default router;