import styled from "styled-components";
import React from "react";

type PropsType = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Iconbutton = ({ children, onClick }: PropsType) => {

  return (
    <IconBtn onClick={onClick}>
      { children }
    </IconBtn>
  )
};

export default Iconbutton;

const IconBtn = styled.button`
  padding: .2rem .5rem;
  border: 2px solid red;
  border-radius: 5px;
  position: relative;

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