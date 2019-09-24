import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Step from "./components/step"
import Button from "./components/button"
// todo: support different sounds (at least 3 and one without sound
import clave from "./sound/index"
let interval;

export default function App() {

  // todo: refactor to better structure
  const [lastTapTempoDate, setLastTapTempoDate] = useState(new Date())
  const [steps, setSteps] = useState(4)
  const [active, setActive] = useState(0)
  const [bpm, setBpm] = useState(80)
  const bpmRef = useRef(bpm);
  bpmRef.current = bpm;
  const [isPlaying, setIsPlaying] = useState(false)

  function nextStep() {
    setActive((active + 1) % steps)
    clave.play();
  }

  useEffect(() => {
    // todo: better timing with WebAudio API?
    clearInterval(interval);
    if (isPlaying) {
        interval = setInterval(() => nextStep(), 60000/bpmRef.current)
    }
  })

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function tapTempo() {
      const now = new Date();
      const diff = now.getTime() - lastTapTempoDate.getTime(); //ms
      setLastTapTempoDate(now)
      if (diff < 1500) {
        setBpm(Math.min(Math.round(60000/diff), 240))
      }

      // todo advanced: calculate floating difference over last calculated differences
  }

  return (
  <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text>M e t r o n o m e !</Text>

        </View>
       <View style={styles.steps}>
         {[...Array(steps).keys()].map(step => <Step key={step} text={step + 1} active={step === active} />)}
       </View>
       <View style={styles.controls}>
       <Button text="-" onPress={() => setBpm(Math.max(bpm - 10, 40))} />
           <Text>{bpm} bpm, {isPlaying ? "playing" : "stopped"}</Text>
      <Button text="+" onPress={() => setBpm(Math.min(bpm + 10, 240))} />

         </View>
       <View style={styles.controls}>

        <Button text="Tap tempo" onPress={tapTempo} />
        <Button text={isPlaying ? "Pause" : "Play"} onPress={togglePlay} active={isPlaying} />
      </View>
   </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  steps: {
      flex: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#ddd',
      flexWrap: 'wrap'
    },
    controls: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#ddd',
      flexWrap: 'wrap'
    },
});
