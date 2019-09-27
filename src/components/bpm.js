import React from "react";
import { Text, View } from 'react-native';

import Button from "./button"

export default function Bpm({ onChange, bpm }) {
    return [
        <Button key={1} text="-" onPress={() => onChange(Math.max(bpm - 10, 40))} />,
        <Text key={2}>{bpm} bpm</Text>,
        <Button key={3} text="+" onPress={() => onChange(Math.min(bpm + 10, 240))} />
    ]
}
