import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  videoUrl: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

export default mongoose.model("Lesson", lessonSchema);
