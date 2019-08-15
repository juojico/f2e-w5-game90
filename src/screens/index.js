import React, { useState } from "react";
import Gaming from "./Gaming";
import UIArea from "./UIArea";
import GameStart from "./GameStart";
import Background from "./Background";
import { TOTAL_TIME } from "../constants";

function MainScreen() {
  const [games, setGames] = useState({
    start: true,
    readyStart: false,
    gaming: false,
    gameOver: false,
    gameClear: false
  });

  const [time, setTime] = useState(TOTAL_TIME);
  if (games.gaming && time > 0) {
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }

  const [readyTime, setReadyTime] = useState(5);
  if (games.readyStart && readyTime > 0) {
    setTimeout(() => {
      setReadyTime(readyTime - 1);
    }, 1000);
  }

  const gameReadyStart = () => {
    setGames({ ...games, start: false, readyStart: true });
  };

  const gameStart = () => {
    setGames({ ...games, readyStart: false, gaming: true });
  };

  if (games.readyStart && readyTime === 0) {
    gameStart();
  }

  return (
    <>
      <GameStart open={games.start} onClick={gameReadyStart} />
      <Background start={games.gaming} gameClear={games.gameClear} />

      <Gaming start={games.gaming} gameClear={games.gameClear} />

      <UIArea time={time} totalTime={TOTAL_TIME} readyTime={readyTime} readyStart={games.readyStart} start={games.gaming} />
    </>
  );
}

export default MainScreen;
