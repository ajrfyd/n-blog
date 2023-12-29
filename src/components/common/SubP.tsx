import styled from "styled-components";
import { ChildrenProp } from "../../types";
import React from "react";

type SubPProps = ChildrenProp & {
  style?: React.CSSProperties;
};

const SubP = ({ children, style }: SubPProps) => {

  return (
    <P style={style}>
      { children }
    </P>
  )
};

export default SubP;

const P = styled.p`
  font-size: 1.5rem;
`;