import React from "react";
import styled from "styled-components";
import { startLine, finishLine } from "../../assets";

const GroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 300px;
  left: 0;
  background-color: #f7dfab;
`;

const MarkingLine = styled.div`
  position: absolute;
  width: 200px;
  height: 500px;
  left: 0;
  background-image: url(${props => props.lineBg});
  background-repeat: no-repeat;
  transition: 2s linear;
`;

const LINE_BG = {
  startLine: startLine,
  finishLine: finishLine
};

const Ground = ({ children, start = false, end = false }) => {
  return (
    <GroundWrapper>
      <MarkingLine
        lineBg={LINE_BG["startLine"]}
        style={{
          left: start ? "-200px" : 0
        }}
      />
      {children}
    </GroundWrapper>
  );
};

export default Ground;
