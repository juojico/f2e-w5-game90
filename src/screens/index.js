import React, { useState, useEffect } from "react";
import Gaming from "./Gaming";
import UIArea from "./UIArea";
import GameOver from "./GameOver";
import GameStart from "./GameStart";
import GameClear from "./GameClear";
import Background from "./Background";
import { TOTAL_TIME, START_LIFE, OBSTACLES } from "../constants";
import { generateList } from "../utility";

const defaultState = {
  time: { total: TOTAL_TIME, now: TOTAL_TIME, readyStart: 3, readyClear: 5 },
  games: {
    start: true,
    readyStart: false,
    gaming: false,
    gameOver: false,
    readyClear: false,
    gameClear: false,
    test: true
  },
  hero: {
    animation: "walk",
    life: START_LIFE,
    startLife: START_LIFE,
    left: 0,
    top: 200,
    speed: 20,
    color: 0
  },
  enemies: {
    enemies1: generateList(OBSTACLES.enemies, 10, 90),
    enemies2: generateList(OBSTACLES.enemies, 8, 60),
    enemies3: generateList(OBSTACLES.enemies, 5, 30),
    bossPosition: []
  }
};

function MainScreen() {
  const [time, setTime] = useState({ ...defaultState.time });
  const [games, setGames] = useState({ ...defaultState.games });
  const [hero, setHero] = useState({ ...defaultState.hero });
  const [enemies, setEnemies] = useState({ ...defaultState.enemies });

  const allboss = () => {
    const { enemies1: e1, enemies2: e2, enemies3: e3 } = enemies;

    const enemiesPos = arr => {
      const list = [];
      for (let i = 0; i < arr.length; i++) {
        arr[i].forEach(item => {
          if (item.name !== "evilHand") {
            list.push(item.game_time + i * 30);
          }
        });
      }
      return list;
    };

    const listq = enemiesPos([e1, e2, e3]);

    setEnemies({ ...enemies, bossPosition: listq });
  };
  useEffect(allboss, []);

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
          setTime({ ...time, readyStart: time.readyStart - 1 });
        }, 1000);
      } else {
        gameStart();
      }
    }
    if (games.readyClear) {
      if (time.readyClear > 0) {
        setTimeout(() => {
          setTime({ ...time, readyClear: time.readyClear - 1 });
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
    setEnemies({ ...defaultState.enemies });
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
        gaming={games.gaming}
        end={games.readyClear}
        time={time.now}
      />
      <Gaming
        start={games.gaming}
        time={time.now}
        gameClear={games.gameClear}
        defaulthero={hero}
        gameOver={gameOver}
        enemies={enemies}
        test={games.test}
      />
      <UIArea
        start={games.gaming}
        time={time.now}
        totalTime={TOTAL_TIME}
        readyTime={time.readyStart}
        readyStart={games.readyStart}
        enemies={enemies.bossPosition}
      />
    </>
  );
}

export default MainScreen;
