import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useLocation } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import Search from "../layouts/Search";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import { SelectInput } from "../pages/PostsMain";
import { FlexCol } from "../pages/PostsMain";
import { getPostByIdApi } from "../lib/api/api";
import { useQuery } from '@tanstack/react-query';

const Post = () => {
  const { state } = useLocation();
  
  const getPostHandler = async () => {
    const { data } = await getPostByIdApi(state.id);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["postById", state.id],
    queryFn: getPostHandler
  });

  // console.log("Post render");

  if(!data) return null;
  if(isLoading) return <Loading />

  return (
    <ContentContainer>
      <Search $hasMargin>
        <SearchInputSection>
          <SearchInput
            value={data.post.title}
            setTitleHandler={() => {}}
          />
        </SearchInputSection>
        <TagSelectSection>
          <SelectInput
            options={
              data.post.tags.map((tag: { label: string, id: string }) => ({ label: tag.label, value: tag.id }))
            }
          />  
        </TagSelectSection>
      </Search>
      <MDEditor.Markdown
        source={data.post.body} 
        style={{ 
          whiteSpace: 'pre-wrap', 
          minHeight: "300px", 
          borderRadius: "5px", 
          padding: "4rem 1rem",
          background: "var(--white)",
          color: "var(--teal)"
        }}
      />

    </ContentContainer>
  )
}

export default Post;

const SearchInputSection = styled(FlexCol)`
  flex: 2;
`

const TagSelectSection = styled(FlexCol)`
  flex: 1;
`