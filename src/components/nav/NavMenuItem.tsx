import styled from "styled-components";
import { Link } from "react-router-dom";
import { ChildrenProp } from "../../types";
import { darken } from "polished";

type NavMenuItemProps = ChildrenProp & {
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
  color: ${({ theme }) => theme.themes.color.purple};
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, .87);

  & + & {
    margin-left: 1rem;
  }
  
  &:hover {
    /* color: #f9f9f9; */
    color: ${({ theme: { themes: { color: { purple } } } }) => darken(0.1, purple)};
  }
`;