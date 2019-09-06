const mongoose = require('mongoose')
const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')

const ProdutoSchema = new mongoose.Schema(
	{
		codigo: 	{type:Number, required:true}	,
		descricaoCompleta: 	{type:String,required:true}	,
		container:{type:Number,required:true},
		subcontainer:{type:Number,required:true},
		desc:{type:Number,required:true},
		cor:{type:Number,required:true}
	}
)

ProdutoSchema.plugin(mongooseStringQuery)
ProdutoSchema.plugin(timestamps)

const Produto = mongoose.model('Produto',ProdutoSchema)
module.exports = Produto