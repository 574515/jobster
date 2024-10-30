import User from "../models/userModel.js";
import MyConnection from "../models/myConnectionModel.js";

const addMyConnection = async (req, res) => {
    try {
        const { company, jobLink, dateSent, userId } = req.body;
        const myConnection = new MyConnection({
            company, jobLink, dateSent, userId
        });
        await myConnection.save();
        if (myConnection) res.status(201).json(myConnection);
        else res.status(400).json({ error: 'Invalid connection data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in connection creation: ${err.message}`);
    }
};

const deleteMyConnection = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const myConnection = await MyConnection.findByIdAndDelete(
            { _id: connectionId }, null
        ).select("company");
        if (myConnection) res.status(200).json(myConnection);
        else res.status(404).json({ error: 'No connection found' })
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in connection deletion: ${err.message}`);
    }
};

const getAllConnections = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne(
            { _id: userId }, null, { lean: true }
        );
        if (!user) return res.status(404).json({ error: 'User not found' });
        const allConnections = await MyConnection
            .find({ user: userId }, null, { lean: true })
            .select('-updatedAt')
            .select('-user')
            .select('-__v')
            .sort({ dateSent: -1 });
        if (allConnections) res.status(201).json(allConnections);
        else res.status(400).json({ error: 'Invalid connections data' });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in get connections: ${err.message}`);
    }
};

export {
    addMyConnection,
    deleteMyConnection,
    getAllConnections
}