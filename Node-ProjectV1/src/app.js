const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const myconnection = require('express-myconnection');
const mysql = require('mysql');

const routerUsuario = require ('./routes/user');

//configuracion del puerto
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views' ));

app.use(morgan('dev'));

app.use(myconnection(mysql, {
  host:'localhost',
  user:'root',
  password:'12345',
  port:3306,
  database: 'DB_Restaurantes'
}, 'single'));

app.use(express.urlencoded({extended: true}));

app.use('/', routerUsuario);


app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log('Server on por 4000');
});
