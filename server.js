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

  // 🧠 Vapi message extract (may vary)
  const userMessage =
    req.body.message?.content ||
    req.body.input ||
    "";

  console.log("User Message:", userMessage);

  // 🔍 Extract details
  const phoneMatch = userMessage.match(/\d{10}/);
  const emailMatch = userMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  const nameMatch = userMessage.match(/name is ([a-zA-Z ]+)/i);

  const name = nameMatch ? nameMatch[1] : null;
  const phone = phoneMatch ? phoneMatch[0] : null;
  const email = emailMatch ? emailMatch[0] : null;

  console.log("Extracted:", { name, phone, email });

  // 📧 Send email if all found
  if (name && phone && email) {
    try {
      await transporter.sendMail({
        from: "YOUR_EMAIL@gmail.com",
        to: "YOUR_EMAIL@gmail.com",
        subject: "New Lead from Vapi AI",
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`
      });

      console.log("✅ Email sent successfully");

    } catch (err) {
      console.log("❌ Email error:", err);
    }
  }

  res.json({
    response: "Thanks! Our team will contact you soon."
  });
});
// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
