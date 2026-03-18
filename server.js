const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

// 🔑 Twilio config
const client = twilio("AC8b990f601dbc2734c5ddb62f75beecb4", "69ef4e6602a67a5f1e92e735dc55917f");

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// 🔥 Vapi webhook
app.post("/vapi-webhook", async (req, res) => {
  const event = req.body;

  console.log("📩 Event:", event);

  if (event.type) {

    const data = event.customer || {};

    const message = `
📞 New Lead

👤 Name: ${data.name || "N/A"}
📱 Phone: ${data.phone || "N/A"}
📧 Email: ${data.email || "N/A"}
`;

    try {
      await client.messages.create({
        from: "whatsapp:+14155238886", // Twilio sandbox
        to: "whatsapp:+919149775991", // 👈 apna number daal
        body: message
      });

      console.log("✅ WhatsApp sent!");
    } catch (err) {
      console.log("❌ WhatsApp error:", err.message);
    }
  }

  res.sendStatus(200);
});

// ✅ Render port fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
