var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;

module.exports = function (query, dados,callback){

MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db("azul");
  var myquery = query;
  var newvalues = { $set: dados};
  dbo.collection("estoques").updateOne(myquery, newvalues, function(err, res) {

	callback(err, res)
    dbk.close();
  });
}); 	
	
}