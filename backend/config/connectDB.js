import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log(`MongoDB Connected`))
        .catch(error => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
};

export default connectDB;
