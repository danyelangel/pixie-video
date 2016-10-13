'use strict';

var searchReducer = require('./search');

function routeFunc(state, firebase) {
  state.addReducer({
    name: 'search',
    reducer: searchReducer(firebase)
  });
}

module.exports = routeFunc;