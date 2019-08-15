import React from "react";
import styled, { keyframes } from "styled-components";
import { footer } from "../../assets";

const bgMove = keyframes`
  to {
    background-position: -1280px 0;
  }
`;

const FooterWrapper = styled.div`
  position: absolute;
  width: 1280px;
  height: 175px;
  bottom: 0;
  left: 0;
  background-image: url(${footer});
  background-repeat-y: no-repeat;
  animation: ${bgMove} 5s linear infinite;
`;

const Bar = styled.div`
  position: absolute;
  width: 1280px;
  height: 60px;
  bottom: 0;
  left: 0;
  background-color: #34213f;
`;

const Footer = ({ start = "false" }) => {
  return (
    <FooterWrapper>
      <Bar />
    </FooterWrapper>
  );
};

export default Footer;
