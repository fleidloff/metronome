import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Step from "./components/step"
import Button from "./components/button"
import clave from "./sound/index"

export default function App() {

  const [steps, setSteps] = useState(4)
  const [active, setActive] = useState(0)
  const [bpm, setBpm] = useState(80)
  const [isPlaying, setIsPlaying] = useState(false)


  function nextStep() {
    setActive((active + 1) % steps)
    clave.play()
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
       <Button text="-" onPress={() => setBpm(Math.max(bpm - 1, 40))} />
           <Text>{bpm} bpm, {isPlaying ? "playing" : "stopped"}</Text>
      <Button text="+" onPress={() => setBpm(Math.min(bpm + 1, 240))} />

         </View>
       <View style={styles.controls}>

        <Button text="Tap tempo" onPress={nextStep} />
        <Button text="Play / Pause" onPress={() => setIsPlaying(!isPlaying)} />
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
