var midi = require('midi');
var debounce = require('debounce');
var Omx = require('node-omxplayer');
var Player = require('./player');

console.log(Player);

module.exports = new Player(debounce, midi, Omx);
