const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/messages';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

require('mongoose').connect(MONGO_URI, err => {
  if (err) throw err;
  console.log(`MongoDB connected to ${MONGO_URI}`);
})

const app = express();

app.use('/api', require('./routes/api'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello');
})

app.listen(PORT, err => {
  if (err) throw err;

  console.log(`Server listening at http://localhost:${PORT}`);
})
