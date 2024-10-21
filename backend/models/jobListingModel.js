import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: 3,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        link: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        posted: {
            type: Date,
            default: () => new Date(),
        }
    }, { timestamps: true, }
);

const JobListing = mongoose.model('JobListing', jobListingSchema);

export default JobListing;
