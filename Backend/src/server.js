// const express = require('express');
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(port,() => console.log("server running on port : " + port));
