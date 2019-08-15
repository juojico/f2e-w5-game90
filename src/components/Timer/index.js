import React from "react";
import styled from "styled-components";

const TimerWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 120px;
  height: 120px;
  top: 20px;
  right: 20px;
  color: #34213f;
  font-weight: 500;
  font-size: 24px;
  border: 12px solid white;
  border-radius: 100%;
  background: #fcb559;
  user-select: none;
`;

const Time = styled.div`
  font-size: 64px;
  font-weight: 600;
  margin: -16px;
`;

const Timer = ({ time }) => {
  return (
    <TimerWrapper>
      <Time>{time}</Time>
      <span>sec</span>
    </TimerWrapper>
  );
};

export default Timer;
