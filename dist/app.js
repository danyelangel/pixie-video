'use strict';

var midi = require('midi');
var debounce = require('debounce');
var Omx = require('node-omxplayer');

// Set up a new input. 
var input = new midi.input();

function runVideo(channel) {
  var player = Omx('clip' + channel + '.mp4');
}

function debouncedHandler(deltaTime, message) {
  return debounce(function (deltaTime, message) {
    if ((message[0] - 128) / 16 > 0) {
      runVideo(59 - message[1]);
    }
  }, 100);
}

// Configure a callback. 
input.on('message', debouncedHandler());

// Open the first available input port. 
input.openPort(0);

module.exports = input;