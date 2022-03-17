const { Router } = require('express');
const Bee = require('../models/Bee');

module.exports = Router()
  .post('/', async (req, res) => {
    const bee = await Bee.insert(req.body);
    res.send(bee);
  })

  .get('/', async (req, res) => {
    const bees = await Bee.findAll();
    res.send(bees);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const bee = await Bee.findById(req.params.id);
      res.send(bee);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const bee = await Bee.updateById(req.params.id, req.body);
    res.send(bee);
  })

  .delete('/:id', async (req, res) => {
    const bee = await Bee.deleteById(req.params.id);
    res.send(bee);
  });
