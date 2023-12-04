import { useState, useCallback, useEffect } from "react";
import ContentContainer from "../components/ContentContainer";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuid } from "uuid";
import usePathName from "../lib/hooks/usePathName";
import PostBottom from './PostBottom';
import PostTop from './PostTop';
import CustomButton from "../components/CustomButton";
import CreatableSelect from "react-select/creatable";
import { Input } from "../components/SearchInput";
import { ServerTagType } from "../ types/postTypes";
import { notify } from "../stroe/notify";
import { useNavigate } from "react-router-dom";
import { usePostsData } from "../lib/hooks/useStore";
import { useDispatch } from "react-redux";
import useUserState from "../lib/hooks/useLogin";
// import posts, { getPostsData } from "../stroe/posts";

export type MdTagType = {
  id: string;
  label: string;
};

type PostType = {
  title: string;
  body: string | undefined;
  tags: ServerTagType[];
};

// Todo - CreatableSelect 상태값 따로 관리
type MdChangeType = (value?: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void;

const PostLayout = () => {
  const [path] = usePathName();
  const [post, setPost] = useState<PostType>({ title: "", body: "", tags: [] });
  // Todo localTags 처리 요망! Because changed server query
  const localTags = usePostsData("tags") as ServerTagType[];
  const [user] = useUserState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const posts = useSelector((state: RootReducerType) => state.posts);

  // console.log(posts);
  const onChangText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPost(prev => ({ ...prev, title: e.target.value })), [post.title]);
  const onChangeBody = useCallback<MdChangeType>((value) => setPost(prev => ({...prev, body: value })), [post.body]);
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(post.title === "" || post.body === "") dispatch(notify("타이틀이랑 본문은 입력해야해요!"));
    e.preventDefault();
    setPost(prev => ({ ...prev, createdAt: new Date(Date.now()) }));
    const { data } = await axios("http://localhost:8080/posts/write", { data: { ...post, id: uuid(), createdAt: new Date(Date.now()) }, method: "post" });
    data.status === 200 ? navigate("/posts", { replace: true }) : dispatch(notify("오류 발생!"));
  };

  useEffect(() => {
    if(!user || (user && user.role !== "admin")) {
      dispatch(notify("권한이 없습니다."));
      navigate("/");
    }
  }, [user]);

  return (
    <ContentContainer>
      <FormContainer data-color-mode="light" onSubmit={onSubmit}>
        <Title>
          {path === "write" ? "New" : "Edit"} Posts
        </Title>
        <PostTop>
          <InputTitle
            // ref={titleRef}
            type="text" 
            style={{ flex: 2 }} 
            placeholder="제목을 입력하세요."
            name="title"
            value={post.title}
            onChange={onChangText}
          />
          <div style={{ flex: 1 }}>
            <CreatableSelect
              isMulti
              onCreateOption={(label) => {
                console.log(label)
                const newTag = { id: uuid(), label };
                console.log(label, '< label');
                setPost(prev => ({...prev, tags: [newTag, ...prev.tags] }))
              }}
              options={localTags.map(tag => ({ label: tag.label, value: tag.id }))}
              value={post.tags.map(tag => ({ label: tag.label, value: tag.id }))}
              // onChange={(tag) => {
              //   setPost(post.map(p => ))
              // }}
              onChange={a => console.log(a, "asdasdas")}
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
            // onClick={() => {}}
            type="submit"
            $bgColor="teal"
            color="#fff"
          >
            등록
          </CustomButton>
          <CustomButton onClick={() => navigate("/", { replace: true})}>취소</CustomButton>
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