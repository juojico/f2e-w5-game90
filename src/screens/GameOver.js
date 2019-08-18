import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "../components/Dialog";
import Tomb from "../components/Tomb";
import { uiImg } from "../assets";
import { DIALOG_GAME_OVER, TOTAL_TIME } from "../constants";

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

const TombBox = styled.div`
  position: relative;
  float: right;
  width: 178px;
  height: 356px;
  margin: auto 40px auto 20px;
`;

const InputArea = styled.div`
  position: absolute;
  width: 100%;
  top: 250px;
  border-bottom: 1px solid grey;
  & input {
    font-size: 16px;
    width: 100%;
    border: none;
    padding: 10px;
  }
`;

const GameOver = ({ open, onClick, color, dieTime, top, time }) => {
  const [close, setClose] = useState(false);
  if (open && close) {
    setClose(false);
  } else {
    setTimeout(() => {
      setClose(true);
    }, 500);
  }
  const [name, setName] = useState("無名氏");

  const onChange = e => {
    const yourName = e.target.value.trim() || "無名氏";
    setName(yourName);
  };

  const onConfirm = () => {
    const game_time = TOTAL_TIME - time;
    console.log("TCL: GameOver -> info", name, color, dieTime, top, game_time);
    const payload = {
      time: dieTime,
      name,
      game_time,
      top,
      color
    };
    onClick(payload);
  };

  return (
    <>
      {close ? null : (
        <GameStartWrapper>
          <Dialog
            open={open}
            context={DIALOG_GAME_OVER}
            onClick={onConfirm}
            btnText="再來一次"
          >
            <StartImg />
            <TombBox>
              <Tomb color={color} time={dieTime} name={name} />
              <InputArea>
                <input
                  maxLength="12"
                  placeholder="請輸入名字"
                  onChange={onChange}
                />
              </InputArea>
            </TombBox>
          </Dialog>
        </GameStartWrapper>
      )}
    </>
  );
};

export default GameOver;
