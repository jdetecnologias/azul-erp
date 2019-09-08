module.exports =  function(itens,callback){
			const getqtdEstoque = require('./estoque')
			let logError = []
			console.log('validarEstoque')
				let counter = 0

				 itens.map(item=>{
					 getqtdEstoque(item,function(data){
						 counter++
					
						data = data[0] 
						if(data.length <=0){
							
							logError.push({erro: 'Não existe o produto no estoque',produto: item.produto})
						}
						else{
							
							if(data.qtdDisponivel < item.qtd){
								logError.push({erro: 'Não há quantidade disponíveis no estoque. QTD DISPONÍVEL:'+data.qtdDisponivel+' QTD SOLICITADA:'+item.qtd,produto: item.produto})
							}		
						}
						
						if(counter === itens.length){
							callback(logError)
						}
					})
	
				})	
				

		}