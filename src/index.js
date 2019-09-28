import React, { useState, useEffect, useRef, useDebugValue } from "react";
import { StyleSheet, Text, View } from "react-native";

import useStep from "./components/useStep";
import Button from "./components/button";
import TapTempo from "./components/tapTempo";
import Bpm from "./components/bpm";
import Steps from "./components/steps";
import { setBetterInterval } from "./util/betterInterval";
let interval;

export default function App() {
  const [steps, setSteps] = useState(4);
  const [active, setActive] = useState(-1);
  const [bpm, setBpm] = useState(80);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepComponents = [...Array(steps).keys()].map(idx => useStep(idx));

  useEffect(() => {
    interval && interval.clear();
    if (isPlaying) {
      interval = setBetterInterval(() => {
        setActive(active => {
          const nextStep = (active + 1) % steps;
          stepComponents[nextStep].play();
          return nextStep;
        });
      }, Math.round(60000 / bpm));
    }
  }, [isPlaying, bpm, steps]);

  function togglePlay() {
    if (isPlaying) {
      setActive(-1);
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>M e t r o n o m e !</Text>
      </View>
      <View style={styles.steps}>
        {stepComponents.map(({ Component }, idx) => (
          <Component key={idx} active={idx === active} />
        ))}
      </View>
      <View style={styles.controls}>
        <TapTempo onChange={setBpm} />
        <Bpm bpm={bpm} onChange={setBpm} />

        <Button text="▶" onPress={togglePlay} active={isPlaying} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  steps: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#ddd",
    flexWrap: "wrap"
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#ddd",
    flexWrap: "wrap"
  },
  title: {
    fontSize: 40
  }
});
