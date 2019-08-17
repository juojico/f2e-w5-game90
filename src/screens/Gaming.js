import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Boxs from "../components/Boxs";
import Hero from "../components/Hero";
import Tomb from "../components/Tomb";
import Heart from "../components/Heart";
import Things from "../components/Things";
import Enemies from "../components/Enemies";
import MoveBox from "../components/MoveBox";
import { OBSTACLES, RECENT_PLAYER } from "../constants";
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

const enemies = generateList(OBSTACLES.enemies, 10, 80);

const BoxArea = ({ data, type = "things", test }) => {
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
          key={item.id}
          width={200}
          height={60}
          top={item.top}
          left={1280 + item.game_time * 200}
          test={test}
        >
          {types(item, type)}
        </Boxs>
      ))}
    </>
  );
};

const Gaming = ({ start = false, hero, time, test }) => {
  const [moving, setMoving] = useState({
    start: false,
    up: 0,
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

    switch (e.type) {
      case "keydown":
        setMoving({ ...moving, start: true, [keyName]: 1 });
        console.log("TCL: MainScreen -> movingkeydown", moving);
        break;
      case "keyup":
        setMoving({ ...moving, start: false, [keyName]: 0 });
        console.log("TCL: MainScreen -> movingkeyup", moving);
        break;

      default:
        setMoving({ ...moving, start: false });
        break;
    }
  };

  const [obstacles1, setObstacles1] = useState([]);
  const [obstacles2, setObstacles2] = useState([]);

  //每10秒產生一組障礙物列表
  useEffect(() => {
    if (time % 20 === 19) {
      const list = generateList(OBSTACLES.things, 5, 10, time);
      setObstacles1(list);
    } else if (time % 20 === 9) {
      const list = generateList(OBSTACLES.things, 5, 10, time);
      setObstacles2(list);
    }
  }, [time]);

  console.log("TCL: MainScreen", moving);

  return (
    <GamingWrapper>
      <Heart amount={hero.startLife} life={hero.life} />
      <GameArea>
        {start ? (
          <>
            <BoxArea data={obstacles1} test={test} />
            <BoxArea data={obstacles2} test={test} />
            <BoxArea data={RECENT_PLAYER} type={"tomb"} test={test} />
            <BoxArea data={enemies} type={"enemies"} test={test} />
            <MoveBox
              speed={20}
              width={90}
              height={24}
              top={200}
              up={moving.up}
              down={moving.down}
              backward={moving.backward}
              forward={moving.forward}
              area={[0, 800, 0, 400]}
              start={moving.start}
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
