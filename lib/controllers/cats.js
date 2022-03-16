const { Router } = require('express');
// const Cat = require('../models/Cat');

module.exports = Router().post('/', async (req, res) => {
  //   const cat = await Cat.insert(req.body);
  //   res.send(cat);
  res.send({ id: '1', name: 'Daisy', age: 8, color: 'Brown Tabby' });
});
