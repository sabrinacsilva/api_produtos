
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Produto = mongoose.model('Produto', new mongoose.Schema({
  nome: String,
  descricao: String,
  cor: String,
  peso: Number,
  tipo: String,
  preco: Number,
  dataCadastro: String
}));

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).send('Produto não encontrado');
    res.json(produto);
  } catch {
    res.status(400).send('ID inválido');
  }
});

app.post('/produtos', async (req, res) => {
  const novoProduto = new Produto(req.body);
  await novoProduto.save();
  res.status(201).json(novoProduto);
});

app.put('/produtos/:id', async (req, res) => {
  try {
    const atualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).send('Produto não encontrado');
    res.json(atualizado);
  } catch {
    res.status(400).send('ID inválido');
  }
});

app.delete('/produtos/:id', async (req, res) => {
  try {
    const removido = await Produto.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).send('Produto não encontrado');
    res.send('Produto deletado');
  } catch {
    res.status(400).send('ID inválido');
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('API rodando com sucesso');
    });
  })
  .catch(err => console.error('Erro na conexão com MongoDB:', err));
