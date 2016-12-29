var MongoClient = require('mongodb').MongoClient;

 module.exports = function(app) {
   var mongo = require('./mongo.js');

  app.get('/',function(req, res){
      var nome = '', idade = '', listao = [], numero = '';
      res.render('index',{
        nome: nome,
        idade: idade,
        numero: numero,
        listao: listao
      })
  })

  app.post('/',function(req, res){
    var name = req.body.nome;
    var idade = req.body.idade;
    MongoClient.connect("mongodb://localhost:27017/teste", function(err, db) {
      if(!err) {
          var collection = db.collection('Pessoas');
          collection.find().count().then(function(numItems) {
            var numero = numItems+1;
            console.log(numero);
            callback(numItems);
          })
          var pessoa = { nome:name, idade: idade, numero: numero};
          console.log(pessoa)
          collection.insert(pessoa, {w:1}, function(err, result) {})
          const resultadoDoFind = collection.find();
          resultadoDoFind.toArray(function(err, items) {
              listao = items;
              res.render('index', {
                listao: items
              })
        });
      }
      db.close();
    })
  })


  app.post('/remover',function(req, res){
    MongoClient.connect("mongodb://localhost:27017/teste", function(err, db) {
      if(!err) {
        console.log("maoe")
          var collection = db.collection('Pessoas');


          collection.deleteOne({a:1}, function(err, items) {
            if (err) {
              res.send(err);
            }

            res.sendStatus(200);
          })
      }

      db.close();
    })
})

}
