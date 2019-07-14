const restifyMongoose = require('restify-mongoose')
const errors = require('restify-errors')

const MovimentacaoEstoque = require('./model/movimentacaoEstoque')
const Produto = require('./model/produto')
const Vendas = require('./model/vendas')
const Estoque = require('./model/estoque')
const product = restifyMongoose(Produto)
const MoveEstoque = restifyMongoose(MovimentacaoEstoque)
const Sales = restifyMongoose(Vendas)
const  lEstoque = restifyMongoose(Estoque)
const  getqtdEstoque = require('./funcoes/estoque')
const atualizarEstoque = require('./funcoes/atualizarEstoque')
module.exports = function(server) {
	
	server.get('/produto',product.query())
	server.post('/produto',product.insert())
	server.get('/entrada',MoveEstoque.query())
	server.post('/entrada',MoveEstoque.insert())
	server.get('/vendas',Sales.query())
	server.post('/vendas',Sales.insert())
	server.get('/estoque',lEstoque.query())
	server.post('/estoque',(req,res,next)=>{

	
		getqtdEstoque(req.params,function(data){
			if(data.length < 1){
								
				req.params.qtdDisponivel = req.params.qtdTotal
				req.params.qtdAlocada = 0
				
				let lEstoque = new Estoque(req.params)
				lEstoque.save(function(err) {
					if (err) {
						console.error(err)
						return next(new errors.InternalError(err.message))
					next()
					}

					res.send(201)
					next()

				})
			}
			else{
				data = data[0]
				const reqValorTotal = parseInt(req.params.qtdTotal);
				const qtdTotal = reqValorTotal + data.qtdTotal
				const qtdDisponivel = reqValorTotal + data.qtdDisponivel
				req.params.qtdTotal = qtdTotal
				req.params.qtdDisponivel = qtdDisponivel
				req.params.qtdAlocada = data.qtdAlocada
				req.params._id = data._id
				console.log(data._id)
				const dados = req.params
				atualizarEstoque({_id: data._id},req.params)
				/*let pEstoque = new Estoque(req.params)

				/*pEstoque.updateOne({_id:data._id},{$set: req.params},function(err) {
					if (err) {
						console.error(err)
						return next(new errors.InternalError(err.message))
					next()
					}

					res.send(201)
					next()

				})*/
			}
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