var keypress = require('keypress');
var debounce = require('debounce');
var Omx = require('node-omxplayer');
var Player = require('./player');

module.exports = new Player(debounce, keypress, Omx);
