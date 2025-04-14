import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";

export const createCourse = async (req, res) => {
  const instructorId = req.user?._id || req.body.instructor;
  if (!instructorId) {
    return res.status(400).json({ message: "Instructor ID is required" });
  }
  //   const course = await Course.create({ ...req.body });
  const course = await Course.create({ ...req.body, instructor: instructorId });
  res.json({ course, message: "Course created successfully!" });
};

export const getCourses = async (req, res) => {
  // const courses = await Course.find().populate("instructor", "name");
  const courses = await Course.find()
  res.json(courses);
};

export const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id); 
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Unexpected error occurred:", error);
    res.status(500).json({ message: "Failed to get course details" });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Lesson.deleteMany({ _id: { $in: course.lessons } });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ message: "Failed to delete course" });
  }
};

export const enroll = async (req, res) => {
  const course = await Course.findById(req.params.id);
  course.enrolledStudents.push(req.user._id);
  await course.save();
  res.json({ message: "Enrolled!" });
};

export const addLesson = async (req, res) => {
  const lesson = await Lesson.create({ ...req.body, course: req.params.id });
  const course = await Course.findById(req.params.id);
  course.lessons.push(lesson._id);
  await course.save();
  res.json(lesson);
};
