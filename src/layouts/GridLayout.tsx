import styled from 'styled-components';
import { ChildrenProp } from '../ types/propsTypes';

type GridLayoutProps = ChildrenProp & {};

const GridLayout = ({ children }: GridLayoutProps) => {

  return (
    <GridContainer>
      { children }
    </GridContainer>
  )
}

export default GridLayout;

const GridContainer = styled.main`
  display: grid;
  gap: 1rem;

  grid-template-columns: repeat(4, auto);


  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, auto);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, auto);
  }
`;