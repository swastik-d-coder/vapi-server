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

  console.log("📩 Event:", event);

  // ✅ sirf call end pe trigger
  if (event.type === "call.ended") {

    const data = event.customer || {};

    const message = `
📞 New Admission Lead

👤 Name: ${data.name || "N/A"}
📱 Phone: ${data.phone || "N/A"}
📧 Email: ${data.email || "N/A"}
`;

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919149775991",
        body: message
      });

      console.log("✅ WhatsApp sent!");
    } catch (err) {
      console.log("❌ WhatsApp error:", err.message);
    }
  }

  res.sendStatus(200);
});

// ✅ Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
