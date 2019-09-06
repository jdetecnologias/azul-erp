const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const EstoqueSchema = new mongoose.Schema(
	{
		codigo: 	{type:String, required:true}	,
		qtdTotal: 	{type:Number,required:true}	,
		qtdDisponivel: {type:Number, required:true},
		qtdAlocada:{type:Number, required:true} 
	}
)

EstoqueSchema.plugin(mongooseStringQuery)
EstoqueSchema.plugin(timestamps)

const Estoque = mongoose.model('Estoque',EstoqueSchema)
module.exports = Estoque