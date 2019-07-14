var MongoClient = require('mongodb');
var url = "mongodb://127.0.0.1:27017/";

module.exports = function (query, dados,callback){

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("azul");
  var myquery = query;
  var newvalues = { $set: dados};
  dbo.collection("estoques").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
}); 	
	
}