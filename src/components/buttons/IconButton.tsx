import styled from "styled-components";
import React from "react";
import { ChildrenProp } from "../../types";

type PropsType = ChildrenProp & {
  onClick?: () => void;
  style?: React.CSSProperties;
};

const Iconbutton = ({ children, onClick, style }: PropsType) => {

  return (
    <IconBtn onClick={onClick} style={style}>
      { children }
    </IconBtn>
  )
};

export default Iconbutton;

const IconBtn = styled.button`
  padding: .2rem .5rem;
  border: 2px solid var(--brown);
  border-radius: 2rem;
  position: relative;

  &:hover {
    border: 2px solid var(--purple);
    color: #075ACA;
  }
  
  &:active {
    transform: scale(1.1);
  }

  & + & {
    margin-left: .5rem;
  }

  @media (max-width: 768px) {
    & {
      margin-top: .5rem;
    }

    & + & {
      margin-left: 0;
      margin-top: .5rem;
    }
  }
`;