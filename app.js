const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;

const app = express();

const path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes/user.routes'));
app.use('/api/users', require('./routes/user.api.routes'));

// connect to mongo database 
connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen() {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

function connect() {
  var mongoDB = 'mongodb://localhost/todo_database';
  return mongoose.connect(mongoDB, {
    useMongoClient: true
  });
}
