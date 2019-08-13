var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;
const {ObjectId} = require('mongodb')

module.exports = function (dados,callback,atualizarFullVenda = false){

MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db("azul");
  var myquery ={_id: ObjectId(dados._id)};
  delete dados._id
  var newvalues = atualizarFullVenda === true ? {$set:dados}: { $set: {status: dados.status} };

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