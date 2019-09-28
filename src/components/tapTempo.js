import React, { useState } from "react";

import Button from "./button";
export default function TapTempo({ onChange }) {
  const [lastTapTempoDate, setLastTapTempoDate] = useState(new Date());

  function tapTempo() {
    const now = new Date();
    const diff = now.getTime() - lastTapTempoDate.getTime(); //ms
    setLastTapTempoDate(now);
    if (diff < 1500) {
      onChange(Math.min(Math.round(60000 / diff), 240));
    }

    // todo advanced: calculate floating difference over last calculated differences
  }

  return <Button onPress={tapTempo} text="Tap" />;
}
