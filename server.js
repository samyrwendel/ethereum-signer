// server.js
const express = require("express");
const { Wallet } = require("ethers");

const app = express();
app.use(express.json());

const PORT        = process.env.PORT || 3001;
const PRIVATE_KEY = process.env.HL_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error("❌ HL_PRIVATE_KEY não definida!");
  process.exit(1);
}
const wallet = new Wallet(PRIVATE_KEY);

app.get("/", (_, res) => {
  res.json({ status: "Ethereum Signer está online" });
});

app.post("/sign", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Campo message é obrigatório" });
    }

    // valida JSON básico
    const obj = JSON.parse(message);
    if (!obj.nonce) {
      return res.status(400).json({ error: "message deve conter nonce" });
    }

    const signature = await wallet.signMessage(message);
    return res.json({
      address: wallet.address,
      signature,
      nonce: obj.nonce,
    });
  } catch (error) {
    console.error("Erro ao assinar:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🟢 Ethereum Signer rodando na porta ${PORT}`);
});