import express from "express";
import { brocher } from "../controllers/brocherController.js"
const router = express.Router();

router.post("/download", brocher);

export default router;
