module.exports = function (req,res,next){
	const validarEstoque = require('./validarEstoque')
	const Vendas = require('../model/vendas')
	const novoMovimentacaoEstoque = require('./movimentacaoEstoque')
	const logError = validarEstoque(req.params.itens,function(logError){
		if(logError.length === 0){ 
			//console.log('nao att', req.params)
		const Venda = new Vendas(req.params)
		
			Venda.save(function(err){
				if (err){
					res.json({status:404})
					}else{
					req.params.movimento = 'saida'
					req.params.tipoDocumento = 'venda'
					novoMovimentacaoEstoque(req.params,function(err,docs){
						if (err) {		
							res.json({status:404})
						}else{
							console.log('venda realizada com sucesso')
							res.status(201)
							res.json({status:200})
						}
					})
				}//else
			})// vendas.save
		}
		else{ 
			console.log(logError)
			res.json({status:404,logError})
		}
	})				
}