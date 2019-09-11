var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;
/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
*/

module.exports =  function (params,callback){
MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db(config.db.collection);
	dbo.collection("estoques").find({codigo: params.codigo?params.codigo:params.produto}).toArray(function(err, result) {
    if (err) throw err;
	callback(result)
  	  dbk.close();
  });
});
	
}