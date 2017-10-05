const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const models = require('./models');

const apiRoutes = require('./routes/api');
const indexRoutes = require('./routes/index');

const config = require('./config/index');
const app = express();

const port = process.env.PORT || 8081;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization-Token");
  next();
})

app.use('/api', apiRoutes);
// app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Ić stont (∩ ͡° ͜ʖ ͡°)⊃━☆');
});
app.listen(port);
console.log(`App listening on port ${port}`)
module.exports = app;
