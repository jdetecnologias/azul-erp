const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const MovimentacaoEstoqueSchema = new mongoose.Schema(
	{
		codigo: {
			type: String,
			required: true,
			trim: true,
		}
		,qtd: {
			type: Number,
			required: true,
			min:0
		}
		,movimento:{
			type: String,
			required:true,
			enum: ['entrada','saida','alocado']
		}
		,qtdTotal: {
			type: Number,
			required: true,
			min:0
		}
		,qtdDisponivel: {
			type: Number,
			required: true,
			min:0
		}
		,qtdAlocada: {
			type: Number,
			required: true,
			min:0
		}
		,numeroDocumento: {
			type: String,
			required: false,
			min:0
		}
		,tipoDocumento: {
			type: String,
			required: true,
			min:0
		}
	}
);

MovimentacaoEstoqueSchema.plugin(mongooseStringQuery);
MovimentacaoEstoqueSchema.plugin(timestamps);

const MovimentacaoEstoque = mongoose.model('MovimentacaoEstoque', MovimentacaoEstoqueSchema);
module.exports = MovimentacaoEstoque;