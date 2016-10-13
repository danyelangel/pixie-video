'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fuse = require('fuse.js'),
    _ = require('underscore'),
    Promise = require('promise');

var AutocompleteReducer = function () {
  function AutocompleteReducer(firebase) {
    _classCallCheck(this, AutocompleteReducer);

    var db = firebase.database(),
        ref = db.ref('restaurants');

    this.onInit(ref);
  }

  _createClass(AutocompleteReducer, [{
    key: 'onInit',
    value: function onInit(ref) {
      var _this = this;

      ref.on('value', function (snapshot) {
        var restaurants = snapshot.val(),
            options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          keys: ['profile.name', 'profile.description']
        };
        _this.restaurants = _.toArray(restaurants);
        _this.fuse = new Fuse(_this.restaurants, options);
      });
    }
  }, {
    key: 'query',
    value: function query(params) {
      var _this2 = this;

      return new Promise(function (resolve) {
        resolve(_this2.fuse.search(params.query));
      });
    }
  }]);

  return AutocompleteReducer;
}();

module.exports = function (firebase) {
  return new AutocompleteReducer(firebase);
};