import React from "react";
import styled from "styled-components";
import { uiImg } from "../../assets";

const LiveBox = styled.div`
  position: absolute;
  display: flex;
  left: 20px;
  top: 40px;
`;

const Hearts = styled.div`
  width: 60px;
  height: 60px;
  background: url(${uiImg});
  background-position: ${props =>
    props.alive ? "-238px -4px" : "-170px -4px"};
`;

const makeHearts = (amount, life) => {
  const hearts = [];

  for (let i = 0; i < amount; i++) {
    i < life
      ? hearts.push(<Hearts key={`heart${i}`} alive={true} />)
      : hearts.push(<Hearts key={`heart${i}`} alive={false} />);
  }

  return hearts;
};

const Heart = ({ amount = 4, life = 3 }) => {
  return <LiveBox>{makeHearts(amount, life)}</LiveBox>;
};

export default Heart;
