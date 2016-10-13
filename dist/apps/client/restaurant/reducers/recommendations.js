'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fuse = require('fuse.js'),
    _ = require('underscore'),
    Promise = require('promise');

var RecommendationsReducer = function () {
  function RecommendationsReducer(firebase) {
    _classCallCheck(this, RecommendationsReducer);

    var db = firebase.database(),
        ref = db.ref('restaurants');

    this.onInit(ref);
  }

  _createClass(RecommendationsReducer, [{
    key: 'onInit',
    value: function onInit(ref) {
      var _this = this;

      ref.on('value', function (snapshot) {
        var restaurants = snapshot.val();
        _this.restaurants = _.toArray(restaurants);
      });
    }
  }, {
    key: 'query',
    value: function query(params) {
      var _this2 = this;

      return new Promise(function (resolve) {
        resolve(_this2.restaurants);
      });
    }
  }]);

  return RecommendationsReducer;
}();

module.exports = function (firebase) {
  return new RecommendationsReducer(firebase);
};