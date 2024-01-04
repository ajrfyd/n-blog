import { useState, useCallback, useEffect } from "react";
import ContentContainer from "../components/post/ContentContainer";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import BtnContainer from "../components/buttons/BtnContainer";
import InputSelect from "../components/post/InputSelect";
import CustomButton from "../components/buttons/CustomButton";
import CreatableSelect from "react-select/creatable";
import MtContainer from "../components/common/MtContainer";
import { Input } from "../components/input/SearchInput";
import { ServerTagType } from "../types";
import { notify } from "../stroe/notify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useUserState from "../lib/hooks/useLogin";
import { useReqAllTagsData } from "../lib/api/apiQueries";
import useMutatePost from "../lib/hooks/useMutatePost";
// import posts, { getPostsData } from "../stroe/posts";

type MdChangeType = (value?: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void;

const PostPage = () => {
  const { tagList } = useReqAllTagsData();
  const [user] = useUserState();
  const { id } = useParams();
  const { state } = useLocation();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [localTags, setLocalTags] = useState<ServerTagType[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutatePost(
    { title, body, tags: localTags },
    (id) => navigate(`/post/${id}`), 
    (error) => navigate("/error", { state: { status: error.response?.data.status, message: error.response?.data.message }}),
    isEdit
  );

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [title]);

  const onChangeBody = useCallback<MdChangeType>((value) => setBody(value as string), [body]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(title === "" || body === "") return dispatch(notify("타이틀이랑 본문은 입력해야해요!"));
    
    mutate();
    console.log(title, body, localTags);
  };

  useEffect(() => {
    if(!user || (user && user.role !== "admin")) {
      dispatch(notify("권한이 없습니다."));
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if(!id) return;
    if(id && (state && state.id)) {
      console.log("%cid!!!!!", "color: yellow");
      setTitle(state.title);
      setBody(state.body); 
      setLocalTags(prev => [...state.tags,...prev])   
      setIsEdit(true);
    }
  }, [id]);

  console.log(`%c PostPage Render`, "color:red");
  // if(!data) return null;
  return (
    <MtContainer>
      <ContentContainer>
        <FormContainer data-color-mode="light" onSubmit={onSubmit}>
          <Title>
            {!!id ? "Edit" : "New"} Post
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
                  setLocalTags(prev => [newTag,...prev]);
                  // setPost(prev => ({...prev, tags: [newTag, ...prev.tags] }))
                }}


                options={
                  tagList ? 
                    tagList.result.map(tag => ({ label: tag.label, value: tag.id })) :
                    [{ label: "Loading...", value: "loading..." }]
                }
                
                // value={post.tags.map(tag => ({ label: tag.label, value: tag.id }))}
                // onChange={(tag) => {
                //   setPost(post.map(p => ))
                // }}
                value={
                  localTags.map(tag => ({ label: tag.label, value: tag.id }))
                }
                onChange={(_, action) => {
                  //* tags: 선택한 모든 값이 배열로 들어옴
                  //* action: select시 action.action === 'select-option'
                  //* delete시 action.action === 'remove-value'
                  //* clear시 action.action === 'clear'
                  //* onChang로 들어오는 값은 단일 값이 아닌 MultiValue이다
                  //* 반복문이 필요하다
                  if(!action) return;
                  const { action: choice } = action;
                  
                  if(choice === "clear") return setLocalTags([]);
                  if(choice === "remove-value") return setLocalTags(prev => prev.filter(tag => action.removedValue.value !== tag.id));
                  if(choice === "select-option") {
                    const { option } = action;
                    if(!option) return;
                    option.label && option.label === "All" ? dispatch(notify("이 태그는 선택할 수 없습니다.")) : setLocalTags(prev => [...prev, { id: option.value, label: option.label }]);
                  };

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
              { !!id ? "수정" : "등록" }
            </CustomButton>
            <CustomButton onClick={() => navigate("/", { replace: true})}>취소</CustomButton>
          </BtnContainer>
        </FormContainer>
      </ContentContainer>
    </MtContainer>

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