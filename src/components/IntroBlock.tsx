import React from "react";
import styled from "styled-components";

type IntoroBlockProps = {
  children: React.ReactNode;
  $rTl?: boolean;
}

const IntroBlock = ({ children, $rTl }: IntoroBlockProps) => {


  return (
    <Block $rTl={$rTl}>
      { children }
    </Block>
  )
}

export default IntroBlock;

const Block = styled.div<IntoroBlockProps>`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  margin-top: 5rem;
  
  p {
    color: var(--teal);
    font-size: 3rem;
    width: max-content;
    position: absolute;

    text-align: ${({ $rTl }) => $rTl ? "center" : ""};
  }

  @media (max-width: 1200px) {
    p {
      font-size: 2rem;
    }
  };

  @media (max-width: 767px) {
    p {
      font-size: 1.5rem;
    }
  }
`