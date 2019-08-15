import React from "react";
import styled from "styled-components";
import { things } from "../../assets";

const stitchesSprite = (x = 0, y = 0, width = 0, height = 0) => {
  return `background-position: ${x}px ${y}px;
    width: ${width}px;
    height: ${height}px;`;
};

const ThingsBox = styled.div`
  display: block;
  width: 80px;
  height: 120px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  &,
  &::before,
  &:after {
    background: url(${things});
    background-repeat: no-repeat;
    ${props => props.actor}
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

const spike = stitchesSprite(-342, -4, 130, 120);
const rock = stitchesSprite(-4, -4, 330, 235);
const bone1 = stitchesSprite(-397, -132, 53, 39);
const bone2 = stitchesSprite(-342, -179, 76, 48);
const skull = stitchesSprite(-342, -132, 47, 37);
const star = stitchesSprite(-4, -291, 60, 60);
const star2 = stitchesSprite(-72, -291, 60, 60);

const ACTORS = {
  spike: spike,
  rock: rock,
  bone1: bone1,
  bone2: bone2,
  skull: skull,
  star: star,
  star2: star2
};

const Things = ({ actor = "spike" }) => {
  return <ThingsBox actor={ACTORS[actor]} />;
};

export default Things;
