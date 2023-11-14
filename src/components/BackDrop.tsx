import { ReactNode } from "react";
import styled from "styled-components";

type BackDropProps = {
  children: ReactNode;
};

const BackDrop = ({ children }: BackDropProps) => {

  return (
    <BackContainer>
      { children }
    </BackContainer>
  )
}

export default BackDrop;

const BackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
`