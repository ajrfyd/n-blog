import styled from "styled-components";
import ContentContainer from "../components/ContentContainer";
import ReactSelect from 'react-select';
import SearchSection from '../layouts/SearchSection';

const BlogMain = () => {

  return (
    <ContentContainer>
      <SearchSection $hasMargin/>
    </ContentContainer>
  )
}

export default BlogMain;
