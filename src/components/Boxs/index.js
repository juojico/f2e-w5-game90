import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { toRange } from "../../utility";

const moveUp = num => keyframes`
 100% {
    margin-top: ${num}px;
}
`;
const moveLeft = num => keyframes`
 100% {
    margin-left: ${num}px;
}
`;

const BoxsWrapper = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  margin-top: ${props => props.height}px;
  background-color: ${props => props.bgColor};
  transform: translate(0, -100%);
  transition: 1s linear;
  animation: ${props => props.animation[0]} ${props => props.animation[1]};
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

const MOVE_STYLE = {
  none: ["none", "none"],
  boss: [moveUp(160), "3s infinite alternate"],
  littleBoss: [moveUp(160), "1s infinite alternate"]
};

const Boxs = ({
  children,
  width = 10,
  height = 10,
  speed = 1,
  bgColor = "transparent",
  top = 0,
  left = 0,
  start = true,
  test = true,
  area = [0, 200, 0, 200],
  moveStyle = "none"
}) => {
  const [position, setPosition] = useState({ top: top, left: left });

let NowTop = top;
    setInterval(() => {
      const ranNum = Math.random()*50;
      console.log("TCL: ranNum", ranNum)
      NowTop = position.top + ranNum;
    }, 500);

  return (
    <BoxsWrapper
      width={width}
      height={height}
      bgColor={bgColor}
      test={test}
      animation={MOVE_STYLE[moveStyle]}
      style={{
        top: NowTop,
        left: position.left,
        zIndex: position.top + height
      }}
    >
      {children}
    </BoxsWrapper>
  );
};

export default Boxs;
