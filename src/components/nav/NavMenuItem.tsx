import styled from "styled-components";
import { Link } from "react-router-dom";
import { InitialType } from "../../ types/global";

type NavMenuItemProps = InitialType & {
  to: string;
};

const NavMenuItem = ({ children, to }: NavMenuItemProps) => {

  return (
    <Item to={to}>
      { children }
    </Item>
  )
}

export default NavMenuItem;

const Item = styled(Link)`
  color: #f3f3f3;
  display: flex;
  align-items: center;

  & + & {
    margin-left: 1rem;
  }
  
  &:hover {
    color: #f9f9f9;
  }
`;