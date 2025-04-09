import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Course", courseSchema);
