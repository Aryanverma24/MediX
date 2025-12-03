import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js"

const app = express();

const port ="https://avaykt-ehsaas.netlify.app/api" || 'http://localhost:5173'
// ✅ FIXED CORS
app.use(cors({
  origin: port,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ FIXED

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/meetings",meetingRoutes)


export default app;
