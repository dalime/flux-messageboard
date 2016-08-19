const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/messages';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

require('mongoose').connect(MONGO_URI, err => {
  if (err) throw err;
  console.log(`MongoDB connected to ${MONGO_URI}`);
})

const app = express();

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', require('../routes/api'));

app.get('*', (req, res) => {
  let indexPath = path.join(__dirname, '../index.html');
  res.sendFile(indexPath);
})

app.listen(PORT, err => {
  if (err) throw err;

  console.log(`Server listening at http://localhost:${PORT}`);
})
