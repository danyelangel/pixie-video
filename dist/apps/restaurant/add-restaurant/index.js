'use strict';

var createAction = require('./create.action'),
    updateProfileAction = require('./update-profile.action'),
    profileReducer = require('./profile.reducer'),
    usernameAvailabilityReducer = require('./username-availability.reducer'),
    zoneAutocompleteReducer = require('./zone-autocomplete.reducer');

function routeFunc(state, firebase, firebases) {
  // Methods
  state.addAction({
    name: 'create',
    action: createAction(firebase, firebases)
  });
  state.addAction({
    name: 'updateProfile',
    action: updateProfileAction(firebase, firebases)
  });
  // Query
  state.addReducer({
    name: 'profile',
    reducer: profileReducer(firebase)
  });
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