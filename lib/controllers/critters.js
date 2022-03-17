const { Router } = require('express');
const Critter = require('../models/Critter');

module.exports = Router()
  .post('/', async (req, res) => {
    const critter = await Critter.insert(req.body);
    res.send(critter);
  })

  .get('/', async (req, res) => {
    const critters = await Critter.findAll();
    res.send(critters);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const critter = await Critter.findById(req.params.id);
      res.send(critter);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const critter = await Critter.updateById(req.params.id, req.body);
    res.send(critter);
  })

  .delete('/:id', async (req, res) => {
    const critter = await Critter.deleteById(req.params.id);
    res.send(critter);
  });
