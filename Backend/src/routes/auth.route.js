import express from "express";

const router = express.Router();


router.get('/signup',(req,res) =>{
    res.send("Signup endpoint")
});

router.get('/Login',(req,res) =>{
    res.send("Login endpoint")
});

router.get('/Signout',(req,res) =>{
    res.send("Signout endpoint")
});

export default router;