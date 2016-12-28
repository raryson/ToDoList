// Retrieve
module.exports = function() {
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");

    var collection = db.collection('CS_Umbler');
    //monto o objeto pra ser insrido
    var docs = [{nome:"Raryson",idade:20}, {nome:"Leonardo",idade:23}, {nome:"Daniel",idade:21}];

    //dou um insert no objeto
  /*  collection.insert(docs, {w:1}, function(err, result) {
        collection.update({nome:"Raryson"}, {$push:{docs:{nome:"Rarysinho"}}}, {w:1}, function(err, result) {});
      });*/

    //select chavoso
      collection.find().toArray(function(err, items) {
      console.log(items);
    });

    //collection.findOne(/*O que vou pesquisar*/{nome:"Raryson"}, /*callback chavoso de uma função anonima*/function(err, item) {
      //console.log(item);
    //});

  }
});
}
