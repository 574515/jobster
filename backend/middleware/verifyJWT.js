import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import 'dotenv/config'

const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Unauthorized.', action: 'logout' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId, null, null).select('-password');
    next();
}

export default protectRoute;