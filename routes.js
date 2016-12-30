var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

 module.exports = function(app) {


   app.get('/', (req, res) => {
     MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
       if(!err) {
         var collection = db.collection('Pessoas3')
         const resultadoDoFind = collection.find();
         resultadoDoFind.toArray(function(err, items) {
         listao = items;
         count = listao.length;

         res.render('index')
   });
   db.close();
 }});
   })


  app.post('/adicionar',function(req, res){
    MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
      if(!err) {
          var collection = db.collection('Pessoas3')
          var objetoElementoASerCadastrado = { elementoAserCadastrado:req.body.elementoAserCadastrado};
          console.log(objetoElementoASerCadastrado)
          collection.insert(objetoElementoASerCadastrado, function(err, result) {
            var idDoObjetoDoMongo = result.insertedIds.toString()
            var respostaParaOHTML = {elementoAserCadastrado: req.body.elementoAserCadastrado, id: idDoObjetoDoMongo}
            res.json(respostaParaOHTML);
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
