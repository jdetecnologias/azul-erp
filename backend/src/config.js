module.exports = {
	port: 3003,
	name: 'Azul ERP',
	env:  'development',
	base_url: 'http://localhost:3003',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/azul',
	}
}