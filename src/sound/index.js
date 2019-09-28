const Sound = require("react-native-sound");

// Enable playback in silence mode
Sound.setCategory("Playback");

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
const whoosh = new Sound("clave.wav", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
  }
});

whoosh.setVolume(100);

export default {
  play: () => whoosh.stop(() => whoosh.play())
};
