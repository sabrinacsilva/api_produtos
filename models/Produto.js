const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  cor: String,
  peso: String,
  tipo: String,
  preco: Number,
  dataCadastro: String
});

module.exports = mongoose.model('Produto', produtoSchema);
