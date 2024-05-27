const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Create and save a new person
router.post('/add', (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const person = new Person({ name, age, favoriteFoods });

  person.save((err, data) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(data);
  });
});

// Create many people
router.post('/addMany', (req, res) => {
  Person.create(req.body, (err, people) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(people);
  });
});

// Find people by name
router.get('/findByName/:name', (req, res) => {
  Person.find({ name: req.params.name }, (err, people) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(people);
  });
});

// Find one person by favorite food
router.get('/findOneByFood/:food', (req, res) => {
  Person.findOne({ favoriteFoods: req.params.food }, (err, person) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(person);
  });
});

// Find person by ID
router.get('/findById/:id', (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(person);
  });
});

// Update person by ID
router.put('/update/:id', (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return res.status(500).send(err);

    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(updatedPerson);
    });
  });
});

// Update person by name
router.put('/updateByName/:name', (req, res) => {
  Person.findOneAndUpdate({ name: req.params.name }, { age: 20 }, { new: true }, (err, updatedPerson) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(updatedPerson);
  });
});

// Remove person by ID
router.delete('/removeById/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, removedPerson) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(removedPerson);
  });
});

// Remove all people named Mary
router.delete('/removeMany', (req, res) => {
  Person.remove({ name: 'Mary' }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Query chain
router.get('/queryChain', (req, res) => {
  Person.find({ favoriteFoods: 'burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(data);
    });
});

module.exports = router;
