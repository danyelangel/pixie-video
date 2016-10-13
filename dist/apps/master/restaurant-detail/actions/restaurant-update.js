'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = require('promise');

var UpdateProfileAction = function () {
  function UpdateProfileAction(firebase) {
    _classCallCheck(this, UpdateProfileAction);

    var db = firebase.database(),
        ref = db.ref('restaurants');

    this.onInit(ref);
  }

  _createClass(UpdateProfileAction, [{
    key: 'onInit',
    value: function onInit(ref) {
      this.restaurants = ref;
    }
  }, {
    key: 'dispatch',
    value: function dispatch(params) {
      var _this = this;

      return new Promise(function (resolve) {
        _this.restaurants.child(params.restaurantId + '/profile').update(params.profile);
        resolve(_this.restaurants);
      });
    }
  }]);

  return UpdateProfileAction;
}();

module.exports = function (firebase) {
  return new UpdateProfileAction(firebase);
};