var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;


module.exports =  function (callback){
MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db(config.db.collection);
	dbo.collection("vendas").find({},{projection: {_id:1, valorTotalPedido:1,status:1,createdAt:1}}).toArray(function(err, result) {
    if (err) throw err;
	callback(result)
  	  dbk.close();
  });
});
	
}