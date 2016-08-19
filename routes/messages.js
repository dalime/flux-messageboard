const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.route('/')
  .get((req, res) => {
    Message.find({}, (err, messages) => {
      res.status(err ? 400: 200).send(err || messages);
    })
  })
  .post((req, res) => {
    Message.create(req.body, (err, newMessage) => {
      res.status(err ? 400: 200).send(err || newMessage);
    })
  })

router.get('/:id')
  .get((req, res) => {
    Message.findById(req.params.id, (err, message) => {
      res.status(err ? 400: 200).send(err || message);
    })
  })
  .delete((req, res) => {
    Message.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400: 200).send(err || `Message ${req.params.id} was deleted!`);
    })
  })
  .put((req, res) => {
    Message.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, message) => {
      res.status(err ? 400: 200).send(err || message);
    })
  })

module.exports = router;
