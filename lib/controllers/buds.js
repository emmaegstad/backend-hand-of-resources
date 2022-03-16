const { Router } = require('express');
const Bud = require('../models/Bud');

module.exports = Router()
  .post('/', async (req, res) => {
    const bud = await Bud.insert(req.body);
    res.send(bud);
  })

  .get('/', async (req, res) => {
    const buds = await Bud.findAll();
    res.send(buds);
  });
