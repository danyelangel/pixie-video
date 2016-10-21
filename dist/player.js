'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(debounce, midi, Omx) {
    var _this = this;

    _classCallCheck(this, Player);

    // Set up a new input. 
    var input = new midi.input();

    this.debounce = debounce;
    this.Omx = Omx;

    // Configure a callback. 
    input.on('message', function (deltaTime, message) {
      console.log(message);
      _this.debouncedHandler()(deltaTime, message);
    });

    // Open the first available input port. 
    input.openPort(0);
  }

  _createClass(Player, [{
    key: 'debouncedHandler',
    value: function debouncedHandler() {
      var _this2 = this;

      return this.debounce(function (deltaTime, message) {
        if ((message[0] - 128) / 16 > 0) {
          _this2.runVideo(59 - message[1]);
        }
      }, 100);
    }
  }, {
    key: 'runVideo',
    value: function runVideo(channel) {
      console.log(channel);
      if (this.player) {
        this.player.stop();
        this.player = null;
      }
      if (this.channel !== channel) {
        this.player = this.Omx('clip' + channel + '.mp4');
        this.player.play();
      }
      this.channel = channel;
    }
  }]);

  return Player;
}();

module.exports = Player;