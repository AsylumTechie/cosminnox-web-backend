import twilio from "twilio";

let currentPhoneOtp = null;
let phoneStore = null;

export const sendPhoneOtp = async (req, res) => {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ success: false, message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  currentPhoneOtp = otp;
  phoneStore = phone;

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone.startsWith('+') ? phone : `+91${phone}` // Adjust for country code
    });

    res.json({ success: true, message: "OTP sent to phone!" });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export const verifyPhoneOtp = (req, res) => {
  const { otp, phone } = req.body;

  if (parseInt(otp) === currentPhoneOtp && phone === phoneStore) {
    currentPhoneOtp = null;
    phoneStore = null;
    return res.json({ success: true });
  }

  res.status(400).json({ success: false, message: "Invalid OTP or phone number" });
};
