const express = require('express');
const EstoqueController = require('../controllers/EstoqueController');

const router = express.Router();

router.get('/estoque', EstoqueController.listarEstoque);
router.post('/estoque/entrada', EstoqueController.registrarEntrada);
router.post('/estoque/saida', EstoqueController.registrarSaida);
router.put('/atualizar/:id', EstoqueController.atualizarQuantidade);

module.exports = router;
