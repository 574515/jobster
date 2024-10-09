import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME },
    );
    res.cookie(
        'jwt',
        token,
        {
            httpOnly: process.env.HTTP_ONLY,
            maxAge: process.env.JWT_MAX_AGE_ONE_DAY * process.env.JWT_MAX_AGE_IN_DAYS,
            sameSite: process.env.SAME_SITE,
        }
    );
    return token;
};

export default generateTokenAndSetCookie;
