import React, { Component } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchButton,
  SearchInput,
  SearchLabel,
} from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import propTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleSearchBar = e => {
    this.setState({ searchName: e.currentTarget.value });
  };

  onSubmitSearchName = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchName);
    // this.reset();
  };

  reset = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <>
        {' '}
        <SearchHeader class="searchbar">
          <SearchForm class="form" onSubmit={this.onSubmitSearchName}>
            <SearchButton type="submit" class="button">
              <ImSearch />
              <SearchLabel class="button-label">Search</SearchLabel>
            </SearchButton>

            <SearchInput
              class="input"
              type="text"
              onChange={this.handleSearchBar}
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </SearchHeader>
      </>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
