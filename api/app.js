var createError = require('http-errors');
var express = require('express');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./configs/config');

var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var carrerasRouter = require('./routes/carreras');
var materiasRouter = require('./routes/materias');
var alumnosRouter = require('./routes/alumnos');

// 1
app.set('llave', config.llave);
// 2
app.use(bodyParser.urlencoded({ extended: true }));
// 3
app.use(bodyParser.json());

// 5
app.get('/', function(req, res) {
    res.send('Inicio');
});

app.post("/autenticar", (req, res) => {
  
  if (req.body.usuario === "root" && req.body.password === "root") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("llave"), {
      expiresIn: 1440,
    });
    res.json({
      mensaje: "Autenticación correcta",
      token: token,
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/car', carrerasRouter);
app.use('/mat', materiasRouter);
app.use('/alu', alumnosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
