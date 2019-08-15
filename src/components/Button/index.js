import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 7px 15px;
  font-size: 30px;
  color: white;
  background: #6c488b;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    color: #6c488b;
    background: white;
    border: 2px solid #6c488b;
  }
`;

const Button = ({ onClick, text }) => {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
};

export default Button;
