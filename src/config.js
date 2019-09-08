module.exports = {
	port: process.env.PORT || 3003,
	name: 'Azul ERP',
	env:  process.env.NODE_ENV || 'development',
	base_url: process.env.BASE_URL || 'https://azul-api.herokuapp.com',
	db: {
		uri:  'mongodb+srv://azul-erp:azulerp@azulerp-x6r9p.mongodb.net/azul?retryWrites=true&w=majority',
	}
}