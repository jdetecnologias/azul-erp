const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const ItensSchema = new mongoose.Schema({
	produto:{type:String, required:true},
	qtd:{type:Number, required:true},
	valorUnitario:{type:Number, required:true}	
})
const VendasSchema = new mongoose.Schema(
	{
		nomeCliente: 	{type:String, required:true}	,
		itens: 	[ItensSchema],
                valorTotalPedido:{type:String, required:true},
		status: {type: String, required: false, uppercase:true, enum: ['PAGO','PENDENTE','CANCELADA']}
	}
)

VendasSchema.plugin(mongooseStringQuery)
VendasSchema.plugin(timestamps)

const Venda = mongoose.model('Vendas',VendasSchema)
module.exports = Venda