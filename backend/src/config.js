module.exports = {
	port: 3003,
	name: 'Azul ERP',
	env:  'development',
	base_url: 'http://localhost:3003',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb+srv://azul-erp:azulerp@azulerp-x6r9p.mongodb.net/azul?retryWrites=true&w=majority',
	}
}