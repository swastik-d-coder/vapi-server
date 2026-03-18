const express = require("express");
const app = express();

app.use(express.json()); // ⚠️ important

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// 🔥 VAPI WEBHOOK (YEH MISSING THA)
app.post("/vapi-webhook", (req, res) => {
  console.log("📩 Event received:", req.body);

  res.sendStatus(200);
});

// ✅ PORT FIX (Render ke liye)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
