import React from "react";
import styled, { keyframes } from "styled-components";
import { cloud, mountain1, mountain2, sky } from "../../assets";

const bgMove = keyframes`
  to {
    background-position: -1280px 0;
  }
`;
const bgDefault = styled.div`
  position: absolute;
  width: 1200px;
  height: 300px;
  top: 0;
  left: 0;
  background-repeat-y: no-repeat;
`;

const SkyWrapper = styled(bgDefault)`
  background-image: url(${sky});
`;

const Cloud = styled(bgDefault)`
  background-image: url(${cloud});
  animation: ${bgMove} 20s linear infinite;
  ${props=>props.start?'animation-play-state:runnung;':'animation-play-state:paused;'}
`;

const Mountain1 = styled(bgDefault)`
  height: 30px;
  top: auto;
  bottom: 0;
  background-image: url(${mountain1});
  animation: ${bgMove} 10s linear infinite;
  ${props=>props.start?'animation-play-state:runnung;':'animation-play-state:paused;'}
`;

const Mountain2 = styled(bgDefault)`
  height: 175px;
  top: auto;
  bottom: 0;
  background-image: url(${mountain2});
  animation: ${bgMove} 15s linear infinite;
  ${props=>props.start?'animation-play-state:runnung;':'animation-play-state:paused;'}
`;

const Sky = ({ children, start=false }) => {
  return (
    <SkyWrapper>
      <Cloud start={start} />
      <Mountain2 start={start} />
      <Mountain1 start={start} />
      {children}
    </SkyWrapper>
  );
};

export default Sky;
