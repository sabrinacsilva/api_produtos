👩‍💻 Autoria
Este projeto foi desenvolvido por Sabrina Costa Silva
aluna do 5º semestre de Sistemas de Informação na Uni-FACEF,
como entrega avaliativa para a disciplina de Desenvolvimento Web.


# 🛠️ API REST de Produtos com MongoDB

Este projeto é uma **API RESTful** desenvolvida como parte de uma atividade acadêmica da disciplina de Desenvolvimento Web. 
A API realiza operações de **cadastro, leitura, atualização e exclusão de produtos** em um banco de dados **MongoDB**, sendo acessada de forma pública e documentada via Postman.

## 📌 Funcionalidades Implementadas

✔️ Listar todos os produtos  
✔️ Buscar produto por ID  
✔️ Buscar produto por nome  
✔️ Cadastrar novo produto  
✔️ Atualizar produto existente  
✔️ Deletar produto existente

## 🧪 Testes e Documentação

A API foi testada e documentada no **Postman**, com a documentação pública disponível no link abaixo:

🔗 [Documentação pública no Postman](https://documenter.getpostman.com/view/45891036/2sB2x6nYJ5)


## 🚀 Tecnologias Utilizadas

- Node.js  
- Express  
- MongoDB (via Mongoose)  
- Postman  
- Render (para deploy)

## 🧾 Estrutura da API

- `GET /produtos` → Lista todos os produtos  
- `GET /produtos/:id` → Busca produto por ID  
- `GET /produtos/nome/:nome` → Busca produto por nome  
- `POST /produtos` → Cadastra novo produto  
- `PUT /produtos/:id` → Atualiza produto existente  
- `DELETE /produtos/:id` → Deleta produto existente


