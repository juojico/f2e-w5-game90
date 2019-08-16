import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "../components/Dialog";
import { uiImg } from "../assets";
import { DIALOG_GAME_CLEAR } from "../constants";

const GameStartWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const StartImg = styled.div`
  width: 220px;
  height: 107px;
  margin: auto;
  margin-bottom: 30px;
  background: url(${uiImg});
  background-position: -190px -301px;
`;

const StartImg2 = styled.div`
  float: right;
  width: 226px;
  height: 289px;
  margin: auto 40px auto 20px;
  background: url(${uiImg});
  background-position: -479px -4px;
`;

const GameClear = ({ open, onClick }) => {
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
            context={DIALOG_GAME_CLEAR}
            onClick={onClick}
            btnText='再來一次'
          >
            <StartImg />
            <StartImg2 />
          </Dialog>
        </GameStartWrapper>
      )}
    </>
  );
};

export default GameClear;
