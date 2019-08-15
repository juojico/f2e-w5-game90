import React, { useState } from "react";
import styled from "styled-components";
import { uiImg, imgRule } from "../../assets";

const TutorialWrapper = styled.div``;

const TutorialBox = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => (props.on ? 100 : 0)}%;
  top: 0;
  left: 0;
  background-color: rgba(52, 33, 63, 0.6);
  background-image: url(${imgRule});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const TutorialIcon = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 10px;
  right: 10px;
  background: url(${uiImg});
  background-position: ${props => (props.on ? -98 : -134)}px -4px;
  cursor: pointer;
`;

const Tutorial = () => {
  const [onHelp, setOnHelp] = useState(false);
  const onClick = () => {
    setOnHelp(!onHelp);
  };
  return (
    <TutorialWrapper>
      <TutorialIcon on={onHelp} onClick={onClick} />
      <TutorialBox on={onHelp} onClick={onClick} />
    </TutorialWrapper>
  );
};

export default Tutorial;
