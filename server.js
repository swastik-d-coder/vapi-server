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

  // ✅ correct event
  if (event.message?.type === "end-of-call-report") {

    const artifact = event.message.artifact;

    // 🔥 transcript se data nikaal (basic extraction)
    const transcript = artifact.transcript || "";

    let name = "N/A";
    let phone = "N/A";

    // simple extraction (basic)
    const nameMatch = transcript.match(/User: (.+)\./);
    if (nameMatch) name = nameMatch[1];

    const phoneMatch = transcript.match(/(\d{10})/);
    if (phoneMatch) phone = phoneMatch[1];

    const message = `
📞 New Admission Lead

👤 Name: ${name}
📱 Phone: ${phone}
`;
console.log("👉 Sending WhatsApp...");
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
