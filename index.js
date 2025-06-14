const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Produto = require('./models/Produto'); // certifique-se de que esse caminho está certo

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

// Rota POST - Cadastrar novo produto
app.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    // Validação manual básica (opcional, mas ajuda a debugar)
    if (!nome || !descricao) {
      return res.status(400).send({ erro: 'Nome e descrição são obrigatórios.' });
    }

    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.status(201).send(novoProduto);
  } catch (err) {
    console.error(err);
    res.status(400).send({ erro: 'Erro ao cadastrar produto', detalhes: err.message });
  }
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando com sucesso na porta ${PORT}`);
});
