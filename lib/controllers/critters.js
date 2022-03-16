const { Router } = require('express');
const Critter = require('../models/Critter');

module.exports = Router().post('/', async (req, res) => {
  const critter = await Critter.insert(req.body);
  res.send(critter);
});
