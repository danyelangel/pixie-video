'use strict';

function appFunc(app) {
  app.buildApi('apps/client', {
    'home': {
      reducers: ['search-autocomplete', 'recommendations']
    },
    'restaurant': {
      actions: ['make-reservation'],
      reducers: ['recommendations']
    },
    'search': {
      reducers: ['query']
    }
  });
}

module.exports = appFunc;