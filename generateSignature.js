import crypto from "crypto";

const orderId = "order_QIsDixxguAwqeF"; // Replace with actual from Step 1
const paymentId = "pay_QIsEchNS4K6GkG"; // Fake one, just for testing
const keySecret = "s1szD0Xa6z5bZ1vVG5cr4DqK"; // Your test Razorpay secret

const body = `${orderId}|${paymentId}`;
const signature = crypto
  .createHmac("sha256", keySecret)
  .update(body)
  .digest("hex");

console.log("Mock Signature:", signature);
