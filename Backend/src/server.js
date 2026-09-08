// const express = require('express');
import dns from "dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv";
import path from "path"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

const port = process.env.PORT || 5000;
app.use(express.json()) //req.body
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}
app.listen(port,() => {

console.log("server running on port : " + port);
connectDB();
});
    
