import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from 'cors';
import { app , server} from "./lib/socket.js";
import path from "path";
import fs from "fs";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Allow larger JSON bodies so base64 image uploads (avatars, chat images) fit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(cors({
    origin: CLIENT_URL,
    credentials:true,
}));

// Simple health check for Render / uptime monitors
app.get("/api/health",(req,res)=> res.json({ status: "ok" }));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

// If the built frontend exists next to the backend (single service deploy),
// serve it. Otherwise this is an API-only deploy (frontend hosted on Vercel).
const frontendDist = path.join(__dirname,"../frontend/dist");
if(process.env.NODE_ENV === "production" && fs.existsSync(frontendDist)){
    app.use(express.static(frontendDist));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(frontendDist,"index.html"));
    });
}else{
    app.get("/",(req,res)=> res.send("SRMentor API is running"));
}

server.listen(PORT,()=>{
    console.log("SRMentor server is running on PORT " + PORT);
    connectDB();
});
