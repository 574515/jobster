import mongoose from 'mongoose';

const myJobSchema = new mongoose.Schema({
        company: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
            minLength: 3,
            required: true,
        },
        description: {
            type: String,
        },
        jobLink: {
            type: String,
        },
        status: {
            type: Map,
            of: String,
            required: true,
        },
        category: {
            label: {
                type: String,
            },
            value: {
                type: String,
            }
        },
        dateApplied: {
            type: Date,
            required: true,
        },
        closingDate: {
            type: Date,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
    }, { timestamps: true, }
);

const MyJob = mongoose.model('MyJob', myJobSchema);

export default MyJob;
