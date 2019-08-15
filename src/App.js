import React, { useState } from "react";
import styled from "styled-components";
import MainScreen from "./screens";
import { toRange } from "./utility";

const Container = styled.div`
  position: absolute;
  width: 1280px;
  height: 800px;
  background: #31135a;
  transform-origin: top left;
`;

function App() {
  const [viewW, setViewW] = useState(window.innerWidth / 1280);
  window.onresize = () => {
    setViewW(toRange(window.innerWidth / 1280, 0.5, 1.5));
  };
  return (
    <Container style={{ transform: `scale(${viewW})` }}>
      <MainScreen />
    </Container>
  );
}

export default App;
