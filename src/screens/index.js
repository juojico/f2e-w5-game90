import React, { useState } from "react";
import styled from "styled-components";
import MoveBox from "../components/MoveBox";
import Hero from "../components/Hero";
import Ground from "../components/Ground";

const Container = styled.div`
  position: absolute;
  width: 1200px;
  height: 800px;
  background: #31135a;
`;

const BgArea = styled.div`
  position: absolute;
  width: 1200px;
  height: 800px;
  z-index: 1;
`;

const GameArea = styled.div`
  position: absolute;
  width: 1200px;
  height: 800px;
  z-index: 10;
`;

const UIArea = styled.div`
  position: absolute;
  width: 1200px;
  height: 800px;
  z-index: 30;
`;

function MainScreen() {
  const [listen, setListen] = useState(true);
  const [hero, setHero] = useState({ animation: "normal" });
  const [moving, setMoving] = useState({
    start: false,
    up: 0,
    down: 0,
    backward: 0,
    forward: 0
  });

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
        setHero({ animation: "heroWalk" });
        console.log("TCL: MainScreen -> movingkeydown", moving);
        break;
      case "keyup":
        setMoving({ ...moving, start: false, [keyName]: 0 });
        setHero({ animation: "normal" });
        console.log("TCL: MainScreen -> movingkeyup", moving);
        break;

      default:
        setMoving({ ...moving, start: false });
        break;
    }
  };

  console.log("TCL: MainScreen", moving);

  if (listen) {
    setListen(false);
    document.addEventListener("keydown", handleKey);
    document.addEventListener("keyup", handleKey);
  }

  return (
    <Container>
      <BgArea>
        <Ground />
      </BgArea>

      <GameArea>
        <Hero animation='heroBuff' />
        <Hero animation='heroHurt' />
        <Hero animation='heroDie' />
        <MoveBox
          speed={20}
          top={500}
          left={50}
          up={moving.up}
          down={moving.down}
          backward={moving.backward}
          forward={moving.forward}
          area={[0, 400, 300, 770]}
          start={moving.start}
        >
          <Hero animation={hero.animation} />
        </MoveBox>
      </GameArea>

      <UIArea>ui</UIArea>
    </Container>
  );
}

export default MainScreen;
