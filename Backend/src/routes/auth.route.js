import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

//test rate limit
// router.get("/test", arcjetProtection, (req, res) => res.status(200).json({
//     message: "Test route",
// }));

router.use(arcjetProtection);//check middleware in before all following req 

router.post('/signup',signup);

router.post('/Login',arcjetProtection,login);

router.post('/logout', logout);


router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router;