import styled from "styled-components";
import { Link } from "react-router-dom";
import { InitialType } from "../../ types/global";
import { darken } from "polished";

type NavMenuItemProps = InitialType & {
  to?: string;
  onClick?: () => void;
};

const NavMenuItem = ({ children, to = "/", onClick }: NavMenuItemProps) => {

  return (
    <Item to={to} onClick={onClick}>
      { children }
    </Item>
  )
}

export default NavMenuItem;

const Item = styled(Link)`
  /* color: #f3f3f3; */
  color: ${({ theme }) => theme.themes.color.white};
  display: flex;
  align-items: center;
  font-size: 1.1rem;

  & + & {
    margin-left: 1rem;
  }
  
  &:hover {
    /* color: #f9f9f9; */
    color: ${({ theme: { themes: { color: { purple } } } }) => darken(0.1, purple)};
  }
`;