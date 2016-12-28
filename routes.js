 module.exports = function(app) {
   var mongo = require('./mongo.js');

  app.get('/',function(req, res){
      var nome = '', idade = '', listao = '';
      res.render('index',{
        nome: nome,
        idade: idade,
        listao: listao
      })
  })
var oi;
  app.post('/',function(req, res){
    var name = req.body.nome;
    var idade = req.body.idade;

    var pessoa = { nome:name, idade: idade};
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
      if(!err) {

          var collection = db.collection('CS_Umbler');
          collection.find().toArray(function(err, items) {

              for(var i = 0;i<items.length;i++){
                oi += " "+items[i].nome;

              }

        });
      }
    });

    res.render('index',{
      nome: "O teu nome é " + pessoa.nome,
      idade: "A tua idade é " +pessoa.idade,
      listao: oi
    })

    console.log(pessoa.nome, pessoa.idade);
  })
}
