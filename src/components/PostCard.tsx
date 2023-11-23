import React from "react";
import styled from "styled-components";
import { Tags } from "../ types/postTypes";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

type PostPropsType = {
  title: string;
  tags: Tags[];
  id: string;
  body: string;
};

// Todo - title 말줄임 혹은 예쁘게
// Todo - text-indent 작업

const PostCard = ({ title, tags, id, body }: PostPropsType) => {
  const navigate = useNavigate();
  // console.log("PostCard render");

  return (
    <Container onClick={() => navigate(`/post/${id}`, { state: { body, id, title, tags }})}>
      <Wrapper>
        <Title>{title}</Title>
        <TagContainer>
          {
            tags.map(tag => <CustomButton key={tag.id} size="sm">{tag.label}</CustomButton>)
          }
        </TagContainer>
      </Wrapper>
    </Container>
  )
}

export default React.memo(PostCard);

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  min-height: 150px;
`;

const Wrapper = styled.div`
  min-height: 150px;
  margin: 1rem 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  align-items: center;
`

const Title = styled.h3`
  color: ${({ theme }) => theme.themes.color.purple};
  /* display: inline-block; */
  width: 200px;
  overflow: hidden;
  margin-bottom: .7rem;
  white-space: nowrap;
  justify-self: flex-start;
  /* text-indent: -100px; */
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;