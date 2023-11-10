import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type ItemProps = {
  children: ReactNode;
  $bgColor?: string;
};

const GridItem: FC<ItemProps> = ({ children, $bgColor }: ItemProps) => {

  return (
    <Item $bgColor={$bgColor}>
      { children }
    </Item>
  )
}

export default GridItem;

const Item = styled.div<Pick<ItemProps, "$bgColor">>`
  /* border-color: hsl(0, 0%, 80%); */
  /* border-width: 1px; */
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 10px;
  min-height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .1s;

  ${({ $bgColor, theme }) => $bgColor && css`
    background-color: ${theme.themes.color[$bgColor]};
  `};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 5px rgba(0, 0, 0, .2);
  }
`