import { ChildrenProp } from "../ types/propsTypes";
import styled from "styled-components";

type IconMenuProp = ChildrenProp & {};

const IconMenu = ({ children }: IconMenuProp) => {

  return (
    <MenuContainer>
      { children }
    </MenuContainer>
  )
}

export default IconMenu;

const MenuContainer = styled.div`
  display: flex;
  gap: .5rem;
`