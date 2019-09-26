import React, { useState, useRef } from 'react';

import clave from "../sound/index"
import Step from "./step"


const useStep = (idx) => {
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

  function Component({ active }) {
    return <Step active={active} text={idx+ 1} isMuted={isMuted} onPress={toggleIsMuted} />
  }

  return {
    Component,
    play,
    isMuted: isMutedRef.current
  }
};

export default useStep;