class Player {
  constructor(debounce, midi, omx) {
    this.midi = midi;
    this.debounce = debounce;
    this.omx = omx;
    this.listenMidi(() => {
      this.prepareVideos(6);
      console.log('Videos Loaded');
    }, endpointId => {
      if (endpointId < 6) {
        this.playVideo(endpointId);
      }
    });
  }
  listenMidi(ready, callback) {
    // Set up a new input.
    var input = new this.midi.input();

    ready();

    console.log(input.getPortName(1) + ' ready');

    // Open the first available input port.
    input.openPort(1);

    // Configure a callback.
    input.on('message', (deltaTime, message) => {
      this.debouncedHandler(endpointId => {
        callback(endpointId);
      })(deltaTime, message);
    });



    this.isPlaying = false;
    this.channel = null;

    ready();
  }
  debouncedHandler(callback) {
    let endpointId;
    return this.debounce((deltaTime, message) => {
      if ((message[0]-128)/16 > 0) {
        endpointId = 59 - message[1];
        callback(endpointId);
      }
    }, 100);
  }
  prepareVideos(number) {
    //this.omx.setVideosExtension('.mp4');
    //this.omx.setVideosDirectory('/home/pi/');
    this.omxVideos = [];
    for(let i = 0; i < number; i++) {
      if (i === 1) {
        this.omxVideos[i] = this.omx.create('/home/pi/track' + i + '.mp4');
      }
    }
  }
  playVideo(channel) {
    if (this.channel) {
      if (this.omxVideos[this.channel] && this.omxVideos[this.channel].stop) {
        this.omxVideos[this.channel].stop();
      }
      console.log(`Stopped ${this.channel}`);
    }
    if (this.channel !== channel) {
      this.channel = channel;
      if (this.omxVideos[this.channel] && this.omxVideos[this.channel].start) {
        this.omxVideos[this.channel].start();
      }
      console.log(`Started ${this.channel}`);
    } else {
      this.channel = null;
    }
  }
}

module.exports = Player;
