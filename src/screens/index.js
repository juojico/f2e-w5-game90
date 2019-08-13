import React, { useState } from "react";
import styled from "styled-components";
import { inRange } from "../utility/index";
import MoveBox from "../components/MoveBox";

const Container = styled.div`
  position: absolute;
`;


function MainScreen() {

  return (
    <Container>
      MainPage{inRange(0, 5, -2)}
      <MoveBox
        width={100}
        height={100}
        speed={1}
        bgColor={"#379"}
      />
    </Container>
  );
}

export default MainScreen;
