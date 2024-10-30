import mongoose from 'mongoose';

const myFutureApplicationSchema = new mongoose.Schema({
        company: {
            type: String,
        },
        jobTitle: {
            type: String,
            minLength: 2,
            maxLength: 256,
        },
        jobLink: {
            type: String,
            required: true,
        },
        closingDate: {
            type: Date,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true, }
);

const MyFutureApplication = mongoose.model('MyFutureApplication', myFutureApplicationSchema);

export default MyFutureApplication;
