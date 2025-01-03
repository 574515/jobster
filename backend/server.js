import express from 'express';

import 'dotenv/config'
import cookieParser from "cookie-parser";
import cors from 'cors';

import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/connectDB.js";
import authRoutes from './routes/authRoutes.js';
import jobRoutes from "./routes/myJobRoutes.js";
import connectionRoutes from "./routes/myConnectionRoutes.js";
import applicationRoutes from "./routes/myFutureApplicationRoutes.js";

const app = express();
const PORT = process.env.SERVER_PORT || 7002;
void connectDB();

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/connection', connectionRoutes);
app.use('/api/application', applicationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));