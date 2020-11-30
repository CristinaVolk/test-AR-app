import React from "react";
import ReactDOM from "react-dom";
import { ThreeScene } from "./components/scene/index";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={styles.app}>
      <h1>React with ThreeJS</h1>
      <h2>Start editing to see some magic happen!</h2>

      <ThreeScene />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
