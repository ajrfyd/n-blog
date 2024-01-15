import { ChangeEvent } from 'react';
import styled from 'styled-components';

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  setTitleHandler: (value:string) => void;
};

const SearchInput = ({ placeholder, value, setTitleHandler }: SearchInputProps) => <Input placeholder={placeholder} value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleHandler(e.target.value)}/>;

// const SearchInput = forwardRef(({ placeholder, value }: SearchInputProps, ref: ForwardedRef<HTMLInputElement>) => value ? <Input placeholder={placeholder} value={value} readOnly /> : <Input placeholder={placeholder} ref={ref}/>)


export default SearchInput;

export const Input = styled.input`
  background-color: hsl(0, 0%, 100%);
  padding-left: 1rem;
  border-style: solid; 
  /* height: 100%; */
  min-height: 38px;
  border-color: hsl(0, 0%, 80%);
  border-radius: 4px;
  border-width: 1px;
`;