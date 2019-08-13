import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: ${props => props.bgColor};
`;

const move = e => {
    console.log("TCL: move", e.type);
  return e.type;
};

document.addEventListener("keydown", move);
document.addEventListener("keyup", move);

const MoveBox = ({
  width = 10,
  height = 10,
  speed = 1,
  bgColor = "transparent"
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    switch (move) {
      case "keydown":
        console.log("TCL: move", move);
        setTimeout(() => {
          setPosition({ top: (position.top += 1) });
        }, 200);
        break;

      default:
        break;
    }
  });
  return (
    <BoxWrapper
      width={width}
      height={height}
      speed={speed}
      bgColor={bgColor}
      top={position.top}
      left={position.left}
    />
  );
};

export default MoveBox;
