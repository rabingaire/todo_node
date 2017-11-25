const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.end("Hello World!");
});

app.get('/hello_form', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/hello_form.html'));
});

app.post('/hello', function (req, res) {
  res.end(`Hello ${req.body.name}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
