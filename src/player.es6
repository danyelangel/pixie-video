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
      this.omxVideos[i] = this.omx.create('/home/pi/track' + i + '.mp4');
      this.omxVideos[i].on('play', () => {
        this.canPlay = false;
      });
      this.omxVideos[i].on('stop', () => {
        this.canPlay = true;
      });
      this.omxVideos[i].on('end', () => {
        this.canPlay = true;
      });
    }
    this.canPlay = true;
  }
  playVideo(channel) {
    console.log(channel);
    if (this.canPlay) {
      console.log('Playin\'');
      this.omxVideos[channel].play();
    }
  }
}

module.exports = Player;
