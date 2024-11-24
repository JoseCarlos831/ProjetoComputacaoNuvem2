const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');

class EstoqueController {
  // Listar todos os itens do estoque
  async listarEstoque(req, res) {
    try {
      const estoques = await Estoque.findAll({
        include: { model: Produto, as: 'produto' },
      });
      res.json(estoques);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar estoque', details: error });
    }
  }

  // Registrar entrada no estoque
  async registrarEntrada(req, res) {
    const { produtoIdProduto, quantidade } = req.body;
    if (!produtoIdProduto || !quantidade || quantidade <= 0) {
      return res.status(400).json({ error: 'Dados inválidos: produtoIdProduto e quantidade devem ser fornecidos e a quantidade deve ser maior que 0' });
    }
    try {
      let estoque = await Estoque.findOne({ where: { produtoIdProduto } });
      if (!estoque) {
        estoque = await Estoque.create({
          produtoIdProduto,
          quantidadeEstoque: quantidade,
          quantidadeMin: 0,
          quantidadeMax: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        estoque.quantidadeEstoque += quantidade;
        await estoque.save();
      }
      return res.json(estoque);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar entrada no estoque', details: error });
    }
  }

  // Registrar saída do estoque
  async registrarSaida(req, res) {
    const { produtoIdProduto, quantidade } = req.body;
    if (!produtoIdProduto || !quantidade || quantidade <= 0) {
      return res.status(400).json({ error: 'Dados inválidos: produto_id_produto e quantidade devem ser fornecidos e a quantidade deve ser maior que 0' });
    }
    try {
      const estoque = await Estoque.findOne({ where: { produtoIdProduto } });
      if (!estoque) return res.status(404).json({ error: 'Estoque não encontrado' });

      if (estoque.quantidadeEstoque < quantidade) {
        return res.status(400).json({ error: 'Quantidade insuficiente no estoque' });
      }

      estoque.quantidadeEstoque -= quantidade;
      await estoque.save();

      return res.json(estoque);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar saída no estoque', details: error });
    }
  }

  async atualizarQuantidade(req, res) {
    const { id } = req.params; // Produto ID passado como parâmetro na rota
    const { quantidade } = req.body;

    if (quantidade == null || quantidade < 0) {
      return res.status(400).json({ error: 'A quantidade deve ser fornecida e não pode ser negativa' });
    }

    try {
      const estoque = await Estoque.findOne({ where: { produtoIdProduto: id } });
      if (!estoque) return res.status(404).json({ error: 'Produto não encontrado no estoque' });

      estoque.quantidadeEstoque = quantidade; // Atualiza diretamente a quantidade
      await estoque.save();

      return res.status(200).json({ message: 'Quantidade atualizada com sucesso', estoque });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar quantidade', details: error });
    }
  }
}

module.exports = new EstoqueController();
