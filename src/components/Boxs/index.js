import React, { useState } from "react";
import styled from "styled-components";
import { toRange } from "../../utility";

const BoxsWrapper = styled.div`
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
    bottom: 6px;
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
  area = [0, 200, 0, 200]
}) => {
  const [position, setPosition] = useState({ top: top, left: left });


  return (
    <BoxsWrapper
      width={width}
      height={height}
      bgColor={bgColor}
      test={test}
      style={{
        top: position.top,
        left: position.left
      }}
    >
      {children}
    </BoxsWrapper>
  );
};

export default Boxs;