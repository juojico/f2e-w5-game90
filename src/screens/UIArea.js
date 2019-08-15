import React from "react";
import styled from "styled-components";
import Timer from "../components/Timer";
import Footer from "../components/Footer";
import Tutorial from "../components/Tutorial";
import ProgressBar from "../components/ProgressBar";
import { BOSS_POSITOIN } from "../constants";
import { imgRule } from "../assets";

const UIAreaWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 30;
`;

const Ready = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 120px;
  background-color: rgba(52, 33, 63, 0.6);
  background-image: url(${imgRule});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const UIArea = ({ open, time, totalTime, start, readyTime, readyStart }) => {
  return (
    <UIAreaWrapper open={open}>
      <Timer time={time} />
      <Footer start={start}>
        <ProgressBar time={time} totalTime={totalTime} boss={BOSS_POSITOIN} />
      </Footer>
      <Tutorial />
      {readyStart ? <Ready>{readyTime}</Ready> : null}
    </UIAreaWrapper>
  );
};

export default UIArea;
