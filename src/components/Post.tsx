import styled from "styled-components";
import { PostType } from '../pages/BlogMain';
import CustomButton from "./CustomButton";

const Post = ({ title, tags }: PostType) => {

  return (
    <Container>
      <Title>{title}</Title>
      <TagContainer>
        {
          tags.map(tag => <CustomButton key={tag} size="sm" onClick={console.log}>{tag}</CustomButton>)
        }
      </TagContainer>
    </Container>
  )
}

export default Post;

const Container = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  color: ${({ theme }) => theme.themes.color.teal};
`;
const TagContainer = styled.ul``;
// const Tag = styled.li``;