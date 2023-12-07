import styled from "styled-components";
import { ChildrenProp } from "../../ types/propsTypes";

type MtContainerProps = ChildrenProp & {};

const MtContainer = ({ children }: MtContainerProps) => <Container>{ children }</Container>;

export default MtContainer;

const Container = styled.div`
  /* margin-top: 5.4rem; */
  margin-top: 5.2rem;
  min-height: 100vh;
  padding-bottom: 2rem;
`