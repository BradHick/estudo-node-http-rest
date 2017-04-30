var express = require('express');
var consign = require('consign');
const bodyParser = require('body-parser');

module.exports = function() {
  var app = express();

  consign()
      .include('controllers')
      .into(app);

  return app;
};
