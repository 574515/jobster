import User from "../models/userModel.js";
import MyJob from "../models/myJobModel.js";

const addMyJob = async (req, res) => {
    try {
        const {
            company,
            jobTitle,
            jobLink,
            description,
            category,
            status,
            userId,
            dateApplied,
            closingDate
        } = req.body;
        const myJob = new MyJob({
            company: company,
            jobTitle: jobTitle,
            jobLink: jobLink,
            description: description,
            category: category,
            status: status,
            user: userId,
            dateApplied: dateApplied,
            closingDate: closingDate,
        });
        await myJob.save();
        if (myJob) res.status(201).json(myJob);
        else res.status(400).json({ error: 'Invalid job data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in my job creation: ${err.message}`);
    }
};

const changeJobListingStatus = async (req, res) => {
    const { listingId } = req.params;
    const status = req.body;
    try {
        let jobListing = await MyJob.findOneAndUpdate(
            { _id: listingId }, { status: status }, null
        );
        res.status(200).json(jobListing);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in update my job: ${err.message}`);
    }
};

const deleteJobListing = async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await MyJob.findOneAndDelete(
            { _id: listingId }, null
        ).select("jobTitle");
        if (listing) res.status(200).json(listing);
        else res.status(404).json({ error: 'Job not found' })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in job deletion: ${err.message}`);
    }
};

const getAllMyJobs = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne(
            { _id: userId }, null, { lean: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        const allJobs = await MyJob
            .find({ user: userId }, null, { lean: true })
            .select('-updatedAt')
            .select('-user')
            .select('-__v')
            .sort({ dateApplied: -1 });
        if (allJobs) res.status(201).json(allJobs);
        else res.status(400).json({ error: 'Invalid job data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in get jobs: ${err.message}`);
    }
};

export {
    addMyJob,
    changeJobListingStatus,
    deleteJobListing,
    getAllMyJobs,
};
