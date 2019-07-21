module.exports =  function gravarMovimentacaoEstoque(aReqparams,callback) {
	const restifyMongoose = require('restify-mongoose')
	const errors = require('restify-errors')
	const MovimentacaoEstoque = require('../model/movimentacaoEstoque')
	const MoveEstoque = restifyMongoose(MovimentacaoEstoque)
	const  getqtdEstoque = require('../funcoes/estoque')
	const atualizarEstoque = require('../funcoes/atualizarEstoque')
	const Estoque = require('../model/estoque')
	
	
	const itens = aReqparams.itens
		switch(aReqparams.tipoDocumento){
			case 'venda':
				itens.map(item=>{
					let params = {}
					params.codigo = item.produto 
					params.qtd = item.qtd
					params.tipoDocumento = aReqparams.tipoDocumento
					params.movimento = aReqparams.movimento
					getqtdEstoque(params,function(data){
						data = data[0]

						if(aReqparams.status == 'PENDENTE'){
							params.qtdTotal = data.qtdTotal
							params.qtdDisponivel = data.qtdDisponivel - item.qtd
							params.qtdAlocada = item.qtd + data.qtdAlocada
						}else{ 
							params.qtdTotal = data.qtdTotal - item.qtd
							params.qtdDisponivel = data.qtdDisponivel - item.qtd
							params.qtdAlocada = data.qtdAlocada	  
						} 

				lEstoque = new MovimentacaoEstoque(params)
				lEstoque.save(function(err){
					if(!err){
						console.log(params)
						atualizarEstoque({_id: data._id},params,(linhasAfetada)=>{
							
						})
					}
				})
					})	// getqtdEstoque
				})//itens.map0
				callback(null)
			break
			case 'compra':
				getqtdEstoque(aReqparams,function(data){
				aReqparams.qtd = aReqparams.qtdTotal
				if(data.length < 1){				
					aReqparams.qtdDisponivel = aReqparams.qtdTotal
					aReqparams.qtdAlocada = 0
					
					let lEstoque = new Estoque(aReqparams)
					lEstoque.save(function(err) {
			
						if (err) {
							res.json({status:404})
						}else{
							lEstoque = new MovimentacaoEstoque(aReqparams)
							lEstoque.save(function(err){
								if(!err){
									atualizarEstoque({_id: data._id},aReqparams,(linhasAfetada)=>{
										
									})
								}
							})

						}
					})
				}
				else{
					data = data[0]
					const reqValorTotal = parseInt(aReqparams.qtdTotal);
					const qtdTotal = reqValorTotal + data.qtdTotal
					const qtdDisponivel = reqValorTotal + data.qtdDisponivel
					aReqparams.qtdTotal = qtdTotal
					aReqparams.qtdDisponivel = qtdDisponivel
					aReqparams.qtdAlocada = data.qtdAlocada
					aReqparams._id = data._id
					atualizarEstoque({_id: data._id},aReqparams,(linhasAfetadas)=>{
						if(linhasAfetadas <= 0 ) {		
							res.json({status:404})
						}else{
							lEstoque = new MovimentacaoEstoque(aReqparams)
							lEstoque.save(function(err){
								if(!err){
									atualizarEstoque({_id: data._id},aReqparams,(linhasAfetada)=>{
										
									})
								}
							})						
						}
					})
				}
			 })	
		 break
		}
}