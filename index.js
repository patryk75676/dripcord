const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// 👇 Twój webhook Discorda
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1408150330511982753/JNw7CFSdqngQiOBVOCh0Bmt2VzJ6bwAocxf5Og-4m29vq-LeqX3mZk73P9fFjXdZvWGJ";

// Główna trasa dla MySellAuth webhook
app.post("/", async (req, res) => {
  console.log("📩 Webhook received:", req.body);

  try {
    const { type, data } = req.body;

    // Formatowanie wiadomości na Discord
    const message = {
      content: `✅ **Webhook odebrany!**\n📌 Typ: \`${type}\`\n🧾 Dane: \`${JSON.stringify(data)}\``
    };

    // Wysyłanie na Discorda
    await axios.post(DISCORD_WEBHOOK_URL, message);

    res.status(200).send("OK");
  } catch (error) {
    console.error("❌ Błąd przy wysyłaniu webhooka do Discorda:", error.message);
    res.status(500).send("Error");
  }
});

// Render przypisuje port w zmiennej PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Serwer działa na porcie ${PORT}`);
});
