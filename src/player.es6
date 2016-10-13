class Player {
  constructor(debounce, midi, Omx) {
    // Set up a new input. 
    let input = new midi.input();

    this.debounce = debounce;
    
    

    // Configure a callback. 
    input.on('message', debouncedHandler());

    // Open the first available input port. 
    input.openPort(0);
  }
  debouncedHandler(deltaTime, message) {
    return this.debounce((deltaTime, message) => {
      if ((message[0]-128)/16 > 0) {
        runVideo((59 - message[1]));
      }
    }, 100);
  }
  runVideo(channel) {
    if (this.player) {
      this.player.stop();
      this.player = null;
    }
    if (this.channel !== channel) {
      this.player = this.Omx(`clip${channel}.mp4`);
      this.player.play();
      this.channel = channel;
    }
  }
}

module.exports = Player;