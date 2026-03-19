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
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  // 🤖 Simple AI reply (tu apna AI laga sakta hai)
  const aiReply = "Thanks! If you shared your details, our team will contact you.";

  // 🔍 Extract details
  const { name, phone, email } = extractDetails(userMessage);

  // 📧 Agar teeno mil gaye toh email bhej
  if (name && phone && email) {
    try {
      await transporter.sendMail({
        from: "swastikkr122010@gmail.com",
        to: "laddukr122010@gmail.com",
        subject: "New Lead from AI Chat",
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}`
      });

      console.log("✅ Email sent with lead details");

    } catch (error) {
      console.log("❌ Email error:", error);
    }
  }

  res.json({ reply: aiReply });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
