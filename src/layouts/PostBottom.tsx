import styled from "styled-components";
import { ChildrenProp } from "../ types/propsTypes";

type PostBottomProps = ChildrenProp & {};

const PostBottom = ({ children }: PostBottomProps) => {
  
  return (
    <Container>
      { children }
    </Container>
  )
}

export default PostBottom;

const Container = styled.div`
  margin-top: 1rem;
  align-self: flex-end;
`