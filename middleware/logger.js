'use strict';

const logger = function (req, res, next) {
  const currentDate = new Date();
  const method = req.method;
  const url = req.url;
  console.log(currentDate, method, url);
  next();
};

module.exports = {
  logger
};