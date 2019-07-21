module.exports =  function gravarMovimentacaoEstoque(aReqparams,callback) {
	const restifyMongoose = require('restify-mongoose')
	const errors = require('restify-errors')
	const MovimentacaoEstoque = require('../model/movimentacaoEstoque')
	const MoveEstoque = restifyMongoose(MovimentacaoEstoque)
	const  getqtdEstoque = require('../funcoes/estoque')
	const atualizarEstoque = require('./funcoes/atualizarEstoque')
	
	const itens = aReqparams.itens

	itens.map(item=>{
						let params = {}
						params.codigo = item.produto
						params.movimento = 'saida'
						params.tipoDocumento = 'venda' 
						params.qtd = item.qtd
			
						getqtdEstoque(params,function(data){
							data = data[0]
							console.log(data)
							if(aReqparams.status == 'PENDENTE'){
								params.saldoTotal = data.qtdTotal
								params.saldoDisponivel = data.qtdTotal - item.qtd
								params.saldoAlocado = item.qtd + data.qtdAlocada
							}else{ 
								params.saldoTotal = data.qtdTotal - item.qtd
								params.saldoDisponivel = +params.qtdTotal
								params.saldoAlocado = data.qtdAlocada	 
							} 

					lEstoque = new MovimentacaoEstoque(params)
					lEstoque.save(function(err){
						
					})
						})	// getqtdEstoque
					})//itens.map0
					callback(null)
}