module.exports = function gravarMovimentacaoEstoque(params,callback) {
const restifyMongoose = require('restify-mongoose')
const errors = require('restify-errors')
const MovimentacaoEstoque = require('../model/movimentacaoEstoque')
const MoveEstoque = restifyMongoose(MovimentacaoEstoque)	

	const dados = {
					codigo: params.codigo
					, qtd: +params.qtd
					, movimento:params.movimento
					,saldoTotal: params.qtdTotal
					,saldoDisponivel: params.qtdDisponivel
					,saldoAlocado: params.qtdTotal - params.qtdDisponivel
				}
				
	let lMovEstoque = new MovimentacaoEstoque(dados)
	lMovEstoque.save(function(err) {
		console.log(err)
		callback(err)
	})
}