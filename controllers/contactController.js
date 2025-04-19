import Contact from "../models/Contact.js";

export const contact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
    
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
    
        res
          .status(201)
          .json({ success: true, message: "Message received successfully!" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "Server Error", error: error.message });
      }
};