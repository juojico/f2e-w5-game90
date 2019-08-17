import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const moveUp = num => keyframes`
 100% {
    margin-top: ${num}px;
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
  transition: 0.5s linear;
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
  speed = 100,
  bgColor = "transparent",
  top = 0,
  left = 0,
  test = false,
  moveStyle = "none"
}) => {
  const [position, setPosition] = useState([top, left]);
  const [move, setMove] = useState(false);
  const [close, setClose] = useState(false);

  const moving = () => {
    const inSide = position[1] + 2 * width > 0;
    const next = position[1] - speed;
    if (inSide) {
      setTimeout(() => {
        setPosition([top, next]);
        setMove(!move);
      }, 500);
    } else {
      setClose(true);
    }
  };

  useEffect(moving, [move]);

  return (
    <>
      {close ? null : (
        <BoxsWrapper
          width={width}
          height={height}
          bgColor={bgColor}
          test={test}
          animation={MOVE_STYLE[moveStyle]}
          style={{
            top: position[0],
            left: position[1],
            zIndex: position[0] + height
          }}
        >
          {children}
        </BoxsWrapper>
      )}
    </>
  );
};
export default Boxs;
