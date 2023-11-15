import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";

const NewBlog = () => {
  const [content, setContent] = useState<string | undefined>("");

  return (
    <ContentContainer>
      <MarkDownContainer data-color-mode="light">
        <h1 style={{ marginBottom: "1rem" }}>New Posts</h1>
        <MDEditor 
          value={content}
          onChange={setContent}      
          height={460}
        />
        {/* <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} /> */}
      </MarkDownContainer>
    </ContentContainer>
  )
}

export default NewBlog;

const MarkDownContainer = styled.div`
  display: flex;
  flex-direction: column;
`