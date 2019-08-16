import React from "react";
import styled from "styled-components";
import Sky from "../components/Sky";
import Ground from "../components/Ground";

const BgArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Background = ({ start, time }) => {
  return (
    <BgArea>
      <Sky start={start} />
      <Ground time={time}/>
    </BgArea>
  );
};

export default Background;
