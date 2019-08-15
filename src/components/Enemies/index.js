import React from "react";
import styled, { keyframes } from "styled-components";
import { enemy } from "../../assets";

const stitchesSprite = (x = 0, y = 0, width = 0, height = 0) => {
  return `background-position: ${x}px ${y}px;
    width: ${width}px;
    height: ${height}px;`;
};

const boss = keyframes`
 0% {
    ${stitchesSprite(-541, -4, 281, 276)}
}
80% {
  ${stitchesSprite(-541, -4, 281, 276)}
}
85% {
    ${stitchesSprite(-183, -192, 270, 277)}
}
90% {
    ${stitchesSprite(-461, -288, 251, 288)}
}
100% {
    ${stitchesSprite(-461, -288, 251, 288)}
}
`;

const littleBoss = keyframes`
 0% {
    ${stitchesSprite(-830, -174, 81, 169)}
}
 50% {
    ${stitchesSprite(-830, -174, 81, 169)}
}
100% {
    ${stitchesSprite(-830, -4, 81, 162)}
}
`;

const evilHand = keyframes`
 0% {
    ${stitchesSprite(-4, -192, 171, 180)}
}
 70% {
    ${stitchesSprite(-4, -192, 171, 180)}
}
 75% {
    ${stitchesSprite(-362, -4, 171, 180)}
}
 80% {
    ${stitchesSprite(-4, -4, 171, 180)}
}
 100% {
    ${stitchesSprite(-183, -4, 171, 180)}
}
`;

const EnemiesBox = styled.div`
  display: block;
  width: 80px;
  height: 120px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  &,
  &::before,
  &:after {
    background: url(${enemy});
    background-repeat: no-repeat;
    background-position: -5px -405px;
    animation: ${props => props.animation[0]} ${props => props.animation[1]};
  }
  &::before,
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    animation-delay: 0.1s;
    opacity: 0.15;
  }
  &:after {
    animation-delay: 0.2s;
    opacity: 0.05;
  }
`;

const ANIMATION = {
  boss: [boss, "2s infinite alternate step-start"],
  littleBoss: [littleBoss, ".5s infinite step-start"],
  evilHand: [evilHand, "2s infinite alternate step-start"]
};

const Enemies = ({ actor = "boss" }) => {
  return <EnemiesBox animation={ANIMATION[actor]} />;
};

export default Enemies;
