'use strict';

var recommendationsReducer = require('./recommendations.reducer'),
    makeReservationAction = require('./make-reservation.action');

function routeFunc(state, firebase, firebases) {
  state.addReducer({
    name: 'recommendations',
    reducer: recommendationsReducer(firebase)
  });
  state.addAction({
    name: 'makeReservation',
    action: makeReservationAction(firebase, firebases)
  });
}

module.exports = routeFunc;