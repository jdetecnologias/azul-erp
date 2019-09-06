var MongoClient = require('mongodb');
var config = require('../config')
const ObterEstoque = require('./estoque')
var url = config.db.uri;
const {ObjectId} = require('mongodb')

module.exports = function (produto,callback){
MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db("azul");
  var myquery ={_id: ObjectId(produto._id)};
  delete produto._id
  var newvalues =  {$set:dados}: 
  dbo.collection("vendas").updateOne(myquery, newvalues, function(err,res) {
	 if(err) throw err
	 dbo.collection("vendas").find(myquery).toArray(function(err,result){
		if(err)  throw err
		callback(result)
	 })
	
    dbk.close();
  });
});

}