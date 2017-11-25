const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/users');

const port = 3000;

const app = express();

const path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.end("Hello World!");
});

app.get('/hello_form', function(req, res) {
  res.render("hello_form");
});

app.post('/hello', function (req, res) {
  const name = req.body.name;
  const user = new User({name: name});

  user.save()
    .then((data) => {
      res.end(`Hello ${data.name}, we have saved you.`);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

app.get('/users', (req, res) => {
  User.find({})
    .select('name')
    .then(users => {
      //Need to use send method to respond with JSON
      res.render("users", {users: users});
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

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
