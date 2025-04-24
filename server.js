const express = require('express');
const { Wallet } = require('ethers');
const app = express();

const PORT = process.env.PORT || 3001;
const PRIVATE_KEY = process.env.HL_PRIVATE_KEY;

console.log('Iniciando Ethereum Signer');
console.log(`Porta: ${PORT}`);

if (!PRIVATE_KEY) {
  console.error('ERRO: Chave privada não definida');
  process.exit(1);
}

app.use(express.json());

app.get("/", (req, res) => {
  console.log('Rota raiz acessada');
  res.json({ status: "Ethereum Signer está online" });
});

app.post("/sign", async (req, res) => {
  try {
    console.log('Recebendo solicitação de assinatura');
    const { message } = req.body;

    if (!message) {
      console.warn('Mensagem não fornecida');
      return res.status(400).json({ error: "Mensagem é obrigatória" });
    }

    const wallet = new Wallet(PRIVATE_KEY);
    const signature = await wallet.signMessage(message);

    console.log('Mensagem assinada com sucesso');
    res.json({
      address: wallet.address,
      signature
    });
  } catch (error) {
    console.error('Erro na assinatura:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Ethereum Signer rodando na porta ${PORT}`);
});
