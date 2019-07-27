var MongoClient = require('mongodb');
var config = require('../config')
var url = config.db.uri;
const {ObjectId} = require('mongodb')

module.exports = function (dados,callback){

MongoClient.connect(url, function(err, dbk) {
  if (err) throw err;
  var dbo = dbk.db("azul");
  var myquery ={_id: ObjectId(dados._id)};
  var newvalues = { $set: {status: dados.status} };

  dbo.collection("vendas").updateOne(myquery, newvalues, function(err,res) {
	 if(err) throw err
	callback(res.result.nModified)
    dbk.close();
  });
});

}