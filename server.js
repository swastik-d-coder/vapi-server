const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 🔐 Gmail setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "swastikkr122010@gmail.com",
    pass: "vbxf xkrk dvqo kplr"
  }
});

// 🧠 Function to extract details from message
function extractDetails(text) {
  const nameMatch = text.match(/name is ([a-zA-Z ]+)/i);
  const phoneMatch = text.match(/(\d{10})/);
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);

  return {
    name: nameMatch ? nameMatch[1] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    email: emailMatch ? emailMatch[0] : null
  };
}

// 🤖 AI Chat route
app.post("/vapi", async (req, res) => {
  console.log("🔥 VAPI HIT:", JSON.stringify(req.body, null, 2));

  // 🔥 TEST EMAIL (temporary)
  try {
    await transporter.sendMail({
      from: "swastikkr122010@gmail.com",
      to: "laddukr122010@gmail.com",
      subject: "TEST EMAIL",
      text: "Bhai email system working hai 🚀"
    });

    console.log("✅ Email working");

  } catch (error) {
    console.log("❌ Email error:", error);
  }

  res.json({
    response: "ok"
  });
});
// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
