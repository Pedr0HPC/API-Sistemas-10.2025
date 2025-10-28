const express = require("express");
const router = express.Router();

// Listar todos os usuários
router.get("/", (req, res) => {
 res.json([{ id: 1, nome: "Ana" }, { id: 2, nome: "Carlos" }]);
});

// Buscar usuário por ID
router.get("/:id", (req, res) => {
 const id = req.params.id;
 res.json({ id, nome: "Usuário Exemplo" });
});

// Criar novo usuário
router.post("/", (req, res) => {
 const novoUsuario = req.body;
 res.status(201).json({
 mensagem: "Usuário criado com sucesso",
 usuario: novoUsuario
 });

});

// Atualizar usuário por ID
router.put("/:id", (req, res) => {
 const id = req.params.id;
 const dadosAtualizados = req.body;
 res.json({
 mensagem: `Usuário ${id} atualizado`,
 dados: dadosAtualizados
 });

});

// Excluir usuário
router.delete("/:id", (req, res) => {
 const id = req.params.id;
 res.json({ mensagem: `Usuário ${id} deletado` });
});

module.exports = router;
