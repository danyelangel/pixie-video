'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Promise = require('promise');

var ProfileReducer = function () {
  function ProfileReducer(firebase) {
    _classCallCheck(this, ProfileReducer);

    var db = firebase.database(),
        ref = db.ref('restaurants');

    this.onInit(ref);
  }

  _createClass(ProfileReducer, [{
    key: 'onInit',
    value: function onInit(ref) {
      var _this = this;

      ref.on('value', function (snapshot) {
        _this.restaurants = snapshot.val();
      });
    }
  }, {
    key: 'query',
    value: function query(params) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var restaurant = _this2.restaurants[params.restaurantId];
        if (restaurant) {
          resolve(restaurant);
        } else {
          resolve(false);
        }
      });
    }
  }]);

  return ProfileReducer;
}();

module.exports = function (firebase) {
  return new ProfileReducer(firebase);
};