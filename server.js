import dotenv from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import otpRoutes from "./routes/otp.js"
import contachRoutes from "./routes/contact.js"

const app = express();

app.use(
  cors({
    // origin: "https://cosminnox-web-frontend.vercel.app",
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(json());
dotenv.config();

connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/contact", contachRoutes)


const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
