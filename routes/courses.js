import express from "express";
import {
  createCourse,
  getCourses,
  enroll,
  addLesson,
  updateCourse,
  deleteCourse,
  getCourseDetails,
  getVideo
} from "../controllers/courseController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", getCourses);  
router.post("/details", getCourses); 
// router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.post("/", createCourse);
router.post("/details/video", getVideo)
router.get("/:id", getCourseDetails)
// router.post("/", createCourse);
router.post("/:id/enroll", protect, authorize("student"), enroll);
router.post("/:id/lessons", protect, authorize("instructor"), addLesson);
// router.post("/:id", protect, authorize("admin"), updateCourse); 
router.post("/:id", updateCourse); 
router.delete("/:id", protect, authorize("admin"), deleteCourse)

export default router;
