import React from "react";
import styled from "styled-components";
import { uiImg, hero } from "../../assets";

const TombWrapper = styled.div`
  position: absolute;
  width: 178px;
  height: 256px;
  background: url(${uiImg});
  background-position: -4px -132px;
`;

const TombText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 116px;
  height: 60px;
  top: 58px;
  left: 10px;
  color: #255c9e;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  text-shadow: 1px 1px 0 #9cc1e6;
  text-overflow: ellipsis;
  line-height: 18px;
  border-radius: 100% 100% 0 0;
  overflow: hidden;
  ${props =>
    props.time
      ? `
      width: 106px;
  height: 28px;
  top: 160px;
  border-radius: 0;
  font-size: 12px;
  line-height: 12px;
  `
      : null}
`;

const Hero = styled.div`
  position: absolute;
  top: 152px;
  left: 53px;
  width: 125px;
  height: 105px;
  background: url(${hero});
  background-repeat: no-repeat;
  background-position: -215px -377px;
`;

const Tomb = ({ top, left, name, time, color }) => {
  return (
    <TombWrapper
      style={{
        top: top,
        left: left
      }}
    >
      <Hero style={{ filter: `hue-rotate(${color}deg)` }} />
      <TombText>{name}</TombText>
      <TombText time>{time}</TombText>
    </TombWrapper>
  );
};

export default Tomb;
