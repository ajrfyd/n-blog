import { useState, useCallback, useEffect } from "react";
import ContentContainer from "../components/ContentContainer";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import axios from "axios";
import usePathName from "../lib/hooks/usePathName";
import BtnContainer from "../components/buttons/BtnContainer";
import InputSelect from "../components/post/InputSelect";
import CustomButton from "../components/CustomButton";
import CreatableSelect from "react-select/creatable";
import { Input } from "../components/SearchInput";
import { ServerTagType } from "../ types/postTypes";
import { notify } from "../stroe/notify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useUserState from "../lib/hooks/useLogin";
import { useAllTagsQuery } from "../lib/api/apiQueries";
// import posts, { getPostsData } from "../stroe/posts";

export type MdTagType = {
  id: string;
  label: string;
};

// type PostType = {
//   title: string;
//   body: string | undefined;
//   tags: ServerTagType[];
// };

// Todo - CreatableSelect 상태값 따로 관리
// Todo - post axios 주소 변경 및 instance 화
type MdChangeType = (value?: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void;

const PostPage = () => {
  const [path] = usePathName();
  const serverTags = useAllTagsQuery(true);
  const [user] = useUserState();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [post, setPost] = useState<PostType>({ title: "", body: "", tags: [] });
  // const localTags = usePostsData("tags") as ServerTagType[];
  const [localTags, setLocalTags] = useState<ServerTagType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const posts = useSelector((state: RootReducerType) => state.posts);

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [title]);
  const onChangeBody = useCallback<MdChangeType>((value) => setBody(value as string), [body]);
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(title === "" || body === "") return dispatch(notify("타이틀이랑 본문은 입력해야해요!"));
    // if(post.title === "" || post.body === "") dispatch(notify("타이틀이랑 본문은 입력해야해요!"));
    const post = {
      title,
      body,
      id: uuid(),
      tags: localTags,
      createdAt: new Date(Date.now())
    };
    
    // setPost(prev => ({ ...prev, createdAt: new Date(Date.now()) }));
    //! post 작성 주소 수정 요망
    const { data } = await axios("http://localhost:8080/posts/write", { data: post, method: "post" });
    data.status === 200 ? navigate("/posts", { replace: true }) : dispatch(notify("오류 발생!"));
  };

  useEffect(() => {
    if(!user || (user && user.role !== "admin")) {
      dispatch(notify("권한이 없습니다."));
      navigate("/");
    }
  }, [user]);

  // if(!data) return null;

  return (
    <ContentContainer>
      <FormContainer data-color-mode="light" onSubmit={onSubmit}>
        <Title>
          {path === "write" ? "New" : "Edit"} Posts
        </Title>
        <InputSelect>
          <InputTitle
            // ref={titleRef}
            type="text" 
            style={{ flex: 2 }} 
            placeholder="제목을 입력하세요."
            name="title"
            value={title}
            onChange={onChangeTitle}
          />
          <div style={{ flex: 1 }}>
            <CreatableSelect
              isMulti
              onCreateOption={(label) => {
                const newTag = { id: uuid(), label };
                console.log(label, '< label');
                setLocalTags(prev => [newTag,...prev]);
                // setPost(prev => ({...prev, tags: [newTag, ...prev.tags] }))
              }}
              options={serverTags? serverTags.map(tag => ({ label: tag.label, value: tag.id })) : [{ label: "Loading...", value: "loading..." }]}
              // value={post.tags.map(tag => ({ label: tag.label, value: tag.id }))}
              // onChange={(tag) => {
              //   setPost(post.map(p => ))
              // }}
              value={localTags.map(tag => ({ label: tag.label, value: tag.id }))}
              onChange={(tags, action) => {
                //* onChang로 들어오는 값은 단일 값이 아닌 MultiValue이다
                //* 반복문이 필요하다
                if(!action.option) return;
                // dispatch(notify("이 태그는 선택할 수 없습니다."));
                console.log(action.option, "actiodnd");
                if(action.option.label === "All") return dispatch(notify("이 태그는 선택할 수 없습니다."));
                const serverTags = tags.map(tag => ({ id: tag.value, label: tag.label }));
                setLocalTags(serverTags);
              }}
              // onChange={tag => setLocalTags(prev => [{ id: tag.value, label: tag.label },...prev])}
            />
          </div>
        </InputSelect>
        <MDEditor 
          height={460}
          value={body}
          onChange={onChangeBody}
        />
        <BtnContainer>
          <CustomButton 
            // onClick={() => {}}
            type="submit"
            $bgColor="teal"
            color="#fff"
          >
            등록
          </CustomButton>
          <CustomButton onClick={() => navigate("/", { replace: true})}>취소</CustomButton>
        </BtnContainer>
      </FormContainer>
    </ContentContainer>
  )
}

export default PostPage;

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