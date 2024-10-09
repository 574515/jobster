import express from 'express';
import 'dotenv/config'
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import cors from 'cors';
import connectDB from "./config/connectDB.js";

const app = express();
const PORT = process.env.SERVER_PORT || 7002;
void connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));