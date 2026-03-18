app.post("/vapi-webhook", async (req, res) => {
  console.log("🔥 Webhook HIT");
  console.log("📩 Full Event:", req.body);

  try {
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+91XXXXXXXXXX", // apna number
      body: "TEST MESSAGE FROM SERVER 🚀"
    });

    console.log("✅ WhatsApp sent!");
  } catch (err) {
    console.log("❌ WhatsApp error:", err.message);
  }

  res.sendStatus(200);
});
