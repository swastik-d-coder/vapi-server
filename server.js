const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.post("/vapi-webhook", (req, res) => {

  console.log(" Full event:", JSON.stringify(req.body, null, 2));

  //  yahan check karna hai
  if (req.body.type === "call.ended") {

    const customer = req.body.customer || {};

    const data = {
      student_name: customer.student_name || "N/A",
      parent_name: customer.parent_name || "N/A",
      phone: customer.phone || "N/A",
      email: customer.email || "N/A"
    };

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    console.log("✅ Data saved");
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
