import React from "react";
import ReactDOM from "react-dom";
import "aframe";
import { VRScene } from "./components/scene/";

function App() {
  return (
    <div className='App'>
      <VRScene />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
