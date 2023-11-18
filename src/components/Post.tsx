import MDEditor from "@uiw/react-md-editor";
import { useLocation } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import SearchLayout from "../layouts/SearchLayout";
// import styled from "styled-components";

const Post = () => {
  const { state } = useLocation();

  return (
    <ContentContainer>
      <SearchLayout 
        $hasMargin 
      />
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

