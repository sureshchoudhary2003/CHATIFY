import express from "express";
import { signup } from "../controllers/auth.controller.js";
const router = express.Router();


router.post('/signup',signup);

router.get('/Login',(req,res) =>{
    res.send("Login endpoint")
});

router.get('/Signout',(req,res) =>{
    res.send("Signout endpoint")
});

export default router;