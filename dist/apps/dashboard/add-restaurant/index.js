'use strict';

var registerRestaurantAction = require('./register-restaurant.action'),
    restaurantUpdateAction = require('./restaurant-update.action'),
    usernameAvailabilityReducer = require('./username-availability.reducer'),
    zoneAutocompleteReducer = require('./zone-autocomplete.reducer'),
    zoneAddAction = require('./zone-add.action');

function routeFunc(state, firebase, firebases) {
  // Methods
  state.addAction({
    name: 'registerRestaurant',
    action: registerRestaurantAction(firebase, firebases)
  });
  state.addAction({
    name: 'restaurantUpdate',
    action: restaurantUpdateAction(firebase, firebases)
  });
  state.addAction({
    name: 'zoneAdd',
    action: zoneAddAction(firebase, firebases)
  });
  // Query
  state.addReducer({
    name: 'usernameAvailability',
    reducer: usernameAvailabilityReducer(firebase)
  });
  state.addReducer({
    name: 'zoneAutocomplete',
    reducer: zoneAutocompleteReducer(firebase)
  });
}

module.exports = routeFunc;