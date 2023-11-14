import styled from "styled-components";
import ReactSelect from "react-select";
import SearchInput from "../components/SearchInput";
import React from "react";

type SearchSectionProps = React.InputHTMLAttributes<HTMLInputElement> & {
  $hasMargin?: boolean;
}

const SearchSection = ({ $hasMargin }: SearchSectionProps) => {
  return (
    <SearchSectionContainer $hasMargin={$hasMargin}>
      <div style={{ display: "flex", flexDirection: "column", flex: 2, gap: "10px"}}>
        <label htmlFor="">제목 검색</label>
        {/* <input type="text" placeholder="제목 검색" style={{ backgroundColor: "hsl(0, 0%, 100%)", paddingLeft: "1rem", borderStyle: "solid", height: "100%", borderColor: "hsl(0, 0%, 80%)", borderRadius: "5px" }}/> */}
        <SearchInput placeholder="제목 검색"/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "10px" }}>
        <label htmlFor="">Tag 검색</label>
        <SelectInput placeholder="Tag 검색" isMulti/>
      </div>
    </SearchSectionContainer>
  )
}

export default SearchSection;

const SearchSectionContainer = styled.section<Pick<SearchSectionProps, "$hasMargin">>`
  display: flex;
  gap: 1rem;

  padding-bottom: 10px;
  margin-bottom: ${({ $hasMargin }) => $hasMargin ? "1rem" : "" };

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SelectInput = styled(ReactSelect)`
  flex: 1
`;