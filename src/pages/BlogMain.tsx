import ContentContainer from "../components/ContentContainer";
import SearchSection from '../layouts/SearchSection';
import GridLayout from "../layouts/GridLayout";
import GridItem from "../components/GridItem";

const BlogMain = () => {

  return (
    <ContentContainer>
      <SearchSection $hasMargin/>
      <GridLayout>
        {
          [1, 2, 3, 4, 5].map(item => <GridItem key={item}>{item}</GridItem>)
        }
      </GridLayout>
    </ContentContainer>
  )
}

export default BlogMain;
