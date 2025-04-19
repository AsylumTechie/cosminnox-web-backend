import express from "express";
import { contact } from "../controllers/contactController.js";
const router = express.Router();

router.post("/form", contact);

export default router;
