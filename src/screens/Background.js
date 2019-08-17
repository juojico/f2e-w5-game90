import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sky from "../components/Sky";
import Ground from "../components/Ground";
import Things from "../components/Things";
import { generateList } from "../utility";

const BgArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Background = ({ start = false, gaming, end, time }) => {
  const [bgThings1, setBgThings1] = useState([]);
  const [bgThings2, setBgThings2] = useState([]);

  useEffect(() => {
    if (time % 20 === 0) {
      setBgThings1(generateList(["bone1", "bone2", "skull"], 3, 10));
    } else if (time % 20 === 10) {
      setBgThings2(generateList(["bone1", "bone2", "skull"], 3, 10));
    }
  }, [time]);

  return (
    <BgArea>
      <Sky start={start} end={end} />
      <Ground start={start} gaming={gaming} end={end}>
        {bgThings1.map(item => (
          <Things
            key={"bgThings1" + item.id}
            top={item.top}
            left={1280 + item.game_time * 200}
            actor={item.name}
            start={start}
          />
        ))}
        {bgThings2.map(item => (
          <Things
            key={"bgThings1" + item.id}
            top={item.top}
            left={1280 + item.game_time * 200}
            actor={item.name}
            start={start}
          />
        ))}
      </Ground>
    </BgArea>
  );
};

export default Background;
