import React, { useState } from "react";
import styled from "styled-components";
import Boxs from "../components/Boxs";
import Hero from "../components/Hero";
import Tomb from "../components/Tomb";
import Heart from "../components/Heart";
import Things from "../components/Things";
import Enemies from "../components/Enemies";
import MoveBox from "../components/MoveBox";
import { START_LIFE, OBSTACLES } from "../constants";
import { ranArr, inRange } from "../utility";

const GamingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const GameArea = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 300px;
`;

const Gaming = ({ start, heroColor, time }) => {
  const [listen, setListen] = useState(true);
  const [hero, setHero] = useState({
    animation: "normal",
    life: START_LIFE
  });
  const [moving, setMoving] = useState({
    start: false,
    up: 0,
    down: 0,
    backward: 0,
    forward: 0
  });
  const [obsIndex, setObsIndex] = useState({ boss: 0, tomb: 0 });

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
        setHero({ ...hero, animation: "heroWalk" });
        console.log("TCL: MainScreen -> movingkeydown", moving);
        break;
      case "keyup":
        setMoving({ ...moving, start: false, [keyName]: 0 });
        setHero({ ...hero, animation: "normal" });
        console.log("TCL: MainScreen -> movingkeyup", moving);
        break;

      default:
        setMoving({ ...moving, start: false });
        break;
    }
  };

  console.log("TCL: MainScreen", moving);

  if (start && listen) {
    setListen(false);
    document.addEventListener("keydown", handleKey);
    document.addEventListener("keyup", handleKey);
  }

  const obstacles = [
    { name: "spike",game_time: 1, power: 1 },
    { name: "rock" ,game_time: 3, power: 1 },
    { name: "evilHand" ,game_time: 4, power: 1 },
    { name: "spike" ,game_time: 5, power: 1 },
    { name: "rock" ,game_time: 6, power: 1 }
  ];

  const isTouch = obstacles => {
    // 檢查碰撞
    // inRange(num, min, max)
  };

  const generateThings = obstacles => {
    // 生成背景物件
  };

  const generateEnemies = obstacles => {
    // 生成敵人
  };

  const generateObstacles = time => {
    // const thisObs = ranArr(OBSTACLES.obs);
    // if (time % 10) {
    //   return (
    //     <Boxs width={200} height={60} top={200} left={1280}>
    //       <Things actor={thisObs} />
    //     </Boxs>
    //   );
    // }
  };

  return (
    <GamingWrapper>
      <Heart amount={START_LIFE} life={hero.life} />
      <GameArea>
        {obstacles.map(item => (
          <Boxs
            width={200}
            height={60}
            top={200}
            left={1280 + item.game_time}
          >
            <Things actor={item.name} />
          </Boxs>
        ))}
        <MoveBox
          speed={20}
          width={90}
          height={24}
          top={200}
          left={50}
          up={moving.up}
          down={moving.down}
          backward={moving.backward}
          forward={moving.forward}
          area={[0, 800, 300, 700]}
          start={moving.start}
        >
          <Hero animation={hero.animation} color={heroColor} />
        </MoveBox>
        <Boxs width={0} height={120} top={0} left={300} moveStyle='boss'>
          <Enemies actor='boss' />
        </Boxs>
        <Boxs
          width={120}
          height={60}
          top={150}
          left={500}
          moveStyle='littleBoss'
        >
          <Enemies actor='littleBoss' />
        </Boxs>
        <Boxs width={200} height={60} top={250} left={300}>
          <Enemies actor='evilHand' />
        </Boxs>
        <Boxs width={200} height={60} top={0} left={700}>
          <Things actor='spike' />
        </Boxs>
        <Boxs width={400} height={90} top={200} left={700}>
          <Things actor='rock' />
        </Boxs>
        <Boxs width={0} height={0} top={400} left={700}>
          <Things actor='bone1' />
        </Boxs>
        <Boxs width={0} height={0} top={400} left={800}>
          <Things actor='skull' />
        </Boxs>
        <Boxs width={90} height={30} top={400} left={850}>
          <Things actor='star' />
        </Boxs>
        <Boxs width={180} height={60} top={0} left={950}>
          <Tomb name='Player Name' time='2019/08/16 23:12:08' />
        </Boxs>
      </GameArea>
    </GamingWrapper>
  );
};

export default Gaming;
