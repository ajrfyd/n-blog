import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useLocation, useNavigate } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import Search from "../layouts/Search";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import { SelectInput } from "../pages/PostsMain";
import { FlexCol } from "../pages/PostsMain";
import useUserState from "../lib/hooks/useLogin";
import PostBottom from "../layouts/PostBottom";
import CustomButton from './CustomButton';
import { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import { Undo2Icon } from "lucide-react"
import { useAllTagsQuery, usePostQuery } from "../lib/api/apiQueries";
import { useParams } from "react-router-dom";
import { ServerTagType } from "../ types/postTypes";
import { useDispatch } from "react-redux";
import { notify } from "../stroe/notify";
import { updatePost } from '../lib/api/api';

const Post = () => {
  const { state } = useLocation();
  const [user] = useUserState();
  const [isModify, setIsModify] = useState(false);
  const [isRender, setIsRender] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<ServerTagType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: post , isLoading, error } = usePostQuery(state.id, isRender);

  const [savedTags] = useAllTagsQuery(isModify);
  
  const submitHandler = async () => {
    const data = {
      id,
      title,
      body,
      tags
    };

    const { status, data: { message } } = await updatePost.post("/update", {
      data
    });

    if(status === 200) {
      navigate("/posts");
    } else {
      dispatch(notify(message));
    }
  };

  useEffect(() => {
    if(!isRender) return;
    setIsRender(false);
  }, []);

  useEffect(() => {
    if(!isModify) return;
    if(!post) return;

    setTitle(post.title);
    setBody(post.body);
    setTags(post.tags);
  }, [isModify]);

  if(!post) return null;
  if(isLoading) return <Loading />;
  if(error) return <h2>Something was wrong!</h2>

  return (
    <ContentContainer style={{ display: "flex", flexDirection: "column" }}>
      <Search $hasMargin>
        <SearchInputSection>
          <SearchInput
            value={!isModify ? post.title : title}
            setTitleHandler={!isModify ? () => {} : setTitle}
          />
        </SearchInputSection>
        <TagSelectSection>
          {
            isModify && savedTags ? (
              <CSelect
                isMulti
                onCreateOption={(label) => {
                  setTags(prev => [{ label, id: uuid() } ,...prev])
                }}
                options={savedTags.map(tag => ({ value: tag.id, label: tag.label }))}
                value={tags.map(tag => ({ value: tag.id, label: tag.label}))}
                onChange={(tags) => {
                  setTags(tags.map((tag) => ({ label: tag.label, id: tag.value })))
                }}
              />
            ) : (
              <SelectInput
                options={
                  post.tags.map((tag: { label: string, id: string }) => ({ label: tag.label, value: tag.id }))
                }
              /> 
            )
          }
          {/* <SelectInput
            options={
              data.post.tags.map((tag: { label: string, id: string }) => ({ label: tag.label, value: tag.id }))
            }
          />   */}
        </TagSelectSection>
      </Search>
      {/* <MDEditor.Markdown
        source={data.post.body} 
        style={{ 
          whiteSpace: 'pre-wrap', 
          minHeight: "300px", 
          borderRadius: "5px", 
          padding: "4rem 1rem",
          background: "var(--white)",
          color: "var(--teal)"
        }}
      /> */}
      {
        isModify ? (
          <MDEditor 
            data-color-mode="light" 
            height={460}
            value={body}
            onChange={(value) => setBody(value as string)}
          />
        ) : (
          <MDEditor.Markdown
            source={post.body} 
            style={{ 
              whiteSpace: 'pre-wrap', 
              minHeight: "300px", 
              borderRadius: "5px", 
              padding: "4rem 1rem",
              background: "var(--white)",
              color: "var(--teal)"
            }}
          />
        )
      }
      {
        user && user.role === "admin" && (
          <PostBottom>
            <CustomButton 
              onClick={
                isModify ? submitHandler
                : () => setIsModify(true)
              }
            >
              수정
            </CustomButton>
            {
              isModify && <CustomButton $bgColor="orange" onClick={() => navigate("/posts", { replace: true })}>취소</CustomButton>
            }
          </PostBottom>
        )
      }
      <CustomButton 
        $isIcon
        style={{ 
          position: "absolute", 
          left: "2rem", 
          bottom: "2rem" 
        }}
        onClick={() => navigate(-1)}
      >
        <Undo2Icon />
      </CustomButton>
    </ContentContainer>
  )
}

export default Post;

const SearchInputSection = styled(FlexCol)`
  flex: 2;
`;

const TagSelectSection = styled(FlexCol)`
  flex: 1;
`;

export const CSelect = styled(CreatableSelect).attrs({
  classNamePrefix: 'react-select'
})<CreatableSelect>`
  flex: 1;
  .react-select__control {
    /* background-color: #fa5938; */
    /* width: 100px; */
    /* height: 40px; */
    /* padding-right: 15px; */
    /* border: none; */
    /* border-radius: 20px; */
    /* display: flex; */
    /* text-align: center; */
    cursor: pointer;
  }

  .react-select__menu {
    /* color: var(--purple); */
    /* font-weight: 600; */
  }

  .react-select__option {
    background-color: transparent; /* option 배경색 */
    color: var(--purple); /* option 텍스트 색상 */
  }

  .react-select__option--is-selected {
    /* selected */
    background-color: var(--teal);
  }

  .react-select__option--is-focused {
    color: var(--teal); 
    /* hover */
  }

  /* .react-select__single-value {
    color: red;
    font-weight: 700;
  } */
`;