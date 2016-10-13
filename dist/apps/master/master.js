'use strict';

function appFunc(app) {
  app.buildApi('apps/master', {
    'restaurant-add': {
      actions: ['restaurant-push']
    },
    'restaurant-register': {
      actions: ['restaurant-register'],
      reducers: ['username-availability']
    },
    'restaurant-detail': {
      actions: ['restaurant-update', 'zone-add'],
      reducers: ['zone-autocomplete']
    }
  });
}

module.exports = appFunc;