const express = require("express");
const router = express.Router();

// Importamos o repositório que agora gerencia nossos dados
const userRepository = require("../repositories/UserRepository");

// Listar todos os usuários
router.get("/", (req, res) => {
  const usuarios = userRepository.getAll();
  res.json(usuarios);
});

// Buscar usuário por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const usuario = userRepository.getById(id);

  // Se o usuário não for encontrado, o repositório retorna 'undefined'
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json(usuario);
});

// Criar novo usuário
router.post("/", (req, res) => {
  const novoUsuario = req.body;

  // Validação simples
  if (!novoUsuario.nome || !novoUsuario.email) {
    return res
      .status(400)
      .json({ mensagem: "Nome e email são obrigatórios" });
  }

  const usuarioCriado = userRepository.create(novoUsuario);
  res.status(201).json({
    mensagem: "Usuário criado com sucesso",
    usuario: usuarioCriado,
  });
});

// Atualizar usuário por ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  const usuarioAtualizado = userRepository.update(id, dadosAtualizados);

  if (!usuarioAtualizado) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json({
    mensagem: `Usuário ${id} atualizado`,
    usuario: usuarioAtualizado,
  });
});

// Excluir usuário
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sucesso = userRepository.delete(id);

  if (!sucesso) {
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  }

  res.json({ mensagem: `Usuário ${id} deletado com sucesso` });
});

module.exports = router;
