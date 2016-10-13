class Player {
  constructor(debounce, midi, Omx) {
    // Set up a new input. 
    let input = new midi.input();

    this.debounce = debounce;
    this.Omx = Omx;
    
    // Configure a callback. 
    input.on('message', this.debouncedHandler());

    // Open the first available input port. 
    input.openPort(0);
    console.log('heyy');
  }
  debouncedHandler() {
    return this.debounce((deltaTime, message) => {
      console.log(message);
      if ((message[0]-128)/16 > 0) {
        this.runVideo((59 - message[1]));
      }
    }, 100);
  }
  runVideo(channel) {
    console.log(channel);
    if (this.player) {
      this.player.stop();
      this.player = null;
    }
    if (this.channel !== channel) {
      this.player = this.Omx(`clip${channel}.mp4`);
      this.player.play();
    }
    this.channel = channel;
  }
}

module.exports = Player;