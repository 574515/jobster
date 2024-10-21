const newPost = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(`Error in post creation: ${err.message}`);
    }
};

export {
    newPost,
};
