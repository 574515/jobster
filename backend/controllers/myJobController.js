import User from "../models/userModel.js";
import MyJob from "../models/myJobModel.js";

const addMyJob = async (req, res) => {
    try {
        const {
            company, jobTitle, description, jobLink, status, category, dateApplied, closingDate, userId, note,
        } = req.body;
        const myJob = new MyJob({
            company, jobTitle, description, jobLink, status, category, dateApplied, closingDate, note, user: userId
        });
        await myJob.save();
        if (myJob) res.status(201).json(myJob); else res.status(400).json({ error: 'Invalid job data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in my job creation: ${err.message}`);
    }
};

const changeMyJobStatus = async (req, res) => {
    const { jobId } = req.params;
    const status = req.body;
    try {
        let myJob = await MyJob.findOneAndUpdate({ _id: jobId }, { status: status }, null);
        res.status(200).json(myJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in update my job: ${err.message}`);
    }
};

const handleNote = async (req, res) => {
    const { jobId } = req.params;
    const { note } = req.body;
    try {
        let myJob = await MyJob.findOneAndUpdate({ _id: jobId }, { $set: { note } }, null);
        res.status(200).json(myJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in update note my job: ${err.message}`);
    }
};

const deleteMyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const myJob = await MyJob.findOneAndDelete({ _id: jobId }, null).select("jobTitle");
        if (myJob) {
            const deletedProperty = myJob["jobTitle"];
            res.status(200).json({
                deletedProperty
            });
        } else res.status(404).json({ error: 'Job not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in job deletion: ${err.message}`);
    }
};

const getAllMyJobs = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId }, null, { lean: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        const allJobs = await MyJob
            .find({ user: userId }, null, { lean: true })
            .select('-updatedAt')
            .select('-user')
            .select('-__v')
            .sort({ dateApplied: -1 });
        if (allJobs) res.status(201).json(allJobs); else res.status(400).json({ error: 'Invalid job data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in get jobs: ${err.message}`);
    }
};

export {
    addMyJob, changeMyJobStatus, handleNote, deleteMyJob, getAllMyJobs,
};
