const restifyMongoose = require('restify-mongoose')
const errors = require('restify-errors')

const MovimentacaoEstoque = require('./model/movimentacaoEstoque')
const Produto = require('./model/produto')
const Vendas = require('./model/vendas')
const Estoque = require('./model/estoque')
const novoMovimentacaoEstoque = require('./funcoes/movimentacaoEstoque')
const product = restifyMongoose(Produto)
const MoveEstoque = restifyMongoose(MovimentacaoEstoque)
const Sales = restifyMongoose(Vendas)
const  lEstoque = restifyMongoose(Estoque)
const  getqtdEstoque = require('./funcoes/estoque')
const atualizarVenda = require('./funcoes/atualizarStatusVenda')
const atualizarEstoque = require('./funcoes/atualizarEstoque')
module.exports = function(server) {
	
	server.get('/produto',product.query())
	server.post('/produto',product.insert())
	server.get('/entrada',MoveEstoque.query())
	server.post('/entrada',MoveEstoque.insert())
	server.get('/vendas',Sales.query())
	
 server.post('/vendas',(req,res,next)=>{

let logError = []		
		const validarEstoque =   function(){

				let counter = 0
				const itens = req.params.itens 
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
							salvarVenda()
						}
					})
	
				})	
				

		}

		 function salvarVenda(){

			if(logError.length === 0){
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
		 }
		 			validarEstoque()
	})//server.post
	
	server.get('/estoque',lEstoque.query())
	server.get('/move',MoveEstoque.query())
	server.post('/estoque',(req,res,next)=>{
		req.params.movimento = 'entrada'
		req.params.tipoDocumento = 'compra'
 		novoMovimentacaoEstoque(req.params,function(err,docs){
			if (err) {
				res.json({status:404})
			}else{
				res.status(201)
				res.json({status:200})
			}
		})
	}) 
	
	
server.put('/finalizarVenda',(req,res,next)=>{
	req.params.status = 'PAGO' 
	atualizarVenda(req.params,function(venda){
		venda = venda[0]
		venda.tipoDocumento = 'vendaFinalizada'
		venda.movimento = 'saida'
		novoMovimentacaoEstoque(venda,function(err,docs){
			if (err) {
				res.json({status:404})
			}else{
				res.status(201)
				res.json({status:200})
			}	
		})
	})
})	

server.put('/cancelarVenda',(req,res,next)=>{
		req.params.status = 'CANCELADA'
	atualizarVenda(req.params,function(venda){
		venda = venda[0]
		venda.tipoDocumento = 'vendaCancelada'
		venda.movimento = 'saida'
		novoMovimentacaoEstoque(venda,function(err,docs){
			if (err) {
				res.json({status:404})
			}else{
				res.status(201)
				res.json({status:200})
			}	
		})
	})
})
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		/*server.get('/entrada', (req, res, next) => {
		MovimentacaoEstoque.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err)
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				)
			}
			const retorno = docs ? docs : {msn:'Nada encontrado'}
			res.send(retorno)
			next()
		})
	})
	server.post('/entrada', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			)
		}

		let data = req.body || {}

		let Movimentacao = new MovimentacaoEstoque(data)
		Movimentacao.save(function(err) {
			if (err) {
				console.error(err)
				return next(new errors.InternalError(err.message))
				next()
			}

			res.send(201)
			next()
		})
	})*/
	
/*	server.post('/produto', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			)
		}

		let data = req.body || {}

		let Prod = new Produto(data)
		Prod.save(function(err) {
			if (err) {
				console.error(err)
				return next(new errors.InternalError(err.message))
				next()
			}

			res.send(201)
			next()
		})
	})*/
	
	/*server.get('/produto', (req, res, next) => {
		Produto.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err)
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				)
			}
			const retorno = docs ? docs : {msn:'Nada encontrado'}
			res.send(retorno)
			next()
		})
	})*/
}    

