import styled from "styled-components";
import { ChildrenProp } from "../../ types/propsTypes";

type MainTitleProps = ChildrenProp & {};

const MainTitle = ({ children }: MainTitleProps) => {

  return (
    <MainTittle>
      { children }
    </MainTittle>
  )
}

export default MainTitle;

const MainTittle = styled.h1`
  font-size: 4rem;
`;