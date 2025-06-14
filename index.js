const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Produto = require('./models/Produto'); // Certifique-se que o caminho está correto

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

// Rota GET - Página inicial
app.get('/', (req, res) => {
  res.send('🚀 API de Produtos está no ar!');
});

// Rota GET - Listar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find();
  res.send(produtos);
});

// Rota GET - Buscar por ID
app.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).send({ erro: 'Produto não encontrado' });
    res.send(produto);
  } catch (err) {
    res.status(400).send({ erro: 'ID inválido' });
  }
});

// ✅ NOVA ROTA: Buscar por nome
app.get('/produtos/nome/:nome', async (req, res) => {
  try {
    const produto = await Produto.findOne({ nome: req.params.nome });
    if (!produto) return res.status(404).send({ erro: 'Produto não encontrado' });
    res.send(produto);
  } catch (err) {
    res.status(400).send({ erro: 'Erro ao buscar produto por nome' });
  }
});

// Rota POST - Cadastrar novo produto
app.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      return res.status(400).send({ erro: 'Nome e descrição são obrigatórios.' });
    }

    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.status(201).send(novoProduto);
  } catch (err) {
    res.status(400).send({ erro: 'Erro ao cadastrar produto', detalhes: err.message });
  }
});

// Rota PUT - Atualizar produto
app.put('/produtos/:id', async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(produtoAtualizado);
  } catch (err) {
    res.status(400).send({ erro: 'Erro ao atualizar produto' });
  }
});

// Rota DELETE - Deletar produto
app.delete('/produtos/:id', async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.send({ mensagem: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(400).send({ erro: 'Erro ao excluir produto' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando com sucesso na porta ${PORT}`);
});
