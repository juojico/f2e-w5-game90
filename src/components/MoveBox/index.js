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
  area = [0, 200, 0, 200],
  heroPos,
  heroHurt,
  readyClear
}) => {
  const [heroTop, setHeroTop] = useState(top);
  const [heroLeft, setHeroLeft] = useState(-width);
  const [heroSpeed, setHeroSpeed] = useState(0.1);
  const [move, setMove] = useState(true);
  const [heroHurting, setHeroHurting] = useState(false);

  const startPos = () => {
    setHeroLeft(left);
  };

  useEffect(startPos, []);

  const setPos = () => {
    if (start) {
      setTimeout(() => {
        setHeroTop(prevTop =>
          toRange(prevTop + speed * (down - up), area[2], area[3])
        );
        setHeroLeft(prevLeft =>
          toRange(prevLeft + speed * (forward - backward), area[0], area[1])
        );

        setMove(!move);
        heroPos({ top: heroTop, left: heroLeft });
      }, 100);
    }
  };

  useEffect(setPos, [up, down, backward, forward, move]);

  const setHurtPos = () => {
    if (heroHurt) {
      setTimeout(() => {
        setHeroLeft(prevLeft => toRange(prevLeft - speed, area[0], area[1]));
        setHeroHurting(heroHurting => !heroHurting);
      }, 100);
    }
  };

  useEffect(setHurtPos, [heroHurt, heroHurting]);

  const readyClearMove = () => {
    if (readyClear) {
      setHeroLeft(1000);
      setHeroTop(200);
      setHeroSpeed(3);
    }
  };

  useEffect(readyClearMove, [readyClear]);

  return (
    <BoxWrapper
      width={width}
      height={height}
      bgColor={bgColor}
      test={test}
      style={{
        top: heroTop,
        left: heroLeft,
        zIndex: heroTop + height,
        transition: heroSpeed + "s linear"
      }}
    >
      {children}
    </BoxWrapper>
  );
};

export default MoveBox;
