import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toRange } from "../../utility";

const BoxWrapper = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  margin-top: ${props => props.height}px;
  background-color: ${props => props.bgColor};
  transform: translate(0, -100%);
  transition: 0.1s linear;
  ${props => (props.test ? `outline: 1px solid #0f3;` : null)}
  &>div {
    position: absolute;
    bottom: ${props => props.height / 4}px;
    left: 50%;
    transform: translate(-50%);
  }
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const MoveBox = ({
  children,
  width = 10,
  height = 10,
  speed = 1,
  bgColor = "transparent",
  top = 0,
  left = 0,
  up = 0,
  down = 0,
  backward = 0,
  forward = 0,
  start = true,
  test = true,
  area = [0, 200, 0, 200]
}) => {
  const [position, setPosition] = useState({ top: top, left: -width });

  const startPos = () => {
    setPosition({ top: top, left: left });
  };

  useEffect(startPos, []);

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
      test={test}
      style={{
        top: position.top,
        left: position.left,
        zIndex: position.top + height
      }}
    >
      {children}
    </BoxWrapper>
  );
};

export default MoveBox;
