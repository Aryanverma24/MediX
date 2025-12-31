import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import nodemailer from "nodemailer"
import multer from "multer"
import csv from "csv-parser"
import fs from "fs"

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js"

import emailRoutes from "./routes/emailRoutes.js"
import feedbackRoutes  from "./routes/feedbackRoutes.js"

const app = express();

const allowedOrigins = [
  "https://avaykt-ehsaas.netlify.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ FIXED

// multer for uploading files
const upload = multer({ dest: "uploads/" })

// routes


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/meetings",meetingRoutes)

app.use("/api/email", emailRoutes);
app.use("/api/feedback", feedbackRoutes);



// app.get("/api/zoho/callback", (req, res) => {
//   res.status(200).send("Zoho authorization successful. You can close this tab.");
// });


app.get("/api/zoho/callback", async (req, res) => {
  const code = req.query.code;

  const params = new URLSearchParams({
    code,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    redirect_uri: "https://medix-1-eoz3.onrender.com/api/zoho/callback",
    grant_type: "authorization_code"
  });

  const response = await fetch(
    "https://accounts.zoho.com/oauth/v2/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    }
  );

  const data = await response.json();

  // Save refresh_token securely (DB / ENV / Vault)
  console.log(data);

  res.send("Zoho connected successfully!");
});


export default app;
