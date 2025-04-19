import express from "express";
import { sendOtp, verifyOtp } from "../controllers/emailOtpController.js";
const router = express.Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

export default router;
