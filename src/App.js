import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainScreen from "./screens";
import { toRange } from "./utility";

const Container = styled.div`
  position: absolute;
  width: 1280px;
  height: 800px;
  top: 50%;
  left: 50%;
  background: #31135a;
  transform-origin: top left;
  overflow: hidden;
`;

function App() {
  const [viewSize, setViewSize] = useState([
    window.innerWidth,
    window.innerHeight
  ]);
  const [viewScale, setViewScale] = useState(1);
  window.onresize = () => {
    setViewSize([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    if (viewSize[1] / viewSize[0] > 0.625) {
      setViewScale(toRange(viewSize[0] / 1280, 0.5, 1.5));
    } else {
      setViewScale(toRange(viewSize[1] / 800, 0.5, 1.5));
    }
  }, [viewSize]);

  return (
    <Container
      style={{ transform: `scale(${viewScale}) translate(-50%, -50%)` }}
    >
      <MainScreen />
    </Container>
  );
}

export default App;
