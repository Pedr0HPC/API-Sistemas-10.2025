const pool = require("../db"); // Importa a conexão do PostgreSQL

class UserRepository {
  constructor() {
    console.log("UserRepository (PostgreSQL) inicializado.");
  }

  async getAll() {
    // Busca todos os usuários na tabela 'users' (Criada pelo Index.js)
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return rows;
  }

  async getById(id) {
    // Busca um usuário pelo ID
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0]; // Retorna o primeiro (e único) resultado, ou undefined
  }

  async create(item) {
    const { nome, email } = item;
    // Insere o novo usuário e retorna o registro completo (RETURNING *)
    const { rows } = await pool.query(
      "INSERT INTO users (nome, email, criadoEm) VALUES ($1, $2, NOW()) RETURNING *",
      [nome, email]
    );
    return rows[0];
  }

  async update(id, item) {
    const { nome, email } = item;
    // Atualiza o usuário e retorna o registro atualizado
    const { rows } = await pool.query(
      "UPDATE users SET nome = $1, email = $2, atualizadoEm = NOW() WHERE id = $3 RETURNING *",
      [nome, email, id]
    );
    return rows[0];
  }

  async delete(id) {
    // Deleta o usuário
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    // rowCount será 1 se deletou, 0 se não encontrou
    return rowCount > 0;
  }
}

// Exporta uma instância única
module.exports = new UserRepository();
