import React, { useState, useEffect, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import moment from "moment";
import Gaming from "./Gaming";
import UIArea from "./UIArea";
import GameOver from "./GameOver";
import GameStart from "./GameStart";
import GameClear from "./GameClear";
import Background from "./Background";
import { TOTAL_TIME, START_LIFE, OBSTACLES } from "../constants";
import { generateList, allBossPos } from "../utility";

//API
const firebaseConfig = {
  apiKey: "AIzaSyDoJ6azBIGCkLF09c5N88BqD4eeq7dAuHQ",
  authDomain: "jico-game.firebaseapp.com",
  databaseURL: "https://jico-game.firebaseio.com",
  projectId: "jico-game",
  storageBucket: "jico-game.appspot.com",
  messagingSenderId: "722564177930",
  appId: "1:722564177930:web:5ff320cb5648f054"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function storedata(payload) {
  db.collection("players").add(payload);
}

const enemies1 = generateList(OBSTACLES.enemies, 10, 90);
const enemies2 = generateList(OBSTACLES.enemies, 8, 60);
const enemies3 = generateList(OBSTACLES.enemies, 5, 30);
const bossPosition = allBossPos([enemies1, enemies2, enemies3]);

const defaultState = {
  time: { now: TOTAL_TIME, readyStart: 5, readyClear: 5 },
  games: {
    start: true,
    readyStart: false,
    gaming: false,
    gameOver: false,
    readyClear: false,
    gameClear: false,
    test: false
  },
  hero: {
    animation: "walk",
    startLife: START_LIFE,
    life: START_LIFE,
    left: 0,
    top: 200,
    speed: 20,
    color: 0
  },
  enemies: { enemies1, enemies2, enemies3, bossPosition }
};

function MainScreen() {
  const [time_now, setTime_now] = useState(defaultState.time.now);
  const [time_readyStart, setTime_readyStart] = useState(
    defaultState.time.readyStart
  );
  const [time_readyClear, setTime_readyClear] = useState(
    defaultState.time.readyClear
  );

  const [games, setGames] = useState({ ...defaultState.games });

  const [hero, setHero] = useState({ ...defaultState.hero });

  const [enemies, setEnemies] = useState({ ...defaultState.enemies });

  const [counting, setCounting] = useState(true);

  const [players, setPlayers] = useState([]);
  console.log("TCL: MainScreen -> players", players);

  const onEnter = () => {
    let list = [];
    db.collection("players")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          list.push(doc.data());
        });
        setPlayers(list);
      });
  };

  useEffect(onEnter, []);

  //遊戲準備開始倒數
  const gameReadyStart = () => {
    setGames(games => ({ ...games, start: false, readyStart: true }));
    let timeR = time_readyStart;
    const count = setInterval(() => {
      if (timeR > 0) {
        timeR -= 1;
        setTime_readyStart(timeR);
      } else {
        clearInterval(count);
        gameStart();
      }
    }, 1000);
  };

  //遊戲進行中倒數
  const gameStart = useCallback(() => {
    setGames(games => ({
      ...games,
      start: false,
      readyStart: false,
      gaming: true
    }));
    setCounting(prevGaming => !prevGaming);
  }, []);

  const gamingTimer = () => {
    if (games.gaming) {
      setTimeout(() => {
        const timeN = time_now - 1;
        const gg = games.gameOver;
        if (gg) {
          gameOver();
        } else if (timeN >= 0) {
          setTime_now(timeN);
          setCounting(prevCounting => !prevCounting);
        } else {
          readyClear();
        }
      }, 1000);
    }
  };

  useEffect(gamingTimer, [counting]);

  //遊戲過關動畫倒數
  const readyClear = () => {
    setGames(games => ({
      ...games,
      start: false,
      gaming: true,
      readyClear: true
    }));
    let timeR = time_readyClear;
    const count = setInterval(() => {
      if (timeR > 0) {
        timeR -= 1;
        setTime_readyStart(timeR);
      } else {
        clearInterval(count);
        gameClear();
      }
    }, 1000);
  };

  //遊戲狀態切換
  const gameClear = useCallback(() => {
    setGames(games => ({
      ...games,
      gaming: false,
      readyClear: false,
      gameClear: true
    }));
  }, []);

  const gameReStartGame = payload => {
    storedata(payload);
    console.log("TCL: MainScreen -> payload", payload);
    setPlayers(players => [...players, { ...payload }]);
    console.log("TCL: MainScreen -> Players", players);

    setTime_now(defaultState.time.now);
    setTime_readyStart(defaultState.time.readyStart);
    setTime_readyClear(defaultState.time.readyClear);

    setGames({ ...Object.assign({}, defaultState.games) });
    setHero({ ...Object.assign({}, defaultState.hero) });

    const enemies1 = generateList(OBSTACLES.enemies, 10, 90);
    const enemies2 = generateList(OBSTACLES.enemies, 8, 60);
    const enemies3 = generateList(OBSTACLES.enemies, 5, 30);
    const bossPosition = allBossPos([enemies1, enemies2, enemies3]);

    setEnemies({ enemies1, enemies2, enemies3, bossPosition });
  };

  const [dieTime, setDieTime] = useState(0);
  const [dieTop, setDieTop] = useState(0);
  const gameOver = useCallback(top => {
    setGames(games => ({ ...games, gaming: false, gameOver: true }));
    setDieTime(moment().format("YYYY/MM/DD hh:mm:ss"));
    setDieTop(top);
  }, []);

  const onClickHero = useCallback(() => {
    const heroRanColor = Math.round(Math.random() * 11) * 30;
    setHero(hero => ({ ...hero, color: heroRanColor }));
  }, []);

  return (
    <>
      <GameStart
        open={games.start}
        onClick={gameReadyStart}
        heroColor={hero.color}
        onClickHero={onClickHero}
      />
      <GameOver
        open={games.gameOver}
        color={hero.color}
        dieTime={dieTime}
        top={dieTop}
        onClick={gameReStartGame}
        time={time_now}
      />
      <GameClear open={games.gameClear} onClick={gameReStartGame} />
      <Background
        start={games.start}
        gameClear={games.gameClear}
        gaming={games.gaming}
        end={games.readyClear}
        time={time_now}
      />
      {games.gameOver ? null : (
        <Gaming
          start={games.gaming}
          time={time_now}
          readyClear={games.readyClear}
          gameClear={games.gameClear}
          defaulthero={hero}
          gameOver={gameOver}
          enemies={enemies}
          players={players}
          test={games.test}
        />
      )}
      <UIArea
        start={games.gaming}
        time={time_now}
        totalTime={TOTAL_TIME}
        readyTime={time_readyStart}
        readyStart={games.readyStart}
        enemies={enemies.bossPosition}
      />
    </>
  );
}

export default MainScreen;
