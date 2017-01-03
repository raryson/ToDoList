var express = require('express');
    cookieParser = require('cookie-parser')
    bodyParser = require('body-parser');
    app = express();

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
//chamando rotas
var route = require('./routes.js')(app);

//chamando conexão com o banco

var port = process.env.PORT || 8000
app.listen(port,function(){
  console.log("Rodando na porta 8000")
})
