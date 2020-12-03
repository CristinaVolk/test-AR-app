import React from "react";
import { Camera, Cursor } from "react-aframe-ar";

export function MainCamera() {
  return (
    <Camera>
      <Cursor />
    </Camera>
  );
}
