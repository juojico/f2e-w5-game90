import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { dialogBg } from "../../assets";

const DialogWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(52, 33, 63, 0.6);
  overflow: hidden;
  opacity: ${props => (props.open ? "1" : "0")};
  backdrop-filter: blur(3px);
  transition: 0.5s;
`;

const DialogBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 900px;
  height: ${props => (props.open ? "740px" : "0")};
  top: ${props => (props.open ? "50%" : "-50%")};
  left: 50%;
  padding: 90px;
  color: #6c488b;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.75em;
  text-align: center;
  white-space: pre-line;
  background: url(${dialogBg});
  background-repeat: no-repeat;
  background-size: contain;
  transform: translate(-50%, -50%);
  opacity: ${props => (props.open ? "1" : "0")};
  overflow: hidden;
  filter: drop-shadow(2px 10px 20px rgba(0, 0, 0, 0.5));
  transition: 0.3s;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;
  left: 50%;
  transform: translate(-50%);
`;

const Dialog = ({ children, open, context, onClick, btnText }) => {
  return (
    <DialogWrapper open={open}>
      <DialogBox open={open}>
        {children}
        <span>{context}</span>
        <Footer>
          <Button onClick={onClick} text={btnText} />
        </Footer>
      </DialogBox>
    </DialogWrapper>
  );
};

export default Dialog;
