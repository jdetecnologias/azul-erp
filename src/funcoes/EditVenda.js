const getQtdEstoque = require('./estoque')
const novoMovimentacaoEstoque = require('./atualizarEstoque')
const f = require('./funcoes')()

module.exports = function(AitensAntigos,AitensNovos){
	itensModificados = []
	itensAntigos = [].concat(AitensAntigos)
	itensNovos = [].concat(AitensNovos)
	let itemAux = []

	for(let i = 0; i<itensAntigos.length;i++){
		for(let z = 0 ; z<itensNovos.length;z++){
			
			if(itensAntigos[i].produto == itensNovos[z].produto){
				if(itensAntigos[i].qtd !== itensNovos[z].qtd){
					const diff = f.subtrair(itensNovos[z].qtd,itensAntigos[i].qtd)
					itensModificados.push({produto: itensNovos[z].produto, qtd: diff})
				}

				itensAntigos.splice(i,1)
				itensNovos.splice(z,1)
				
			}
			break
		}
	}
	for(let a = 0; a<itensAntigos.length;a++){
		itensAntigos[a].qtd  *= -1
	}

	return itensModificados.concat(itensNovos).concat(itensAntigos)
}