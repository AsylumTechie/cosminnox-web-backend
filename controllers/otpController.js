import { Resend } from 'resend';

let currentOtp = null;
let emailStore = null;

export const sendOtp = async (req, res) => {
  const { name, email, phone } = req.body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!email || !name || !phone) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  currentOtp = otp;
  emailStore = email;

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP for Brochure Download',
      text: `Hi ${name},\n\nYour OTP is: ${otp}\n\nThanks for using COSMINNOX.`,
    });

    console.log("Email sent:", result);

    console.log("Sending OTP to:", email, "OTP:", otp);

    res.json({ success: true, message: 'OTP sent successfully!' });
  } catch (error) {
    console.error('Resend Email Error:', error?.message || error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
};


export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;

  if (parseInt(otp) === currentOtp && email === emailStore) {
    currentOtp = null;
    emailStore = null;
    return res.json({ success: true });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
};
