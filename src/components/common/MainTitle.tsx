import styled from "styled-components";
import { ChildrenProp } from "../../ types/propsTypes";

type MainTitleProps = ChildrenProp & {
  color?: string;
  $isShadow?: boolean;
};

const MainTitle = ({ children, color = "#fff", $isShadow = false }: MainTitleProps) => {

  return (
    <MainTittle 
      color={color} 
      $isShadow={$isShadow}
    >
      { children }
    </MainTittle>
  )
}

export default MainTitle;

const MainTittle = styled.h1<Pick<MainTitleProps, "$isShadow">>`
  font-size: 5rem;
  color: ${({ color }) => color};
  text-shadow: ${({ $isShadow }) => $isShadow ? "5px 5px 3px rgba(0, 0, 0, .9)" : "none"};
`;