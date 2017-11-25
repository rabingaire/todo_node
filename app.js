const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/users');

const port = 3000;

const app = express();

const path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.redirect('/users');
});

app.get('/users/new', function(req, res) {
  res.render("user_new_form");
});

app.post('/users', function (req, res) {
  const name = req.body.name;
  const user = new User({name: name});

  user.save()
    .then((savedUser) => {
      res.redirect(`/users/${savedUser._id}`)
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

// code that renders all the users
app.get('/users', (req, res) => {
  User.find({})
    .select('name')
    .then(users => {
      res.render("users", {users: users});
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

// code that deleted the user info
app.delete('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  User.remove({_id: userId})
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

// code that updates the data
app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = {_id: userId};
  const data = req.body;
  
  User.update(query, {$set: data})
    .then(() => {
      res.redirect(`/users/${userId}`);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

// code that renders the edit form
app.get('/users/:userId/edit', (req, res) => {
  const query = {_id: req.params.userId};
  User.findOne(query)
    .then((user) => {
      res.render('user_edit_form', {user: user});
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

// code that shows user detail
app.get('/users/:userId', (req, res) => {
  const query = {_id: req.params.userId};
  User.findOne(query)
    .select('name')
    .then(user => {
      res.render("user", {user: user});
    })
    .catch((err) => {
      res.statusCode = 400;
      res.end(err.message);
    });
});

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
