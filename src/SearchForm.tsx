import React from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 2px solid #3498db;
  border-radius: 5px;
  width: 300px;
  font-size: 1rem;
  margin-right: 1rem;

  &:focus {
    outline: none;
    border-color: #2980b9;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) => {
  return (
    <FormContainer onSubmit={handleSearch}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e: any) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie"
      />
      <Button type="submit">Search</Button>
    </FormContainer>
  );
};

export default SearchForm;
