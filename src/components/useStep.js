import React, { useState, useRef } from "react";

import clave from "../sound/index";
import Step from "./step";

const useStep = idx => {
  const [isMuted, setIsMuted] = useState(false);

  function play() {
    setIsMuted(isMuted => {
      if (!isMuted) {
        clave.play();
      }
      return isMuted;
    });
  }

  function toggleIsMuted() {
    setIsMuted(!isMuted);
  }

  function Component({ active }) {
    return (
      <Step
        active={active}
        text={idx + 1}
        isMuted={isMuted}
        onPress={toggleIsMuted}
      />
    );
  }

  return {
    Component,
    play
  };
};

export default useStep;
