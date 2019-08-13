import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
`;

function MainScreen() {
  const [pages, setPages] = useState({});
  return <Container>MainPage</Container>;
}

export default MainScreen;
