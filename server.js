import dotenv from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import otpRoutes from "./routes/emailOtp.js"
import contachRoutes from "./routes/contact.js"
import phoneOtpRoutes from "./routes/phoneOtp.js";
import brocherRoutes from "./routes/brocher.js"
import paymentRoutes from "./routes/payment.js"

const app = express();

app.use(
  cors({
    origin: "https://cosminnox-web-frontend.vercel.app",
    // // origin: "http://localhost:3000",
    // origin: "*",
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
app.use("/api/brocher/otp", otpRoutes);
app.use("/api/contact", contachRoutes)
app.use("/api/phone-otp", phoneOtpRoutes);
app.use("/api/brocher", brocherRoutes);
app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
