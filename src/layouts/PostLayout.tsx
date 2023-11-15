import { useState, useCallback } from "react";
import ContentContainer from "../components/ContentContainer";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import usePathName from "../lib/hooks/usePathName";
import PostBottom from './PostBottom';
import PostTop from './PostTop';
import CustomButton from "../components/CustomButton";
import CreatableSelect from "react-select/creatable";
import { Input } from "../components/SearchInput";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Tags } from "../ types/postTypes";

export type MdTagType = {
  id: string;
  label: string;
};

type PostType = {
  title: string;
  body: string | undefined;
  tags: Tags[];
};

// Todo - CreatableSelect 상태값 따로 관리
// Todo - ref 사용? 
type MdChangeType = (value?: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void;

const PostLayout = () => {
  const [path] = usePathName();
  const [post, setPost] = useState<PostType>({ title: "", body: "", tags: [] });

  const onChangText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPost(prev => ({ ...prev, title: e.target.value })), [post.title]);
  const onChangeBody = useCallback<MdChangeType>((value) => setPost(prev => ({...prev, body: value })), [post.body]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setPost(prev => ({ ...prev, createdAt: new Date(Date.now()) }));
    const a = await axios("http://localhost:8080/posts/write", { data: { ...post, id: uuid(), createdAt: new Date(Date.now()) }, method: "post" });
    console.log(a);
  };

  return (
    <ContentContainer>
      <FormContainer data-color-mode="light" onSubmit={onSubmit}>
        <Title>{path === "write" ? "New" : "Edit"} Posts</Title>
        <PostTop>
          <InputTitle 
            type="text" 
            style={{ flex: 2 }} 
            placeholder="제목을 입력하세요."
            name="title"
            value={post.title}
            onChange={onChangText}
            required
          />
          <div style={{ flex: 1 }}>
            <CreatableSelect
              isMulti
              onCreateOption={(label) => {
                const newTag = { id: uuid(), label };
                console.log(label, '< label')
                setPost(prev => ({...prev, tags: [newTag, ...prev.tags] }))
              }}
              // options={post.map(tag => ({ label: tag.label, value: tag.id }))}
              value={post.tags.map(tag => ({ label: tag.label, value: tag.id }))}
              // onChange={(tag) => {
              //   setPost(post.map(p => ))
              // }}
            />
          </div>
        </PostTop>
        <MDEditor 
          height={460}
          value={post.body}
          onChange={onChangeBody}
        />
        <PostBottom>
          <CustomButton 
            onClick={console.log}
            $bgColor="teal"
            color="#fff"
          >
            등록
          </CustomButton>
          <CustomButton onClick={console.log}>취소</CustomButton>
        </PostBottom>
      </FormContainer>
    </ContentContainer>
  )
}

export default PostLayout;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, .4);
`;

const InputTitle = styled(Input)`
  
`