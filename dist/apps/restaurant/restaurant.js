'use strict';

var addRestaurant = require('./add-restaurant');

function appFunc(app) {
  app.addRoute('addRestaurant', addRestaurant);
}

module.exports = appFunc;