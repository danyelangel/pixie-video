'use strict';

var midi = require('midi');
var debounce = require('debounce');
var OmxManager = require('omx-manager');
var Player = require('./player');

var omx = new OmxManager();

module.exports = new Player(debounce, midi, omx);