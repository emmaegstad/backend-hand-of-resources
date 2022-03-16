const { Router } = require('express');
// const Cat = require('../models/Cat');

module.exports = Router().post('/', async (req, res) => {
  res.send({ id: '1', name: 'Minnie', age: 7, color: 'Brown Tabby' });
});
