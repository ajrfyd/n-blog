import MDEditor from "@uiw/react-md-editor";
import { useLocation } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import Search from "../layouts/Search";
import SearchInput from "./SearchInput";
import { SelectInput } from "../pages/PostsMain";
import { FlexCol } from "../pages/PostsMain";
import styled from "styled-components";

const Post = () => {
  const { state } = useLocation();

  return (
    <ContentContainer>
      <Search $hasMargin>
        <SearchInputSection>
          <SearchInput
            value={state.title}
            setTitleHandler={() => {}}
          />
        </SearchInputSection>
        <TagSelectSection>
          <SelectInput
            options={
              state.tags.map((tag: { label: string, id: string }) => ({ label: tag.label, value: tag.id }))
            }
          />  
        </TagSelectSection>
      </Search>
      <MDEditor.Markdown
        source={state.body} 
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