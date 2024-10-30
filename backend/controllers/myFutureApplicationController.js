import User from "../models/userModel.js";
import MyFutureApplication from "../models/myFutureApplicationsModel.js";

const addMyFutureApplication = async (req, res) => {
    try {
        const { company, jobTitle, jobLink, closingDate, userId } = req.body;
        const myFutureApplication = new MyFutureApplication({
            company, jobTitle, jobLink, closingDate, userId
        });
        await myFutureApplication.save();
        if (myFutureApplication) res.status(201).json(myFutureApplication);
        else res.status(400).json({ error: 'Invalid connection data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in application creation: ${err.message}`);
    }
};

const deleteMyFutureApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const myApplication = await MyFutureApplication.findByIdAndDelete(
            { _id: applicationId }, null
        ).select("company");
        if (myApplication) res.status(200).json(myApplication);
        else res.status(404).json({ error: 'No application found' })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in application deletion: ${err.message}`);
    }
};

const getAllFutureApplications = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne(
            { _id: userId }, null, { lean: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        const allApplications = await MyFutureApplication
            .find({ user: userId }, null, { lean: true })
            .select('-updatedAt')
            .select('-user')
            .select('-__v')
            .sort({ closingDate: -1 });
        if (allApplications) res.status(201).json(allApplications);
        else res.status(400).json({ error: 'Invalid application data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in get application: ${err.message}`);
    }
};

export {
    addMyFutureApplication,
    deleteMyFutureApplication,
    getAllFutureApplications
}