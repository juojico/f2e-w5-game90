import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toRange, ranNum, isInRange } from "../../utility";

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

const setNextTop = (actor, top, count, maxTop = 400) => {
  switch (actor) {
    case "none":
      return top;
    case "boss":
      return toRange(top + ranNum(80, -80), 0, maxTop);
    case "littleBoss":
      return toRange((count % 6) - 3 >= 0 ? top + 70 : top - 70, 0, maxTop);

    default:
      return top;
  }
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
  actor = "none",
  heroPos = [200, 200],
  heroSize = [24, 90],
  crash,
  invincible
}) => {
  const [position, setPosition] = useState([top, left]);
  const [size, setSize] = useState([width, height]);
  const [move, setMove] = useState(false);
  const [close, setClose] = useState(false);
  const [count, setCount] = useState(0);
  const [power, setPower] = useState(0);
  const [check, setCheck] = useState(false);

  const sizing = () => {
    switch (actor) {
      case "hero":
        return setSize([90, 24]);
      case "boss":
        return setSize([300, 120]);
      case "littleBoss":
        return setSize([120, 60]);
      case "evilHand":
        return setSize([200, 60]);
      case "spike":
        return setSize([200, 60]);
      case "rock":
        return setSize([400, 90]);
      case "bone1":
        return setSize([0, 0]);
      case "bone2":
        return setSize([0, 0]);
      case "skull":
        return setSize([40, 20]);
      case "star":
        return setSize([60, 40]);
      case "tomb":
        return setSize([180, 60]);

      default:
        break;
    }
  };

  useEffect(sizing, []);

  const setPowers = () => {
    switch (actor) {
      case "boss":
        return setPower(2);
      case "littleBoss":
        return setPower(1);
      case "evilHand":
        return setPower(1);
      case "spike":
        return setPower(1);
      case "star":
        return setPower("star");

      default:
        return setPower(0);
    }
  };

  useEffect(setPowers, []);

  const moving = () => {
    const inSide = position[1] + 2 * width > 0;
    const nextLeft = position[1] - speed;
    const nextTop = setNextTop(actor, position[0], count);
    if (inSide) {
      setTimeout(() => {
        setPosition([nextTop, nextLeft]);
        setCount(prevCount => prevCount + 1);
        setMove(prevMove => !prevMove);
      }, 500);
    } else {
      setClose(true);
    }
  };

  useEffect(moving, [move]);

  const checkImpact = () => {
    if (!close) {
      setTimeout(() => {
        if (position[1] < 800 && !invincible) {
          const boxT = position[0];
          const boxL = position[1];
          const minT = heroPos[0] - size[1];
          const maxT = heroPos[0] + heroSize[0];
          const minL = heroPos[1] - size[0];
          const maxL = heroPos[1];

          if (isInRange(boxT, minT, maxT)) {
            if (isInRange(boxL, minL, maxL)) {
              crash(power, heroPos[0]);
              if (actor === "star") {
                setClose(true);
              }
            }
          }
        }
        setCheck(prevCheck => !prevCheck);
      }, 100);
    }
  };

  useEffect(checkImpact, [check]);

  return (
    <>
      {close ? null : (
        <BoxsWrapper
          width={size[0]}
          height={size[1]}
          bgColor={bgColor}
          test={test}
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
