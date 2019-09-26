import React, { useState, useRef } from 'react';

import clave from "../sound/index"
import Step from "./step"


const useStep = () => {
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(isMuted);
  isMutedRef.current = isMuted;

  function play() {
    if (!isMutedRef.current) {
        clave.play();
    }
  }

  function toggleIsMuted() {
    setIsMuted(!isMuted)
  }

  function Component({ active, text }) {
    return <Step active={active} text={text} isMuted={isMuted} onPress={toggleIsMuted} />
  }

  return {
    Component,
    play,
    isMuted: isMutedRef.current
  }
};

export default useStep;