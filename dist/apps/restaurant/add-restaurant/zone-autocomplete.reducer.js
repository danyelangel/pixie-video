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

var Fuse = require('fuse.js'),
    _ = require('underscore'),
    Promise = require('promise');

var ZoneAutocompleteReducer = function () {
  function ZoneAutocompleteReducer(firebase) {
    _classCallCheck(this, ZoneAutocompleteReducer);

    var db = firebase.database(),
        ref = db.ref('zones');

    this.onInit(ref);
  }

  _createClass(ZoneAutocompleteReducer, [{
    key: 'onInit',
    value: function onInit(ref) {
      var _this = this;

      ref.on('value', function (snapshot) {
        var zones = snapshot.val(),
            options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          keys: []
        };
        _this.zones = _.toArray(zones);
        _this.fuse = new Fuse(_this.zones, options);
      });
    }
  }, {
    key: 'query',
    value: function query(params) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var zones = _.map(_this2.fuse.search(params.query), function (item) {
          return _this2.zones[item];
        });
        resolve(zones);
      });
    }
  }]);

  return ZoneAutocompleteReducer;
}();

module.exports = function (firebase) {
  return new ZoneAutocompleteReducer(firebase);
};