import React from "react";
import { Text, View, Picker } from "react-native";

import Button from "./button";

export default function Steps({ onChange, steps, max }) {
  return (
    <Picker
      style={{ height: 50, width: 150 }}
      selectedValue={steps}
      onValueChange={value => onChange(value)}
    >
      {[...Array(max).keys()]
        .map(key => key + 1)
        .map(key => (
          <Picker.Item label={`${key} steps`} key={key} value={key} />
        ))}
    </Picker>
  );
}
