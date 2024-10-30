import express from 'express';

import protectRoute from "../middleware/verifyJWT.js";

import { login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/logout', logout, protectRoute);

export default router;
