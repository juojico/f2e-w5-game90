import React from "react";
import styled from "styled-components";
import Sky from "../components/Sky";
import Ground from "../components/Ground";

const BgArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Background = ({ start=false, end }) => {
  return (
    <BgArea>
      <Sky start={start} end={end} />
      <Ground start={start} end={end}/>
    </BgArea>
  );
};

export default Background;
