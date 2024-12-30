import mongoose from 'mongoose';

const myJobSchema = new mongoose.Schema({
        company: {
            type: String,
            required: true,
            minlength: 2,
            maxLength: 64,
        },
        jobTitle: {
            type: String,
            minLength: 2,
            maxLength: 256,
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
            type: Array,
            of: {
                label: String,
                value: String,
                color: String,
                tooltip: String,
            },
        },
        dateApplied: {
            type: Date,
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

const MyJob = mongoose.model('MyJob', myJobSchema);

export default MyJob;
