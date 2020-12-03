import React from "react";
import { Sphere, Cylinder, Sky, Scene } from "react-aframe-ar";
import { Entity } from "aframe-react";
import { useComponent } from "./hook";
import { MainCamera } from "../main-camera";

export const VRScene = () => {
  const { color, handleClick, handleCollided } = useComponent();

  return (
    <Scene id='updateMe'>
      <a-assets>
        <img id='sky' src='assets/maxresdefault.jpg' />
      </a-assets>
      <Sky src='#sky' scale='0.3' />

      <MainCamera />
      <Entity
        primitive='a-octahedron'
        src='assets/skydome.jpeg'
        detail={2}
        radius={2}
        position={{ x: 2.5, y: 2.0, z: -6 }}
        color='#FAFAF1'
      />
      <Cylinder
        src='https://i.imgur.com/mYmmbrp.jpg'
        position='1 0.75 -3'
        radius='0.5'
        height='1.5'
        shadow
        events={{ collided: () => handleCollided() }}
        animation='property: position; to: 1 8 -10; dur: 2000; easing: linear; loop: true'
        color='tomato'
      />

      <Entity
        geometry={{ primitive: "box" }}
        material={{ color: `${color === true ? "red" : "blue"}` }}
        position={{ x: -3.5, y: 0, z: -5 }}
        events={{
          click: () => handleClick(),
        }}
      />
      <Entity
        rotation='0 0 0'
        animation='property: rotation; to: 0 360 0; loop: true; dur: 10000'
      >
        <Sphere position='5 0 0' color='crimson'></Sphere>
      </Entity>
    </Scene>
  );
};
