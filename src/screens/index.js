import React, { useState, useEffect } from "react";
import Gaming from "./Gaming";
import UIArea from "./UIArea";
import GameOver from "./GameOver";
import GameStart from "./GameStart";
import GameClear from "./GameClear";
import Background from "./Background";
import { TOTAL_TIME } from "../constants";

const heroRanColor = () => Math.round(Math.random() * 11) * 30;

const defaultState = {
  time: TOTAL_TIME,
  readyTime: 0,
  games: {
    start: true,
    readyStart: false,
    gaming: false,
    gameOver: false,
    gameClear: false
  },
  heroRanColor
};

function MainScreen() {
  const [time, setTime] = useState(defaultState.time);
  const [readyTime, setReadyTime] = useState(defaultState.readyTime);
  const [games, setGames] = useState({ ...defaultState.games });
  const [heroColor, setHeroColor] = useState(defaultState.heroRanColor);

  useEffect(() => {
    if (games.gaming) {
      if (time > 0) {
        setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      } else {
        gameClear();
      }
    }
    if (games.readyStart) {
      if (readyTime > 0) {
        setTimeout(() => {
          setReadyTime(readyTime - 1);
        }, 1000);
      } else {
        gameStart();
      }
    }
  });

  const gameReadyStart = () => {
    setGames({ ...games, start: false, readyStart: true });
  };

  const gameStart = () => {
    setGames({ ...games, readyStart: false, gaming: true });
  };

  const gameReStartGame = () => {
    setGames({ ...games, start: true, gaming: false });
  };

  const gameClear = () => {
    setGames({ ...games, gaming: false, gameClear: true });
  };

  const gameOver = () => {
    setGames({ ...games, gaming: false, gameOver: true });
  };

  const onClickHero = () => {
    console.log("TCL: onClickHero -> onClickHero");
    setHeroColor(heroRanColor);
  };

  return (
    <>
      <GameStart
        open={games.start}
        onClick={gameReadyStart}
        heroColor={heroColor}
        onClickHero={onClickHero}
      />
      <GameOver open={games.gameOver} onClick={gameReStartGame} />
      <GameClear open={games.gameClear} onClick={gameReStartGame} />
      <Background
        start={games.gaming}
        gameClear={games.gameClear}
        time={time}
      />

      <Gaming
        start={games.gaming}
        gameClear={games.gameClear}
        heroColor={heroColor}
        gameOver={gameOver}
        time={time}
      />

      <UIArea
        time={time}
        totalTime={TOTAL_TIME}
        readyTime={readyTime}
        readyStart={games.readyStart}
        start={games.gaming}
      />
    </>
  );
}

export default MainScreen;
