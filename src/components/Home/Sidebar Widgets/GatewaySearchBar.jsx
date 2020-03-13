import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {AsyncTypeahead} from 'react-bootstrap-typeahead'


let PER_PAGE = 3

class GatewaySearchBar extends React.Component {
  state = {
    isLoading: false,
    options: [],
    query: '',
  };

  _cache = {};

  render() {
    return (
      <AsyncTypeahead
        caseSensitive = {false}
        id="async-pagination-example"
        maxResults={3}
        minLength={2}
        onChange={this._onChange.bind(this)}
        onInputChange={this._handleInputChange}
        onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        options = {this.state.options}
        paginate
        placeholder="Search by Gateway ID..."
        ref={(typeahead) => this.typeahead = typeahead}
        renderMenuItemChildren={(option, props) => (
          <div key={option}>{option}</div>          )}
        useCache={false}
      />
    );
  }

  _onChange(selected) {
    console.log("Selected is " + selected)
    const {addEntry} = this.props
    addEntry(selected[0])

    // Clear the text from the box
    this.typeahead.getInstance().clear()    
  }

  _handleInputChange = (query) => {
    this.setState({ query });
  }

  _handlePagination = (e, shownResults) => {
    const { query } = this.state;
    const cachedQuery = this._cache[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    console.log("Currently have page " + cachedQuery.page + " of " + cachedQuery.pages)
    if ((cachedQuery.page+1) >= cachedQuery.pages) {
      return;
    }
    // Update visibility
    this.setState({ isLoading: true });

    const nextPage = cachedQuery.page + 1;
    const {makeAndHandleRequest} = this.props

    makeAndHandleRequest(query, nextPage)
      .then((resp) => {
        const {pages, page} = resp

        // Concatenate the previous query results into the cache
        const options = cachedQuery.options.concat(resp.options);
        
        // Update cache to match
        this._cache[query] = { options, pages, page };
        console.log("Set cache to:")
        console.log(this._cache[query])

        // Filter the new list, and update the local state
        const {filterExisting} = this.props
        this.setState({
          isLoading: false,
          options: this.filterList(filterExisting, options),
        });
      });
  }

  _handleSearch = (query) => {
    const {filterExisting} = this.props
    if (this._cache[query]) {
      this.setState({ options: this.filterList(filterExisting, this._cache[query].options)});
      return;
    }

    this.setState({ isLoading: true });
    const {makeAndHandleRequest} = this.props
    makeAndHandleRequest(query, 0)
      .then((resp) => {
        // Update cache to match
        this._cache[query] = { ...resp };
        console.log("Set cache to:")
        console.log(this._cache[query])

        // Filter the new list, and update the local state
        const {filterExisting} = this.props
        this.setState({
          isLoading: false,
          options: this.filterList(filterExisting, resp.options),
        });
      });
    
  }

  filterList(needle, haystack) {
    console.log("Filtering needle:")
    console.log(needle)
    return haystack.filter(f => !needle.includes(f));
  }
}

GatewaySearchBar.propTypes = {
    makeAndHandleRequest: PropTypes.func.isRequired,
    addEntry: PropTypes.func.isRequired,
    filterExisting: PropTypes.array,
}
  
export default GatewaySearchBar;
export { GatewaySearchBar };
  