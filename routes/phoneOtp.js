import express from "express";
import { sendPhoneOtp, verifyPhoneOtp } from "../controllers/phoneOtpController.js";

const router = express.Router();

router.post("/send", sendPhoneOtp);
router.post("/verify", verifyPhoneOtp);

export default router;
