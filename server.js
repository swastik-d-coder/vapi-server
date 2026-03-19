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
    console.log("🔥 FULL ARTIFACT:", JSON.stringify(artifact, null, 2));
    const transcript = artifact.transcript || "";

let name = "N/A";
let phone = "N/A";

const messages = artifact.messages || [];

// 🔥 user ke saare responses nikaal
const userMessages = messages
  .filter(m => m.role === "user")
  .map(m => m.content?.toLowerCase() || "");

// 👉 DEBUG
console.log("🧠 USER MSGS:", userMessages);

// 🔥 NAME = 1st meaningful response
if (userMessages.length >= 2) {
  name = userMessages[1].trim();
}

// 🔥 PHONE detect
const wordToDigit = {
  zero: "0", one: "1", two: "2", three: "3", four: "4",
  five: "5", six: "6", seven: "7", eight: "8", nine: "9"
};

for (let msg of userMessages) {
  const words = msg.split(" ");
  const digits = words.map(w => wordToDigit[w] || "").join("");

  if (digits.length >= 10) {
    phone = digits.slice(0, 10);
    break;
  }
}

    // 🔥 transcript se data nikaal (basic extraction)
    const vars = artifact.variableValues || {};

console.log("🧠 VARIABLES:", vars); // debug ke liye

name = vars.name || vars.student_name || "N/A";
phone = vars.phone || vars.phone_number || "N/A";
const email = vars.email || "N/A";

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
