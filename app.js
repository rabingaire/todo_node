const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.end("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
