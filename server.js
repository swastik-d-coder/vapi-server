const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// 🔑 Twilio config
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// 🔥 FINAL webhook
app.post("/vapi-webhook", async (req, res) => {
  const event = req.body;

  console.log("📩 Event received");

  try {
    // ✅ safe access
    const artifact = event?.message?.artifact;

    if (!artifact) {
      console.log("❌ No artifact मिला");
      return res.sendStatus(200);
    }

    // ✅ safe transcript
    const transcript = artifact?.transcript || "No transcript";

    const message = `
📞 RAW DATA

${transcript}
`;

    console.log("👉 Sending WhatsApp...");

    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+91XXXXXXXXXX",
      body: message
    });

    console.log("✅ WhatsApp sent!");

  } catch (err) {
    console.log("❌ ERROR:", err.message);
  }

  res.sendStatus(200);
});

// ✅ Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
