import React, { useState } from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import Dialog from "../components/Dialog";
import { uiImg } from "../assets";
import { DIALOG_START } from "../constants";

const GameStartWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const StartImg = styled.div`
  width: 545px;
  height: 109px;
  margin: auto;
  margin-bottom: 30px;
  background: url(${uiImg});
  background-position: -4px -416px;
`;

const StartImg2 = styled.div`
  width: 0;
  height: 0;
  margin-top: 240px;
  margin-left: 30px;
  float: left;
  cursor: pointer;
`;

const GameStart = ({ open, onClick, heroColor, onClickHero }) => {
  const [close, setClose] = useState(false);
  if (open && close) {
    setClose(false);
  } else {
    setTimeout(() => {
      setClose(true);
    }, 500);
  }
  return (
    <>
      {close ? null : (
        <GameStartWrapper>
          <Dialog
            open={open}
            context={DIALOG_START}
            onClick={onClick}
            btnText='開始遊戲'
          >
            <StartImg />
            <StartImg2 onClick={onClickHero}>
              <Hero animation={"heroWalk"} color={heroColor} />
            </StartImg2>
          </Dialog>
        </GameStartWrapper>
      )}
    </>
  );
};

export default GameStart;
