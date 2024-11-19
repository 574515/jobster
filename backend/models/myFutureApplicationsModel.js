import mongoose from 'mongoose';

const myFutureApplicationSchema = new mongoose.Schema({
        company: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
        jobLink: {
            type: String,
            required: true,
        },
        closingDate: {
            type: Date,
        },
        note: {
            type: String,
            maxLength: 1024,
            default: null,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true, }
);

const MyFutureApplication = mongoose.model('MyFutureApplication', myFutureApplicationSchema);

export default MyFutureApplication;
