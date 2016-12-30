var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

//chamando rotas
var route = require('./routes.js')(app);

//chamando conexão com o banco






var port = process.env.PORT || 8000
app.listen(port,function(){
  console.log("Rodando na porta 8000")
})
