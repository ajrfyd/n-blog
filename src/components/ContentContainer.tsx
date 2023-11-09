import React from "react";
import styled from "styled-components";

type ContentContainerProps = {
  children: React.ReactNode;
  width?: number;
};

const ContentContainer = ({ children, width = 80 }: ContentContainerProps) => {
  return (
    <Container width={width}>
      { children }
    </Container>
  )
}

export default ContentContainer;


const Container = styled.div<ContentContainerProps>`
  width: ${({ width }) => `${width}%`};
  margin: 0 auto;
  padding: 2rem 1rem;

  border: 5px solid var(--teal);
`