import express from "express";
import {
  createCourse,
  getCourses,
  enroll,
  addLesson,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses);
// router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.post("/", createCourse);
router.post("/:id/enroll", protect, authorize("student"), enroll);
router.post("/:id/lessons", protect, authorize("instructor"), addLesson);
router.put("/:id", protect, authorize("admin"), updateCourse); 
router.delete("/:id", protect, authorize("admin"), deleteCourse);

export default router;
