'use strict';

var fb = require('./apiBuilder'),
    clientApp = require('./apps/client/client'),
    dashboardApp = require('./apps/master/master');

fb.addApp('pre-compro', function (firebase) {
  clientApp(firebase);
});

fb.addApp('pre-compro-preview', function (firebase) {
  dashboardApp(firebase);
});

module.exports = fb;