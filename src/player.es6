class Player {
  constructor(debounce, midi, Omx) {

    // Set up a new input.
    var input = new midi.input();

    this.debounce = debounce;
    this.Omx = Omx;
    console.log(input.getPortName(1) + ' ready');
    // Configure a callback.
    input.on('message', (deltaTime, message) => {
      this.debouncedHandler()(deltaTime, message);
    });

    // Open the first available input port.
    input.openPort(1);

    this.isPlaying = false;
    this.channel = null;
  }
  debouncedHandler() {
    let videoId;
    return this.debounce((deltaTime, message) => {
      if ((message[0]-128)/16 > 0) {
        videoId = 59 - message[1];
        this.runVideo(videoId);
      }
    }, 100);
  }
  runVideo(channel) {
    if (this.channel) {
      console.log(`Stopped ${this.channel}`);
    }
    if (this.channel !== channel) {
      this.channel = channel;
      console.log(`Started ${this.channel}`);
    } else {
      this.channel = null;
    }



//    if (this.channel !== channel) {
//      this.player = this.Omx(`clip${channel}.mp4`);
//      this.player.play();
//    }
//    this.channel = channel;
  }
}

module.exports = Player;
