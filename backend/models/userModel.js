import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxLength: 16,
            minLength: 3,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 32,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    }, { timestamps: true, }
);

const User = mongoose.model('User', userSchema);

export default User;
