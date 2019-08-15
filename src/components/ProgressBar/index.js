import React from "react";
import styled from "styled-components";
import { uiImg } from "../../assets";

const ProgressBarWrapper = styled.div`
  position: absolute;
  width: 1240px;
  height: 16px;
  bottom: 24px;
  left: 20px;
  border-radius: 8px;
  background: #472163;
  &::before {
    position: absolute;
    content: "";
    width: ${props => props.time}%;
    height: 16px;
    top: 0;
    left: 0;
    border-radius: 8px;
    background: linear-gradient(to right, #6c488b, #eb524a);
    transition: 1s linear;
  }
`;

const BossTag = styled.div`
  position: absolute;
  width: 10px;
  height: 40px;
  margin-top: -18px;
  background: url(${uiImg});
  background-position: -434px -4px;
`;

const Flag = styled.div`
  position: absolute;
  width: 18px;
  height: 40px;
  margin-top: -18px;
  background: url(${uiImg});
  background-position: ${props => (props.on ? -713 : -452)}px -4px;
`;

const TagBoss = bossArr => {
  const bossTags = [];
  const amount = bossArr.length;

  for (let i = 0; i < amount; i++) {
    bossTags.push(
      <BossTag key={`tagBoss${i}`} style={{ left: bossArr[i] + "%" }} />
    );
  }

  return bossTags;
};

const ProgressBar = ({ time, boss = [30, 50, 70, 80, 85], totalTime }) => {
  const passTime = totalTime - time;
  const nowAt = Math.round((passTime / totalTime) * 100);
  return (
    <ProgressBarWrapper time={nowAt}>
      {TagBoss(boss)}
      <Flag on={nowAt > 33} style={{ left: "33.3%" }} />
      <Flag on={nowAt > 66} style={{ left: "66.6%" }} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
