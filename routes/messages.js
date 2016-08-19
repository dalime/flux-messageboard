const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.route('/')
  .get((req, res) => {
    Message.find({}, (err, messages) => {
      res.status(err ? 400: 200).send(err || messages);
    })
  })

module.exports = router;
