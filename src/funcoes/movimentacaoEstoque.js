module.exports =  function gravarMovimentacaoEstoque(aReqparams,callback) {
	const restifyMongoose = require('restify-mongoose')
	const errors = require('restify-errors')
	const MovimentacaoEstoque = require('../model/movimentacaoEstoque')
	const MoveEstoque = restifyMongoose(MovimentacaoEstoque)
	const  getqtdEstoque = require('../funcoes/estoque')
	const atualizarEstoque = require('../funcoes/atualizarEstoque')
	const Estoque = require('../model/estoque')
	const funcoes =  require('./funcoes')()
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
							params.qtdTotal = funcoes.somar(data.qtdTotal,0)
							params.qtdDisponivel = funcoes.subtrair(data.qtdDisponivel,item.qtd)
							params.qtdAlocada = funcoes.somar(item.qtd,data.qtdAlocada)
						}else{ 
							params.qtdTotal = funcoes.subtrair(data.qtdTotal,item.qtd)
							params.qtdDisponivel = funcoes.subtrair(data.qtdDisponivel,item.qtd)
							params.qtdAlocada = funcoes.somar(data.qtdAlocada,0)	  
						} 
						lEstoque = new MovimentacaoEstoque(params)
						lEstoque.save(function(err){
							if(!err){
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
						const qtdTotal = funcoes.somar(reqValorTotal,data.qtdTotal)
						const qtdDisponivel = funcoes.somar(reqValorTotal,data.qtdDisponivel)
						aReqparams.qtdTotal = funcoes.somar(qtdTotal)
						aReqparams.qtdDisponivel = funcoes.somar(qtdDisponivel)
						aReqparams.qtdAlocada = funcoes.somar(data.qtdAlocada)
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
			case 'vendaFinalizada':
				itens.map(item=>{
					let params = {}
					params.codigo = item.produto 
					params.qtd = item.qtd
					params.tipoDocumento = 	aReqparams.tipoDocumento
					params.movimento = aReqparams.movimento
					getqtdEstoque(params,function(data){
						data = data[0]
						params.qtdTotal = funcoes.subtrair(data.qtdTotal,item.qtd)
						params.qtdDisponivel = funcoes.somar(data.qtdDisponivel)
						params.qtdAlocada =  funcoes.subtrair(data.qtdAlocada,item.qtd)
	
						lEstoque = new MovimentacaoEstoque(params)
						lEstoque.save(function(err){
							if(!err){
								atualizarEstoque({_id: data._id},params,(linhasAfetada)=>{				
								})
							}
						})
					})	// getqtdEstoque
				})//itens.map0
				callback(null)				
			break
			case 'vendaCancelada':
				itens.map(item=>{
					let params = {}
					params.codigo = item.produto 
					params.qtd = item.qtd
					params.tipoDocumento = 	aReqparams.tipoDocumento
					params.movimento = aReqparams.movimento
					getqtdEstoque(params,function(data){
						data = data[0]
						params.qtdTotal = funcoes.somar(data.qtdTotal,0)
						params.qtdDisponivel = funcoes.somar(data.qtdDisponivel,item.qtd)
						params.qtdAlocada =  funcoes.subtrair(data.qtdAlocada,item.qtd)
						lEstoque = new MovimentacaoEstoque(params)
						lEstoque.save(function(err){
							if(!err){
								atualizarEstoque({_id: data._id},params,(linhasAfetada)=>{				
								})
							}
						})
					})	// getqtdEstoque
				})//itens.map0
				callback(null)				
			break
			case 'realocacao': // neste caso deve ser instanciado cada item
				
			break;
		}
}