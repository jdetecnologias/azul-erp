const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const FinanceiroSchema = new mongoose.Schema(
	{
		documento: 	{type:String, required:true}	,
		valorTotal: 	{type:Number,required:true}	,
		qtdDisponivel: {type:Number, required:true},
		qtdAlocada:{type:Number, required:true} 
	}
)

FinanceiroSchema.plugin(mongooseStringQuery)
FinanceiroSchema.plugin(timestamps)

const Financeiro = mongoose.model('Estoque',FinanceiroSchema)
module.exports = Financeiro