var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

 module.exports = function(app) {

   app.get('/home', (req,res) =>{
     res.render('home/index')
   })

   app.get('/', (req, res) => {
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
   })


  app.post('/registrar', function(req, res){
    MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
      if(!err) {
        var collection = db.collection(req.body.email);
            objetoElementoASerCadastrado = {email: req.body.email, senha: req.body.senha, list: [{}] }
        collection.insert(objetoElementoASerCadastrado, function(err, result) {})
      }db.close()
    })
      res.sendStatus(200);
  })

  app.post('/logar', function(req, res){
    MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
      if(!err) {
        var collection = db.collection(req.body.email);
        const resultadoDoFind = collection.find({email:req.body.email ,senha: req.body.senha});
        resultadoDoFind.toArray(function(err, items) {
        if(items.length == 1){
          res.json({logou:"Logado com sucesso",email:req.body.email})
        }else{
          res.send("senha incorreta ou usuário inválido")
        }
          });
        }
        db.close();
     })

  })


  app.post('/adicionar',function(req, res){
    MongoClient.connect("mongodb://raryson:123456@ds149258.mlab.com:49258/teste", function(err, db) {
      if(!err) {
          var collection = db.collection('Users')
          var objetoElementoASerCadastrado = { elementoAserCadastrado:req.body.elementoAserCadastrado};
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
