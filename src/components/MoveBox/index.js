import React, { useState } from "react";
import styled from "styled-components";
import { toRange } from "../../utility";

const BoxWrapper = styled.div`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  margin-top: 30px;
  background-color: ${props => props.bgColor};
  transform: translate(0,-100%);
  transition: 0.1s linear;
`;

const MoveBox = ({
  children,
  width = "auto",
  height = "auto",
  speed = 1,
  bgColor = "transparent",
  top = 0,
  left = 0,
  up = 0,
  down = 0,
  backward = 0,
  forward = 0,
  start = true,
  direction = "stop",
  area = [0, 200, 0, 200]
}) => {
  const [position, setPosition] = useState({ top: top, left: left });

  if (start) {
    setTimeout(() => {
      setPosition({
        ...position,
        top: toRange(position.top + speed * (down - up), area[2], area[3]),
        left: toRange(
          position.left + speed * (forward - backward),
          area[0],
          area[1]
        )
      });
    }, 100);
  }

  return (
    <BoxWrapper
      width={width}
      height={height}
      bgColor={bgColor}
      style={{
        top: position.top,
        left: position.left
      }}
    >
      {children}
    </BoxWrapper>
  );
};

export default MoveBox;
