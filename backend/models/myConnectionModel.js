import mongoose from 'mongoose';

const myConnectionSchema = new mongoose.Schema({
        company: {
            type: String,
            minLength: 2,
            maxLength: 64,
            required: true,
        },
        jobLink: {
            type: String,
        },
        dateSent: {
            type: Date,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true, }
);

const MyConnection = mongoose.model('MyConnection', myConnectionSchema);

export default MyConnection;
