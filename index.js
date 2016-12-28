var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

//chamando rotas
var route = require('./routes.js')(app);

//chamando conexão com o banco







app.listen(3000,function(){
  console.log("Rodando na porta 3000")
})
