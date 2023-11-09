import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type ItemProps = {
  children: ReactNode;
};

const GridItem: FC<ItemProps> = ({ children }: ItemProps) => {

  return (
    <Item>
      { children }
    </Item>
  )
}

export default GridItem;

const Item = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
`