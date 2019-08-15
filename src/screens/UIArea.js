import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const UIAreaWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 30;
`;

const UIArea = () => {
  return (
    <UIAreaWrapper>
      <Footer />
    </UIAreaWrapper>
  );
};

export default UIArea;
