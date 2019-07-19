const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const MovimentacaoEstoqueSchema = new mongoose.Schema(
	{
		codigo: {
			type: String,
			required: true,
			trim: true,
		},
		qtd: {
			type: Number,
			required: true,
			min:0
		},
		movimento:{
			type: String,
			required:true,
			enum: ['entrada','saida','alocado']
		}
	}, 
	{ minimize: false },
);

MovimentacaoEstoqueSchema.plugin(mongooseStringQuery);
MovimentacaoEstoqueSchema.plugin(timestamps);

const MovimentacaoEstoque = mongoose.model('MovimentacaoEstoque', MovimentacaoEstoqueSchema);
module.exports = MovimentacaoEstoque;