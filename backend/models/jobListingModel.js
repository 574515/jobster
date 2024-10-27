import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
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
        link: {
            type: String,
        },
        status: {
            type: Map,
            of: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        category: {
            type: String,
        },
        dateApplied: {
            type: Date,
            required: true,
        },
        closingDate: {
            type: Date,
            required: true,
        },
    }, { timestamps: true, }
);

const JobListing = mongoose.model('JobListing', jobListingSchema);

export default JobListing;
