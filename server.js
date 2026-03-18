const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// 🔑 Twilio config
const client = twilio("AC8b990f601dbc2734c5ddb62f75beecb4", "0efe167a02edff69361908aa4de4e568");

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// 🔥 TEST webhook
app.post("/vapi-webhook", async (req, res) => {
  console.log("🔥 Webhook HIT");

  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919149775991", // apna number
      body: "TEST MESSAGE FROM SERVER 🚀"
    });

    console.log("✅ WhatsApp sent!");
  } catch (err) {
    console.log("❌ WhatsApp error:", err.message);
  }

  res.sendStatus(200);
});

// ✅ PORT FIX
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
