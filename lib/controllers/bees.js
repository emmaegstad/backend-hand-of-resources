const { Router } = require('express');
const Bee = require('../models/Bee');

module.exports = Router().post('/', async (req, res) => {
  const bee = await Bee.insert(req.body);
  res.send(bee);
});
