import styled from "styled-components";
import { ChildrenProp } from "../ types/propsTypes";

type SearchSectionProps = ChildrenProp & {
  $hasMargin?: boolean;
};

const Search = ({ children, $hasMargin }: SearchSectionProps) => {

  return (
    <SearchSectionContainer $hasMargin={$hasMargin}>
      { children }
    </SearchSectionContainer>
  )
}

export default Search;

const SearchSectionContainer = styled.section<Pick<SearchSectionProps, "$hasMargin">>`
  display: flex;
  gap: 1rem;

  padding-bottom: 10px;
  margin-bottom: ${({ $hasMargin }) => $hasMargin ? "1rem" : "" };

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
