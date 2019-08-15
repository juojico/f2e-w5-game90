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
  width: 545px;
  height: 109px;
  margin: auto;
  margin-bottom: 30px;
  background: url(${uiImg});
  background-position: -4px -416px;
`;

const GameOver = ({ open, onClick }) => {
  const [close, setClose] = useState(false);
  if (!open) {
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
            btnText="再來一次"
          >
            <StartImg />
          </Dialog>
        </GameStartWrapper>
      )}
    </>
  );
};

export default GameOver;
