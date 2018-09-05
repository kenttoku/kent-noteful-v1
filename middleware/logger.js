const express = require('express');
const app = express();

const logger = app.use((req, res, next) => {
  const currentDate = new Date();
  const method = req.method;
  const url = req.url;
  
  console.log(currentDate, method, url);
  next();
});

module.exports = {
  logger
};