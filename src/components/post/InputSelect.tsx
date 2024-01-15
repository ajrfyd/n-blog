import styled from "styled-components";
import { ChildrenProp } from "../../types";

type InputSelectPorps = ChildrenProp & {};

const InputSelect = ({ children }: InputSelectPorps) => {

  return (
    <Container>
      {
        children
      }
    </Container>
  )
};

export default InputSelect;

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`
