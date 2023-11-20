import { useEffect, useMemo, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import GridLayout from "../layouts/GridLayout";
import GridItem from "../components/GridItem";
import PostCard from "../components/PostCard";
import Search from "../layouts/Search";
import SearchInput from "../components/SearchInput";
import styled from "styled-components";
import ReactSelect from "react-select";
import { getPostsApi } from "../lib/api/api";
import { Tags } from "../ types/postTypes";
import { setPostsData } from "../stroe/posts";
import { useDispatch } from "react-redux";
import { usePostsData } from "../lib/hooks/useStore";

export type PostType = {
  id: string;
  title: string;
  body: string;
  tags: Tags[];
  createdAt: Date;
}

const PostsMain = () => {
  // const [posts, setPosts] = useState<PostType[] | []>([]);
  // const [tags, seTags] = useState<Tags[] | []>([]);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState<{ label: string, value: string } | null>(null);
  const dispatch = useDispatch();
  const posts = usePostsData("posts") as PostType[] | [];
  const tags = usePostsData("tags") as Tags[] | [];

  // Todo - react-query 변경
  // Todo - posts & tags 같이 가져와
  const getPosts = async() => {
    const { data }  = await getPostsApi({ method: "get", url: "posts" });
    // setPosts(data.posts);
    dispatch(setPostsData({ posts: data.posts, tags: data.tags }));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const setTitleHandler = (title: string) => setTitle(title);
  const filteredData = useMemo(() => posts.filter(post => (title === "" || post.title.toLowerCase().includes(title.toLowerCase())) && (!tag?.label || post.tags.some(pTag => pTag.id === tag?.value))), [title, tag, posts]);

  return (
    <ContentContainer>
      {/* <SearchLayout 
        $hasMargin
      /> */}
      <Search $hasMargin>
        <SearchTitle style={{ display: "flex", flexDirection: "column", flex: 2, gap: "10px"}}>
          <label htmlFor="">제목 검색</label>
          <SearchInput 
            placeholder="제목 검색" 
            value={title}
            setTitleHandler={setTitleHandler}
          />
        </SearchTitle>
        <SearchTag>
          <label htmlFor="">Tag 검색</label>
          <SelectInput 
            placeholder="Tag 검색"
            value={tag}
            options={
              [{label: "", value: ""},...tags.map(tag => ({ value: tag.id, label: tag.label }))]
            }
            onChange={setTag}
          />
        </SearchTag>
      </Search>
      <GridLayout>
        {
          filteredData.map(post => <GridItem key={post.id} $bgColor="white"><PostCard {...post}/></GridItem>)
        }
      </GridLayout>
    </ContentContainer>
  )
}

export default PostsMain;

export const FlexCol = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const SearchTitle = styled(FlexCol)`
  flex: 2;
`


const SearchTag = styled(FlexCol)`
  flex: 1;
`;


export const SelectInput = styled(ReactSelect).attrs({
  classNamePrefix: 'react-select'
})`
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