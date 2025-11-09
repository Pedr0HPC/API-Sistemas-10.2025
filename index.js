require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

// Importa as rotas de usuários
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
 res.json({ message: "API rodando dentro do Codespaces!" });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Servidor rodando na porta ${port}`);
});

const pool = require("./db");

// Comando SQL para criar a tabela (IF NOT EXISTS não dá erro se já existir)
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    criadoEm TIMESTAMP DEFAULT NOW(),
    atualizadoEm TIMESTAMP
);
`;

// 1. Executa a query para criar a tabela
pool.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("ERRO AO CRIAR A TABELA 'users':", err);
    return;
  }

  console.log("Tabela 'users' verificada ou criada com sucesso.");

  // 2. Agora, testa a conexão
  pool.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error("Erro ao conectar ao banco:", err);
    } else {
      console.log("Banco conectado e pronto:", result.rows[0]);
    }
  });
});