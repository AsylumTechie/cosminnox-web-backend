import dotenv from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import Contact from "./model/Contact.js";

const app = express();

console.log("Hello1")

app.use(cors({
    origin: "https://cosminnox-web-frontend.vercel.app",
    methods: ["GET", "POST"], 
    allowedHeaders: ["Content-Type"], 
  }));
  
app.use(json()); 
dotenv.config();

connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.post("/api/contact", async (req, res) => {

console.log("Hello2")
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message received successfully!" });
  } catch (error) {
    console.error(error);
res.status(500).json({ success: false, message: "Server Error", error: error.message });

  }
});

app.get("/", (req, res) => {
  res.send("Contact Form Backend Running");
});

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
