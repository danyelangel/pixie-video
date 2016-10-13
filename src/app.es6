let ArduinoFirmata = require('arduino-firmata'),
    arduino = new ArduinoFirmata();
arduino.connect();

arduino.on('connect', function(){
 
  console.log("board version"+arduino.boardVersion);
  // your-code-here 
 
});

module.exports = fb;
