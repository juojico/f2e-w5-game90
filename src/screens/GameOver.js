import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "../components/Dialog";
import { uiImg } from "../assets";
import { DIALOG_GAME_OVER } from "../constants";

const GameStartWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
`;

const StartImg = styled.div`
  width: 281px;
  height: 125px;
  margin: auto;
  margin-bottom: 30px;
  background: url(${uiImg});
  background-position: -190px -132px;
`;

const StartImg2 = styled.div`
  float: right;
  width: 178px;
  height: 256px;
  margin: auto 40px auto 20px;
  background: url(${uiImg});
  background-position: -4px -132px;
`;

const GameOver = ({ open, onClick }) => {
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
            context={DIALOG_GAME_OVER}
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

export default GameOver;
