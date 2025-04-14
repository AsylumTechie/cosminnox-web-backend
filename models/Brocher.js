import mongoose from "mongoose";

const brocherSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})
const Brocher = mongoose.model("Brocher", brocherSchema);

export default Brocher;