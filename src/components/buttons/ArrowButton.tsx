import styled from "styled-components";
import React from "react";
import { ChildrenProp } from "../../types";

type ArrowButtonProps = ChildrenProp & {
  onClick?: () => void;
  style?: React.CSSProperties;
};

const ArrowButton = ({ children, onClick, style }: ArrowButtonProps) => {

  return (
    <BtnContainer onClick={onClick} style={style}>
      { children }
    </BtnContainer>
  )
};

export default ArrowButton;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-weight: bold;
`