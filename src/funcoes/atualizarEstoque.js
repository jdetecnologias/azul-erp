var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;

module.exports = function (query, dados,callback){

MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db(config.db.collection);
  var myquery = query;
  var newvalues = { $set: dados};
  dbo.collection("estoques").updateOne(myquery, newvalues, function(err, res) {
	callback(res.result.nModified)
    dbk.close();
  });
});

}