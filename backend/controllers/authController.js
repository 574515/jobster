import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne(
            { $or: [{ email }, { username }] }, null, { lean: true }
        );
        if (user) return res.status(400).json({ error: 'User already exists.' });
        if (!password) return res.status(400).json({ error: 'Password is required.' });
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            });
        } else res.status(400).json({ error: 'Invalid user data.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in sing up user: ${err.message}`);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username }, null, null);
        if (!user) return res.status(404).json({ error: 'User not found' });
        const isPasswordCorrect = await bcrypt.compare(password, user.password || '');
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Invalid password.' });
        generateTokenAndSetCookie(user._id, res);
        await User.findOneAndUpdate({ username }, { $set: { lastLogin: new Date() } }, null);
        user = await User.findOne({ username }, null, null);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
            lastLogin: user.lastLogin,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in login user: ${err.message}`);
    }
};

const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ message: 'User logged out successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in logout user: ${err.message}`);
    }
};

export {
    login,
    logout,
    signup,
};
