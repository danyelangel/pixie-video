'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(debounce, midi, omx) {
    var _this = this;

    _classCallCheck(this, Player);

    this.midi = midi;
    this.debounce = debounce;
    this.omx = omx;
    this.listenMidi(function () {
      _this.prepareVideos(6);
    })(function (endpointId) {
      if (endpointId < 6) {
        _this.playVideo(endpointId);
      }
    });
  }

  _createClass(Player, [{
    key: 'listenMidi',
    value: function listenMidi(ready) {
      var _this2 = this;

      // Set up a new input.
      var input = new this.midi.input();

      console.log(input.getPortName(1) + ' ready');
      // Configure a callback.
      ready();
      return function (callback) {
        input.on('message', function (deltaTime, message) {
          _this2.debouncedHandler(function (endpointId) {
            callback(endpointId);
          })(deltaTime, message);
        });

        // Open the first available input port.
        input.openPort(1);

        _this2.isPlaying = false;
        _this2.channel = null;
      };
    }
  }, {
    key: 'debouncedHandler',
    value: function debouncedHandler(callback) {
      var endpointId = void 0;
      return this.debounce(function (deltaTime, message) {
        if ((message[0] - 128) / 16 > 0) {
          endpointId = 59 - message[1];
          callback(endpointId);
        }
      }, 100);
    }
  }, {
    key: 'prepareVideos',
    value: function prepareVideos(number) {
      this.omx.setVideosExtension('.mp4');
      this.omx.setVideosDirectory('/home/pi/');
      this.omxVideos = [];
      for (var i = 0; i < number; i++) {
        if (i = 1) {
          this.omxVideos[i] = this.omx.create('track' + i);
        }
      }
    }
  }, {
    key: 'playVideo',
    value: function playVideo(channel) {
      if (this.channel) {
        if (this.omxVideos[this.channel].stop) {
          this.omxVideos[this.channel].stop();
        }
        console.log('Stopped ' + this.channel);
      }
      if (this.channel !== channel) {
        this.channel = channel;
        if (this.omxVideos[this.channel].start) {
          this.omxVideos[this.channel].start();
        }
        console.log('Started ' + this.channel);
      } else {
        this.channel = null;
      }
    }
  }]);

  return Player;
}();

module.exports = Player;