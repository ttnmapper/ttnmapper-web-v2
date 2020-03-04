import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {AsyncTypeahead} from 'react-bootstrap-typeahead'


let PER_PAGE = 3

class _GatewaySearchBar extends React.Component {
    state = {
      isLoading: false,
      options: [],
      query: '',
    };
  
    _cache = {};
  
    render() {
      return (
        <AsyncTypeahead
          options = {this.state.options}
          ref={(typeahead) => this.typeahead = typeahead}
          id="async-pagination-example"
          labelKey="login"
          maxResults={PER_PAGE - 1}
          minLength={2}
          onInputChange={this._handleInputChange}
          onPaginate={this._handlePagination}
          onSearch={this._handleSearch}
          paginate
          placeholder="Search by Gateway ID..."
          renderMenuItemChildren={(option, props) => (
            <div key={option}>{option}</div>          )}
          useCache={false}
          onChange={this._onChange.bind(this)}
        />
      );
    }

    _onChange(selected) {
      console.log("Selected is " + selected)
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
      console.log("Pagination page " + cachedQuery.page + " of " + cachedQuery.pages)
      if (cachedQuery.page >= cachedQuery.pages) {
        return;
      }
  
      this.setState({ isLoading: true });
  
      const page = cachedQuery.page + 1;

      const {makeAndHandleRequest} = this.props
  
      makeAndHandleRequest(query, page)
        .then((resp) => {
          // Concatenate the previous query results into the cache
          const options = cachedQuery.options.concat(resp.options);
          const {pages, newPage} = resp
          this._cache[query] = { ...cachedQuery, options, pages, "page":newPage };
          console.log("Page set to "+ page)

          this.setState({
            isLoading: false,
            options: options,
          });
        });
    }
  
    _handleSearch = (query) => {
      if (this._cache[query]) {
        this.setState({ options: this._cache[query].options });
        return;
      }
  
      this.setState({ isLoading: true });
      const {makeAndHandleRequest} = this.props
      makeAndHandleRequest(query, 0)
        .then((resp) => {
          this._cache[query] = { ...resp };
          console.log("resp is ")
          console.log(resp)

          
          this.setState({
            isLoading: false,
            options: resp.options,
          });

          console.log("State set to")
          console.log(this.state)
        });
      
    }
}

_GatewaySearchBar.propTypes = {
    makeAndHandleRequest: PropTypes.func.isRequired
}
  
const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
})

const GatewaySearchBar = connect(mapStateToProps, mapDispatchToProps)(_GatewaySearchBar)

export default GatewaySearchBar;
export { GatewaySearchBar };
  