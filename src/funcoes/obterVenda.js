var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;
const {ObjectId} = require('mongodb')

module.exports = function (dados,callback){

MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db("config.db.collection);
  var myquery ={_id: ObjectId(dados._id)};

	 dbo.collection("vendas").find(myquery).toArray(function(err,result){
		if(err)  throw err
		callback(result)
		dbk.close();
	 })
});

}