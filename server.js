'use strict';

// Load array of notes
const data = require('./db/notes');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  return res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  return res.json(data.find(item => item.id === Number(id)));
});

app.listen(8080, function() {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
