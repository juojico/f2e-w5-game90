import React from "react";
import styled from "styled-components";
import { startLine, finishLine } from "../../assets";

const GroundWrapper = styled.div`
  position: absolute;
  width: 1200px;
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
  background-image: url(${props=>props.lineBg});
  background-repeat: no-repeat;
`;

const LINE_BG = {
  startLine: startLine,
  finishLine: finishLine
};

const Ground = ({ children, lineBg='startLine', lineTop, lineLeft }) => {
  return (
    <GroundWrapper>
      <MarkingLine
        lineBg={LINE_BG[lineBg]}
        style={{
          top: 0,
          left: 0
        }}
      />
      {children}
    </GroundWrapper>
  );
};

export default Ground;
