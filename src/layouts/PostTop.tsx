import styled from "styled-components";
import { ChildrenProp } from "../ types/propsTypes";

type PostTopProps = ChildrenProp & {};

const PostTop = ({ children }: PostTopProps) => {

  return (
    <Container>
      {
        children
      }
    </Container>
  )
}

export default PostTop;

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 390px) {
    flex-direction: column;
  }
`
