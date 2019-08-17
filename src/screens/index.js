import React, { useState, useEffect } from "react";
import Gaming from "./Gaming";
import UIArea from "./UIArea";
import GameOver from "./GameOver";
import GameStart from "./GameStart";
import GameClear from "./GameClear";
import Background from "./Background";
import { TOTAL_TIME, START_LIFE } from "../constants";

const defaultState = {
  time: { total: TOTAL_TIME, now: TOTAL_TIME, readyStart: 0, readyClear: 5 },
  games: {
    start: true,
    readyStart: false,
    gaming: false,
    gameOver: false,
    readyClear: false,
    gameClear: false,
    test: true
  },
  hero: { animation: "walk", life: START_LIFE, startLife: START_LIFE, color: 0 }
};

function MainScreen() {
  const [time, setTime] = useState({ ...defaultState.time });
  const [games, setGames] = useState({ ...defaultState.games });
  const [hero, setHero] = useState({ ...defaultState.hero });

  useEffect(() => {
    if (games.gaming) {
      if (time.now > 0) {
        setTimeout(() => {
          setTime({ ...time, now: time.now - 1 });
        }, 1000);
      } else {
        readyClear();
      }
    }
    if (games.readyStart) {
      if (time.readyStart > 0) {
        setTimeout(() => {
          setTime(time.readyStart - 1);
        }, 1000);
      } else {
        gameStart();
      }
    }
    if (games.readyClear) {
      if (time.readyClear > 0) {
        setTimeout(() => {
          setTime(time.readyClear - 1);
        }, 1000);
      } else {
        gameClear();
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
    setTime({ ...defaultState.time });
    setGames({ ...defaultState.games });
    setHero({ ...defaultState.hero });
  };

  const readyClear = () => {
    setGames({ ...games, readyClear: true });
  };

  const gameClear = () => {
    setGames({ ...games, gaming: false, readyClear: false, gameClear: true });
  };

  const gameOver = () => {
    setGames({ ...games, gaming: false, gameOver: true });
  };

  const onClickHero = () => {
    const heroRanColor = () => Math.round(Math.random() * 11) * 30;
    setHero({ ...hero, color: heroRanColor() });
  };

  return (
    <>
      <GameStart
        open={games.start}
        onClick={gameReadyStart}
        heroColor={hero.color}
        onClickHero={onClickHero}
      />
      <GameOver open={games.gameOver} onClick={gameReStartGame} />
      <GameClear open={games.gameClear} onClick={gameReStartGame} />
      <Background
        start={games.gaming}
        gameClear={games.gameClear}
        end={games.readyClear}
      />

      <Gaming
        start={games.gaming}
        time={time.now}
        gameClear={games.gameClear}
        hero={hero}
        gameOver={gameOver}
        test={games.test}
      />

      <UIArea
        start={games.gaming}
        time={time.now}
        totalTime={TOTAL_TIME}
        readyTime={time.readyTime}
        readyStart={games.readyStart}
      />
    </>
  );
}

export default MainScreen;
