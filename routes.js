var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

 module.exports = function(app) {
   var mongo = require('./mongo.js');

  app.get('/',function(req, res){
      MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
        if(!err) {
          var collection = db.collection('Pessoas3')
          const resultadoDoFind = collection.find();
          resultadoDoFind.toArray(function(err, items) {
          listao = items;
          res.render('index')
    });
    db.close();
  }});
});
  app.post('/adicionar',function(req, res){
    var name = req.body.nome;
    var idade = req.body.idade;
    MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
      if(!err) {
          var collection = db.collection('Pessoas3')
          var pessoa = { nome:name, idade: idade};
          collection.insert(pessoa, function(err, result) {
            var id = result.insertedIds.toString()
            var resposta = {nome: name, idade: idade, id: id}
            res.json(resposta);
          })
      }
      db.close();
    })
  })


  app.post('/remover',function(req, res){
    MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
      if(!err) {
          var collection = db.collection('Pessoas3');
          var id = req.body.id
          collection.deleteOne({_id: ObjectID(id)}, function(err, items) {
            if (err) {
                res.send(err)
            }

            res.sendStatus(200);
              db.close();

          })
      }
    })
})
}
