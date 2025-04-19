import Brocher from "../models/Brocher.js";

export const brocher = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newBrocher = new Brocher({ name, email, phone });
    await newBrocher.save();

    res
      .status(201)
      .json({ success: true, message: "Details received successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
