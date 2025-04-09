// import mongoose, { Schema, Document } from "mongoose";

// export interface IInstructor extends Document {
//   name: string;
//   email: string;
//   bio?: string;
//   photoUrl?: string;
// }

// const InstructorSchema = new Schema<IInstructor>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     bio: { type: String },
//     photoUrl: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Instructor ||
//   mongoose.model<IInstructor>("Instructor", InstructorSchema);
