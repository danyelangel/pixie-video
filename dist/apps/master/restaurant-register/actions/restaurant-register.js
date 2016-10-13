'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('promise');

var Action = function () {
  function Action(firebase, firebases) {
    _classCallCheck(this, Action);

    var db = firebase.database(),
        ref = db.ref('restaurants');

    this.onInit(ref);
  }

  _createClass(Action, [{
    key: 'onInit',
    value: function onInit(ref) {
      this.restaurants = ref;
    }
  }, {
    key: 'dispatch',
    value: function dispatch() {
      var _this = this;

      return new Promise(function (resolve) {
        var userRef = _this.restaurants.push();
        userRef.child('exists').set(true).then(function () {
          resolve(userRef.key);
        });
      });
    }
  }]);

  return Action;
}();

module.exports = function (firebase, firebases) {
  return new Action(firebase, firebases);
};