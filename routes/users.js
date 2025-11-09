// routes/users.js
const express = require("express");
const router = express.Router();
const userRepository = require("../repositories/UserRepository");

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await userRepository.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
});

// Buscar usuário por ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await userRepository.getById(id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
});

// Criar novo usuário
router.post("/", async (req, res) => {
  try {
    const novoUsuario = req.body;
    if (!novoUsuario.nome || !novoUsuario.email) {
      return res
        .status(400)
        .json({ mensagem: "Nome e email são obrigatórios" });
    }

    const usuarioCriado = await userRepository.create(novoUsuario);
    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      usuario: usuarioCriado,
    });
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
});

// Atualizar usuário por ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    const usuarioAtualizado = await userRepository.update(id, dadosAtualizados);

    if (!usuarioAtualizado) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({
      mensagem: `Usuário ${id} atualizado`,
      usuario: usuarioAtualizado,
    });
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
});

// Excluir usuário
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sucesso = await userRepository.delete(id);

    if (!sucesso) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({ mensagem: `Usuário ${id} deletado com sucesso` });
  } catch (err) {
    res.status(500).json({ mensagem: err.message });
  }
});

module.exports = router;