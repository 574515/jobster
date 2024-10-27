import JobListing from "../models/jobListingModel.js";
import User from "../models/userModel.js";

const newJobListing = async (req, res) => {
    try {
        const { company, jobTitle, link, description, category, status, userId, dateApplied, closingDate } = req.body;
        const job = await JobListing.findOne({ jobTitle }, null, { lean: true });
        if (job) return res.status(400).json({ error: 'Job listing already exists.' });
        const newListing = new JobListing({
            company: company,
            jobTitle: jobTitle,
            link: link,
            description: description,
            category: category,
            status: status,
            user: userId,
            dateApplied: dateApplied,
            closingDate: closingDate,
        });
        await newListing.save();
        if (newListing) res.status(201).json(newListing);
        else res.status(400).json({ error: 'Invalid job listing data.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in post creation: ${err.message}`);
    }
};

const allJobListings = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId }, null, { lean: true });
        if (!user) return res.status(400).json({ error: 'User not found!' });
        const allJobs = await JobListing
            .find({ user: userId }, null, { lean: true })
            .select('-updatedAt')
            .select('-user')
            .select('-__v');
        if (allJobs) res.status(201).json(allJobs);
        else res.status(400).json({ error: 'Invalid job listing data.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in post creation: ${err.message}`);
    }
};

const changeJobListingStatus = async (req, res) => {
    const { listingId } = req.params;
    const status = req.body;
    console.log(req);
    try {
        let jobListing = await JobListing.findByIdAndUpdate(listingId, { status: status }, { returnDocument: "after" });
        res.status(200).json(jobListing);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in update listing: ${err.message}`);
    }
}

const deleteJobListing = async (req, res) => {
    try {
        const { _id } = req.params;
        const listing = await JobListing.findByIdAndDelete({ _id }, null);
        if (listing) res.status(200).json(listing);
        else res.status(404).json({ error: 'No listing found.' })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in post deletion: ${err.message}`);
    }
}

export {
    newJobListing,
    allJobListings,
    changeJobListingStatus,
    deleteJobListing,
};
