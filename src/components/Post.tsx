import styled from "styled-components";
import { Tags } from "../ types/postTypes";
import CustomButton from "./CustomButton";

type PostPropsType = {
  title: string;
  tags: Tags[];
};

// Todo - title 말줄임 혹은 예쁘게

const Post = ({ title, tags }: PostPropsType) => {
  return (
    <Container>
      <Title>{title}</Title>
      <TagContainer>
        {
          tags.map(tag => <CustomButton key={tag.id} size="sm" onClick={console.log}>{tag.label}</CustomButton>)
        }
      </TagContainer>
    </Container>
  )
}

export default Post;

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const Title = styled.h3`
  color: ${({ theme }) => theme.themes.color.teal};
  margin-bottom: 1rem;
`;
const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
// const Tag = styled.li``;