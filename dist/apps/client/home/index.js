'use strict';

var autocompleteReducer = require('./autocomplete'),
    recommendationsReducer = require('./recommendations');

function routeFunc(state, firebase) {
  state.addReducer({
    name: 'autocomplete',
    reducer: autocompleteReducer(firebase)
  });
  state.addReducer({
    name: 'recommendations',
    reducer: recommendationsReducer(firebase)
  });
}

module.exports = routeFunc;