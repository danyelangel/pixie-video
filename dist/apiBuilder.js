'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* globals require, module, console */
var firebaseLib = require('firebase'),
    _ = require('underscore'),
    fb = {},
    db = void 0;

var Route = function () {
  function Route(name, firebase, firebases) {
    _classCallCheck(this, Route);

    this.name = name;
    this.db = firebase.database();
    this.firebases = firebases;
  }

  // Firing events


  _createClass(Route, [{
    key: 'queryReducer',
    value: function queryReducer(params) {
      var req = params.request,
          res = params.response,
          endpointId = params.endpointId,
          reducer = params.reducer,
          query = params.parameters,
          db = params.database;
      req.transaction(function (requestSnapshot) {
        if (requestSnapshot) {
          reducer.query(query).then(function (newData) {
            res.set(newData);
            db.ref('history').push({
              timestamp: firebaseLib.database.ServerValue.TIMESTAMP,
              type: 'reducer',
              userId: req.key,
              endpointId: endpointId,
              query: query
            });
          });
          return null;
        }
      });
    }
  }, {
    key: 'dispatchAction',
    value: function dispatchAction(params) {
      var req = params.request,
          res = params.response,
          endpointId = params.endpointId,
          action = params.action,
          query = params.parameters,
          db = params.database;

      req.transaction(function (requestSnapshot) {
        if (requestSnapshot) {
          action.dispatch(query).then(function (newData) {
            res.set(newData);
            db.ref('history').push({
              timestamp: firebaseLib.database.ServerValue.TIMESTAMP,
              type: 'action',
              userId: req.key,
              endpointId: endpointId,
              query: query
            });
          });
          return null;
        }
      });
    }
    // Registering event listeners

  }, {
    key: 'addReducer',
    value: function addReducer(params) {
      var _this = this;

      var db = this.db,
          endpointId = params.endpointId,
          reducer = params.reducer,
          apiReq = db.ref('api/' + params.endpointId + '/requests'),
          apiRes = void 0;
      console.log('Reducer initiated: ' + endpointId);
      apiReq.on('child_added', function (snapshot) {
        apiRes = db.ref('api/' + endpointId + '/responses/' + snapshot.key);
        _this.queryReducer({
          request: apiReq.child(snapshot.key),
          response: apiRes,
          endpointId: endpointId,
          reducer: reducer,
          parameters: snapshot.child('parameters').val(),
          database: db
        });
      });
    }
  }, {
    key: 'addAction',
    value: function addAction(params) {
      var _this2 = this;

      var db = this.db,
          endpointId = params.endpointId,
          action = params.action,
          apiReq = db.ref('api/' + endpointId + '/requests'),
          apiRes = void 0;
      console.log('Action initiated: ' + endpointId);
      apiReq.on('child_added', function (snapshot) {
        apiRes = db.ref('api/' + params.endpointId + '/responses/' + snapshot.key);
        _this2.dispatchAction({
          request: apiReq.child(snapshot.key),
          response: apiRes,
          endpointId: endpointId,
          action: action,
          parameters: snapshot.child('parameters').val(),
          database: db
        });
      });
    }
  }]);

  return Route;
}();

var App = function () {
  function App(databaseId, firebase, fb) {
    _classCallCheck(this, App);

    this.firebase = firebase.initializeApp({
      databaseURL: 'https://' + databaseId + '.firebaseio.com',
      serviceAccount: './credentials/firebase-credentials-' + databaseId + '.json'
    }, databaseId);
    fb.firebases[databaseId] = this.firebase;
    this.firebases = fb.firebases;
  }

  _createClass(App, [{
    key: 'addRoute',
    value: function addRoute(name, callback) {
      callback(new Route(name, this.firebase, this.firebases), this.firebase, this.firebases);
    }
  }, {
    key: 'buildApi',
    value: function buildApi(root, routes) {
      var _this3 = this;

      _.each(routes, function (route, routeId) {
        _this3.addRoute(routeId, function (state, firebase, firebases) {
          _.each(route.actions, function (actionId) {
            state.addAction({
              endpointId: actionId,
              action: require('./' + root + '/' + routeId + '/actions/' + actionId)(firebase, firebases)
            });
          });
          _.each(route.reducers, function (reducerId) {
            state.addReducer({
              endpointId: reducerId,
              reducer: require('./' + root + '/' + routeId + '/reducers/' + reducerId)(firebase, firebases)
            });
          });
        });
      });
    }
  }]);

  return App;
}();

var Fb = function () {
  function Fb(firebase) {
    _classCallCheck(this, Fb);

    this.firebase = firebase;
    this.firebases = {};
  }

  _createClass(Fb, [{
    key: 'addApp',
    value: function addApp(databaseId, callback) {
      callback(new App(databaseId, this.firebase, this));
    }
  }]);

  return Fb;
}();

module.exports = new Fb(firebaseLib);