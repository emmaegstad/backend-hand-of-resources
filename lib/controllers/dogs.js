const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .post('/', async (req, res) => {
    const dog = await Dog.insert(req.body);
    res.send(dog);
  })

  .get('/', async (req, res) => {
    const dogs = await Dog.findAll();
    res.send(dogs);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const dog = await Dog.findById(req.params.id);
      res.send(dog);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
