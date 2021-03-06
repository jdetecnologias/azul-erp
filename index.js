const config = require('./src/config');
const cors = require('./src/cors/cors')
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');

const server = restify.createServer({
	name: config.name,
	version: config.version
});

server.pre(cors.preflight);  
server.use(cors.actual); 
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

server.listen(config.port, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri, { useMongoClient: true });

	const db = mongoose.connection;
	console.log('BEFORE')
	db.on('error', (err) => {
		if(err){
			console.log('ERROROROROOROROROOROROR',err)
		}
	    console.error(err);
	    process.exit(1);
	});
	console.log('LATER')
	db.once('open', () => {
	    require('./src/routes')(server);
	    console.log(`Server is listening on port ${config.port}`);
	});
});
