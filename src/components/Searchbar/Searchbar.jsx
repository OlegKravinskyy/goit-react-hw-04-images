import { useState } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchInput,
  SearchLabel,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import propTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSearchBar = e => {
    setSearchName(e.currentTarget.value);
  };

  const onSubmitSearchName = e => {
    e.preventDefault();
    onSubmit(searchName);
  };

  return (
    <>
      {' '}
      <SearchHeader class="searchbar">
        <SearchForm class="form" onSubmit={onSubmitSearchName}>
          <SearchButton type="submit" class="button">
            <ImSearch />
            <SearchLabel class="button-label">Search</SearchLabel>
          </SearchButton>

          <SearchInput
            class="input"
            type="text"
            onChange={handleSearchBar}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchHeader>
    </>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
