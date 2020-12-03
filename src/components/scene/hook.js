import { useState } from "react";

export function useComponent() {
  const [color, setColor] = useState(false);
  const handleClick = () => {
    setColor(!color);
    console.log("Clicked");
  };

  const handleCollided = () => {
    console.log("Collided");
  };
  return { color, handleClick, handleCollided };
}
