import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useStep from "./components/useStep"
import Button from "./components/button"
// todo: support different sounds (at least 3 and one without sound
import clave from "./sound/index"
import { setBetterInterval } from './util/betterInterval'
let interval;

export default function App() {

  // todo: refactor to better structure
  // todo: is useRef really necessary?
  const [lastTapTempoDate, setLastTapTempoDate] = useState(new Date())
  const [steps, setSteps] = useState(4)
  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  const [active, setActive] = useState(-1)
  const activeRef = useRef(active);
  activeRef.current = active;
  const [bpm, setBpm] = useState(80)
  const bpmRef = useRef(bpm);
  bpmRef.current = bpm;
  const [isPlaying, setIsPlaying] = useState(false)

  const stepComponents = [...Array(steps).keys()].map(idx => useStep(idx))

  useEffect(() => {
    interval && interval.clear();
    if (isPlaying) {

        interval = setBetterInterval(() => {
            const nextStep = (activeRef.current + 1) % stepsRef.current;
            setActive(nextStep);
            stepComponents[nextStep].play();
        }, Math.round(60000/bpmRef.current));
    }
  },[ isPlaying, bpm ])

  function togglePlay() {
    if (isPlaying) {
          setActive(-1);
    }
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
         {stepComponents.map(({ Component }, idx) => <Component key={idx} active={idx === active} />)}
       </View>
       <View style={styles.controls}>
       <Button text="-" onPress={() => setBpm(Math.max(bpm - 10, 40))} />
           <Text>{bpm} bpm, {isPlaying ? "playing" : "stopped"}</Text>
      <Button text="+" onPress={() => setBpm(Math.min(bpm + 10, 240))} />

         </View>
       <View style={styles.controls}>

        <Button text="Tap tempo" onPress={tapTempo} />
        <Button text="▶" onPress={togglePlay} active={isPlaying} />
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
