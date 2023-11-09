import styled from 'styled-components';

type SearchInputProps = {
  placeholder?: string;
};

const SearchInput = ({ placeholder }: SearchInputProps ) => <Input placeholder={placeholder}/>

export default SearchInput;

const Input = styled.input`
  background-color: hsl(0, 0%, 100%);
  padding-left: 1rem;
  border-style: solid; 
  /* height: 100%; */
  min-height: 38px;
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-width: 1px;
`;