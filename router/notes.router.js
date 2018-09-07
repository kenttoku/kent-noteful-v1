const express = require('express');
const notesRouter = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

notesRouter.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  notes.filter(searchTerm)
    .then(list => { res.json(list); })
    .catch(err => next(err));
});

notesRouter.get('/notes/:id', (req, res, next) => {
  const { id }= req.params;
  notes.find(id)
    .then(item => { item ? res.json(item) : next(); })
    .catch(err => next(err));
});

notesRouter.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj)
    .then(item => { item ? res.json(item) : next(); })
    .catch(err => next(err)); 
});

notesRouter.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  notes.create(newItem)
    .then(item => { item ? res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item) : next(); })
    .catch(err => next(err));
});

notesRouter.delete('/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.delete(id)
    .then(() => res.status(204).send('No Content'))
    .catch(err => next(err));
});

module.exports = notesRouter;