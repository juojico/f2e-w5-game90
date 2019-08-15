import React from "react";
import styled, { keyframes } from "styled-components";
import { hero } from "../../assets";

const stitchesSprite = (x = 0, y = 0, width = 0, height = 0) => {
  return `background-position: ${x}px ${y}px;
    width: ${width}px;
    height: ${height}px;`;
};

const heroWalk = keyframes`
 0% {
    ${stitchesSprite(-5, -405, 80, 120)}
}
25% {
    ${stitchesSprite(-95, -405, 84, 122)}
}
50% {
    ${stitchesSprite(-450, -405, 86, 121)}
}
75% {
    ${stitchesSprite(-612, -5, 78, 120)}
}
100% {
    ${stitchesSprite(-5, -405, 80, 120)}
}
`;

const heroHurt = keyframes`
 0% {
    ${stitchesSprite(-350, -377, 90, 119)}
}
25% {
    ${stitchesSprite(-507, -5, 95, 124)}
}
50% {
    ${stitchesSprite(-507, -139, 95, 123)}
}
75% {
    ${stitchesSprite(-462, -272, 95, 123)}
}
100% {
    ${stitchesSprite(-350, -377, 90, 119)}
}
`;

const heroDie = keyframes`
 0% {
    ${stitchesSprite(-5, -245, 95, 123)}
}
25% {
    ${stitchesSprite(-110, -245, 95, 124)}
}
50% {
    ${stitchesSprite(-215, -245, 102, 109)}
}
75% {
    ${stitchesSprite(-215, -377, 125, 105)}
}
100% {
    ${stitchesSprite(-327, -245, 125, 122)}
}
`;

const heroBuff = keyframes`
 0% {
    ${stitchesSprite(-5, -5, 84, 122)}
}
2.5% {
    ${stitchesSprite(-99, -5, 86, 121)}
}
5% {
    ${stitchesSprite(-195, -5, 108, 113)}
}
7.5% {
    ${stitchesSprite(-313, -5, 140, 110)}
}
10% {
    ${stitchesSprite(-313, -125, 184, 110)}
}
100% {
    ${stitchesSprite(-313, -125, 184, 110)}
}
`;

const HeroBox = styled.div`
  display: block;
  width: 80px;
  height: 120px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  &,
  &::before,
  &:after {
    background: url(${hero});
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
  normal: [heroWalk, "1s step-start pause"],
  heroWalk: [heroWalk, "1s infinite step-start"],
  heroBuff: [heroBuff, "5s infinite alternate step-start"],
  heroHurt: [heroHurt, ".25s alternate step-start forwards"],
  heroDie: [heroDie, ".5s step-start forwards"]
};

const Hero = ({ animation = "normal", color }) => {
  return (
    <HeroBox
      animation={ANIMATION[animation]}
      style={{ filter: `hue-rotate(${color}deg)` }}
    />
  );
};

export default Hero;
