import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Boxs from "../components/Boxs";
import Hero from "../components/Hero";
import Tomb from "../components/Tomb";
import Heart from "../components/Heart";
import Things from "../components/Things";
import Enemies from "../components/Enemies";
import MoveBox from "../components/MoveBox";
import { RECENT_PLAYER } from "../constants";
import { generateList } from "../utility";

const GamingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
`;

const GameArea = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 300px;
`;

const BoxArea = ({ data, type = "things", keyName, heroPos, crash, test }) => {
  const types = (item, type) => {
    switch (type) {
      case "things":
        return <Things actor={item.name} />;
      case "enemies":
        return <Enemies actor={item.name} />;
      case "tomb":
        return <Tomb name={item.name} time={item.time} />;
      default:
        break;
    }
  };
  return (
    <>
      {data.map(item => (
        <Boxs
          key={keyName + item.id}
          width={200}
          height={60}
          top={item.top}
          left={1280 + item.game_time * 200}
          actor={item.name}
          heroPos={heroPos}
          crash={crash}
          test={test}
        >
          {types(item, type)}
        </Boxs>
      ))}
    </>
  );
};

const Gaming = ({ start = false, defaulthero, time, enemies, gameOver, test }) => {
  const [hero, setHero] = useState({ ...defaulthero });
  const [heroHurt, setHeroHurt] = useState(false);
  const [moving, setMoving] = useState({
    start: false,
    left: 0,
    down: 0,
    backward: 0,
    forward: 0
  });

  const listener = () => {
    if (start) {
      document.addEventListener("keydown", handleKey);
      document.addEventListener("keyup", handleKey);
    } else {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("keyup", handleKey);
    }
  };

  useEffect(listener, [start]);

  const whichDirect = keyCode => {
    switch (keyCode) {
      case 38:
      case 87:
        return "up";
      case 40:
      case 83:
        return "down";
      case 37:
      case 65:
        return "backward";
      case 39:
      case 68:
        return "forward";
      default:
        return null;
    }
  };

  const handleKey = e => {
    const keyName = whichDirect(e.keyCode);

    if (e.type === "keydown") {
      setMoving({ ...moving, start: true, [keyName]: 1 });
    } else if (e.type === "keyup") {
      setMoving({ ...moving, start: false, [keyName]: 0 });
    }
  };

  const [obstacles1, setObstacles1] = useState([]);
  const [obstacles2, setObstacles2] = useState([]);

  //每10秒產生一組障礙物列表
  useEffect(() => {
    switch (time) {
      case 90:
        return setObstacles1(generateList(["spike", "rock"], 3, 10));
      case 80:
        return setObstacles2(generateList(["spike", "rock"], 3, 10));
      case 70:
        return setObstacles1(generateList(["spike", "rock"], 4, 10));
      case 60:
        return setObstacles2(generateList(["spike", "rock"], 4, 10));
      case 50:
        return setObstacles1(generateList(["spike", "rock"], 5, 10));
      case 40:
        return setObstacles2(generateList(["spike", "rock"], 5, 10));
      case 30:
        return setObstacles1(generateList(["spike", "rock"], 6, 10));
      case 20:
        return setObstacles2(generateList(["spike", "rock"], 6, 10));
      case 10:
        return setObstacles1(generateList(["spike", "rock"], 4, 10));
      default:
        break;
    }
  }, [time]);

  //30,60秒多更多敵人
  const [stage, setStage] = useState(0);
  useEffect(() => {
    switch (time) {
      case 60:
        return setStage(1);
      case 30:
        return setStage(2);

      default:
        break;
    }
  }, [time]);

  const heroHurting = () => {
    if (heroHurt) {
      setTimeout(() => {
        setHero({ ...hero, animation: "walk" });
        setHeroHurt(false);
      }, 500);
      setHero({ ...hero, animation: "hurt" });
    }
  };

  useEffect(heroHurting, [heroHurt]);

  const heroPos = heroPosition => {
    setHero({ ...hero, ...heroPosition });
  };

  const crash = power => {
    console.log("TCL: Gaming -> onCrash = power", power);
    setHero({ ...hero, life: hero.life - power });
    setHeroHurt(true);
  };

  const isHeroDie = () => {
    if (hero.life <= 0) {
      setHero({ ...hero, animation: "die" });
      setTimeout(() => {
        gameOver();
      }, 1000);
    }
  };

  useEffect(isHeroDie, [hero]);

  return (
    <GamingWrapper>
      <Heart amount={hero.startLife} life={hero.life} />
      <GameArea>
        {start ? (
          <>
            <BoxArea
              data={obstacles1}
              keyName={"obstacles1"}
              heroPos={[hero.top, hero.left]}
              crash={crash}
              test={test}
            />
            <BoxArea
              data={obstacles2}
              keyName={"obstacles2"}
              heroPos={[hero.top, hero.left]}
              crash={crash}
              test={test}
            />
            <BoxArea
              data={RECENT_PLAYER}
              type={"tomb"}
              keyName={"tomb"}
              heroPos={[hero.top, hero.left]}
              crash={crash}
              test={test}
            />
            <BoxArea
              data={enemies.enemies1}
              type={"enemies"}
              keyName={"enemies1"}
              heroPos={[hero.top, hero.left]}
              crash={crash}
              test={test}
            />
            {stage >= 1 ? (
              <BoxArea
                data={enemies.enemies2}
                type={"enemies"}
                keyName={"enemies2"}
                heroPos={[hero.top, hero.left]}
                crash={crash}
                test={test}
              />
            ) : null}
            {stage >= 2 ? (
              <BoxArea
                data={enemies.enemies3}
                type={"enemies"}
                keyName={"enemies3"}
                heroPos={[hero.top, hero.left]}
                crash={crash}
                test={test}
              />
            ) : null}
            <MoveBox
              speed={30}
              width={90}
              height={24}
              top={200}
              up={moving.up}
              down={moving.down}
              backward={moving.backward}
              forward={moving.forward}
              area={[0, 800, 0, 400]}
              start={moving.start}
              heroPos={heroPos}
              heroHurt={heroHurt}
              test={test}
            >
              <Hero animation={hero.animation} color={hero.color} />
            </MoveBox>
          </>
        ) : null}
      </GameArea>
    </GamingWrapper>
  );
};

export default Gaming;
