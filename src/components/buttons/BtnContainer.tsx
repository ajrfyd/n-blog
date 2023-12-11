import styled from "styled-components";
import { ChildrenProp } from "../../ types/propsTypes";

type BtnContainerProp = ChildrenProp & {};

const BtnContainer = ({ children }: BtnContainerProp) => {

  return (
    <Container>
      { children }
    </Container>
  )
}

export default BtnContainer;

const Container = styled.div`
  margin-top: 1rem;
  align-self: flex-end;
`