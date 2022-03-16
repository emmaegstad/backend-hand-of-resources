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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const bud = await Bud.findById(req.params.id);
      res.send(bud);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const bud = await Bud.updateById(req.params.id, req.body);
    res.send(bud);
  })

  .delete('/:id', async (req, res) => {
    const bud = await Bud.deleteById(req.params.id);
    res.send(bud);
  });
